import { ProjectAggregate } from '../entities/project.aggregate';
import { ProjectValidationResult, ValidationIssue } from '../project.types';
import { CANONICAL_SECTION_TYPES } from '../value-objects/project-section-type.vo';

export class ProjectTwinValidator {
  validate(project: ProjectAggregate): ProjectValidationResult {
    const issues: ValidationIssue[] = [];

    // 1. Structural Validations
    if (!project.getId()) {
      issues.push({
        code: 'ERR_ID_EMPTY',
        severity: 'ERROR',
        path: 'id',
        message: 'Project ID cannot be empty.'
      });
    }

    if (!project.getName()) {
      issues.push({
        code: 'ERR_NAME_EMPTY',
        severity: 'ERROR',
        path: 'name',
        message: 'Project name cannot be empty.'
      });
    }

    if (!project.getSchemaVersion()) {
      issues.push({
        code: 'ERR_SCHEMA_VERSION_MISSING',
        severity: 'ERROR',
        path: 'schemaVersion',
        message: 'schemaVersion is required.'
      });
    }

    // 2. Current Version Validations
    const currentVersion = project.getCurrentVersionEntity();
    if (!currentVersion) {
      issues.push({
        code: 'ERR_CURRENT_VERSION_NOT_FOUND',
        severity: 'ERROR',
        path: 'currentVersion',
        message: `Current version '${project.getCurrentVersion()}' is missing from versions array.`
      });
    } else {
      // 3. Section Completeness Audits
      const sections = currentVersion.getSections();

      if (sections.length === 0) {
        issues.push({
          code: 'WARN_NO_SECTIONS',
          severity: 'WARNING',
          path: `versions.${currentVersion.getVersion()}.sections`,
          message: 'Project version has no defined sections.'
        });
      }

      // Check key recommended sections
      const criticalSections = ['IDENTITY', 'EXECUTIVE_SUMMARY', 'PROBLEM', 'SOLUTION', 'TECHNOLOGY'];
      for (const reqType of criticalSections) {
        const sec = currentVersion.getSection(reqType as any);
        if (!sec) {
          issues.push({
            code: `WARN_MISSING_${reqType}`,
            severity: 'WARNING',
            path: `sections.${reqType}`,
            message: `Recommended critical section '${reqType}' is not present.`
          });
        } else if (sec.getStatus() === 'EMPTY') {
          issues.push({
            code: `INFO_SECTION_EMPTY_${reqType}`,
            severity: 'INFO',
            path: `sections.${reqType}.status`,
            message: `Section '${reqType}' exists but is marked as EMPTY.`
          });
        } else if (sec.getStatus() === 'DRAFT') {
          issues.push({
            code: `INFO_SECTION_DRAFT_${reqType}`,
            severity: 'INFO',
            path: `sections.${reqType}.status`,
            message: `Section '${reqType}' is currently in DRAFT status.`
          });
        }
      }

      // Check for unpopulated canonical sections
      for (const canonicalType of CANONICAL_SECTION_TYPES) {
        if (!currentVersion.hasSection(canonicalType)) {
          issues.push({
            code: `INFO_SECTION_UNCONFIGURED_${canonicalType}`,
            severity: 'INFO',
            path: `sections.${canonicalType}`,
            message: `Canonical section '${canonicalType}' is not yet populated for this project.`
          });
        }
      }
    }

    const errorCount = issues.filter(i => i.severity === 'ERROR').length;
    const warningCount = issues.filter(i => i.severity === 'WARNING').length;
    const infoCount = issues.filter(i => i.severity === 'INFO').length;

    return {
      valid: errorCount === 0,
      errorCount,
      warningCount,
      infoCount,
      issues
    };
  }
}
