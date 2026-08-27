/**
 * Venture Hub OS — Log Redaction Policy
 * SPEC-011: Production Hardening, Observability & Deployment
 */

export const LOG_REDACTION_POLICY_VERSION = '1.0';

export class LogRedactionPolicy {
  private static readonly REDACTED_MARKER = '[REDACTED]';

  private static readonly SENSITIVE_KEYS = [
    'password',
    'token',
    'idtoken',
    'refreshtoken',
    'accesstoken',
    'downloadtoken',
    'signedurl',
    'secret',
    'privatekey',
    'apikey',
    'authorization',
    'credential',
    'filecontent',
    'rawbody'
  ];

  /**
   * Deeply inspects and sanitizes log metadata, redacting any sensitive fields.
   */
  public static redactMetadata(metadata: Record<string, unknown>): Record<string, unknown> {
    const sanitized: Record<string, unknown> = {};

    for (const [key, value] of Object.entries(metadata)) {
      const lowerKey = key.toLowerCase().replace(/[^a-z]/g, '');

      if (this.SENSITIVE_KEYS.some(k => lowerKey.includes(k))) {
        sanitized[key] = this.REDACTED_MARKER;
      } else if (typeof value === 'object' && value !== null) {
        if (Array.isArray(value)) {
          sanitized[key] = value.map(item =>
            typeof item === 'object' && item !== null
              ? this.redactMetadata(item as Record<string, unknown>)
              : item
          );
        } else {
          sanitized[key] = this.redactMetadata(value as Record<string, unknown>);
        }
      } else {
        sanitized[key] = value;
      }
    }

    return sanitized;
  }

  /**
   * Sanitizes string message text by replacing token-like strings or signed URLs.
   */
  public static redactString(input: string): string {
    let output = input;

    // Redact JWT tokens: xxx.yyy.zzz
    output = output.replace(/eyJ[a-zA-Z0-9_-]+\.eyJ[a-zA-Z0-9_-]+\.[a-zA-Z0-9_-]+/g, '[REDACTED_JWT]');

    // Redact Firebase download tokens: token=xxxxxxxx-xxxx-xxxx-xxxx-xxxxxxxxxxxx
    output = output.replace(/token=[a-fA-F0-9-]{36}/g, 'token=[REDACTED_TOKEN]');

    // Redact Signed URL queries
    output = output.replace(/(X-Goog-Signature|GoogleAccessId|Signature)=[^&\s]+/g, '$1=[REDACTED]');

    return output;
  }
}
