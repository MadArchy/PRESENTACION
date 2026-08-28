import { JsonProjectRepository } from './modules/project/adapters/json/json-project.repository';
import { VentureHubLegacyAdapter } from './modules/project/adapters/legacy/venture-hub-legacy.adapter';
import { ListProjectsUseCase } from './modules/project/application/use-cases/list-projects.use-case';
import { GetProjectUseCase } from './modules/project/application/use-cases/get-project.use-case';
import { ValidateProjectTwinUseCase } from './modules/project/application/use-cases/validate-project-twin.use-case';
import { GetProjectSectionsUseCase } from './modules/project/application/use-cases/get-project-sections.use-case';
import { OpenLegacyPresentationUseCase } from './modules/project/application/use-cases/open-legacy-presentation.use-case';

import { JsonNarrativeProfileRepository } from './modules/narrative/adapters/json/json-narrative-profile.repository';
import { GenerateNarrativePlanUseCase } from './modules/narrative/application/use-cases/generate-narrative-plan.use-case';
import { ListNarrativeProfilesUseCase } from './modules/narrative/application/use-cases/list-narrative-profiles.use-case';
import { ValidateNarrativeRequestUseCase } from './modules/narrative/application/use-cases/validate-narrative-request.use-case';
import { AnnotateNarrativeTrustUseCase } from './modules/narrative/application/use-cases/annotate-narrative-trust.use-case';

import { JsonClaimRepository } from './modules/claim/adapters/json/json-claim.repository';
import { JsonEvidenceRepository } from './modules/evidence/adapters/json/json-evidence.repository';
import { JsonEvidenceLinkRepository } from './modules/evidence/adapters/json/json-evidence-link.repository';
import { ListProjectClaimsUseCase } from './modules/claim/application/use-cases/list-project-claims.use-case';
import { GetClaimUseCase } from './modules/claim/application/use-cases/get-claim.use-case';
import { EvaluateClaimSupportUseCase } from './modules/claim/application/use-cases/evaluate-claim-support.use-case';
import { EvaluateProjectClaimCoverageUseCase } from './modules/claim/application/use-cases/evaluate-project-claim-coverage.use-case';
import { BuildProjectTrustSummaryUseCase } from './modules/claim/application/use-cases/build-project-trust-summary.use-case';

import { ListProjectEvidenceUseCase } from './modules/evidence/application/use-cases/list-project-evidence.use-case';
import { GetEvidenceUseCase } from './modules/evidence/application/use-cases/get-evidence.use-case';
import { GetEvidenceForClaimUseCase } from './modules/evidence/application/use-cases/get-evidence-for-claim.use-case';

import { JsonPresentationProfileRepository } from './modules/presentation/adapters/json/json-presentation-profile.repository';
import { JsonPresentationThemeRepository } from './modules/presentation/adapters/json/json-presentation-theme.repository';
import { GeneratePresentationDefinitionUseCase } from './modules/presentation/application/use-cases/generate-presentation-definition.use-case';
import { ListPresentationProfilesUseCase } from './modules/presentation/application/use-cases/list-presentation-profiles.use-case';
import { GetPresentationProfileUseCase } from './modules/presentation/application/use-cases/get-presentation-profile.use-case';
import { ListPresentationThemesUseCase } from './modules/presentation/application/use-cases/list-presentation-themes.use-case';
import { GetPresentationThemeUseCase } from './modules/presentation/application/use-cases/get-presentation-theme.use-case';
import { PresentationRenderer } from './ui/presentation/presentation-renderer';
import { PresentationDefinitionEntity } from './modules/presentation/domain/entities/presentation-definition.entity';

import { JsonPresenterNotesRepository } from './modules/presenter/adapters/json/json-presenter-notes.repository';
import { JsonQaRepository } from './modules/presenter/adapters/json/json-qa.repository';
import { CreatePresenterSessionUseCase } from './modules/presenter/application/use-cases/create-presenter-session.use-case';
import { GetPresenterContextUseCase } from './modules/presenter/application/use-cases/get-presenter-context.use-case';
import { BuildPresenterSessionSummaryUseCase } from './modules/presenter/application/use-cases/build-session-summary.use-case';
import { PresenterSessionEntity } from './modules/presenter/domain/entities/presenter-session.entity';
import { renderPresenterPage } from './ui/presenter/presenter.page';

import { MockAiModelAdapter } from './modules/copilot/adapters/providers/mock-ai-model.adapter';
import { MemorySessionKeyAdapter } from './modules/copilot/adapters/browser/memory-session-key.adapter';
import { ExecuteCopilotTaskUseCase } from './modules/copilot/application/use-cases/execute-copilot-task.use-case';
import { ReviewCopilotProposalUseCase } from './modules/copilot/application/use-cases/review-copilot-proposal.use-case';
import { CopilotTaskType, AiProviderType } from './modules/copilot/domain/copilot.types';
import { CopilotResultEntity } from './modules/copilot/domain/entities/copilot-result.entity';
import { renderCopilotPage } from './ui/copilot/copilot.page';

import { JsonDataRoomRepository } from './modules/data-room/adapters/json/json-data-room.repository';
import { JsonDocumentArtifactRepository } from './modules/data-room/adapters/json/json-document-artifact.repository';
import { JsonDiligenceRequestRepository } from './modules/data-room/adapters/json/json-diligence-request.repository';
import { JsonDiligenceChecklistRepository } from './modules/data-room/adapters/json/json-diligence-checklist.repository';
import { GetDataRoomUseCase } from './modules/data-room/application/use-cases/get-data-room.use-case';
import { ListDataRoomDocumentsUseCase } from './modules/data-room/application/use-cases/list-data-room-documents.use-case';
import { ListDiligenceRequestsUseCase } from './modules/data-room/application/use-cases/list-diligence-requests.use-case';
import { EvaluateDiligenceCoverageUseCase } from './modules/data-room/application/use-cases/evaluate-diligence-coverage.use-case';
import { EvaluateDiligenceReadinessUseCase } from './modules/data-room/application/use-cases/evaluate-diligence-readiness.use-case';
import { renderDataRoomPage } from './ui/data-room/data-room.page';

import { InMemorySecurityStore } from './modules/security/adapters/test/in-memory-security.store';
import { BuildSecurityContextUseCase, AuthorizePermissionUseCase } from './modules/security/application/use-cases/build-security-context.use-case';
import { SecurityAdminUseCase, ListAuditEventsUseCase } from './modules/security/application/use-cases/security-admin.use-case';
import { renderSecurityDashboardPage } from './ui/security/security-dashboard.page';
import { OrganizationRole, ProjectRole, Permission } from './modules/security/domain/security.types';

import { InMemorySecureStorageStore } from './modules/secure-storage/adapters/firestore/in-memory-secure-storage.store';
import { FirebaseSecureBinaryStorageAdapter } from './modules/secure-storage/adapters/firebase-storage/firebase-secure-binary-storage.adapter';
import { CreateUploadIntentUseCase, FinalizeUploadUseCase } from './modules/secure-storage/application/use-cases/upload-lifecycle.use-case';
import { AuthorizeFileDownloadUseCase, DownloadSecureFileUseCase } from './modules/secure-storage/application/use-cases/download-file.use-case';
import { ListFileVersionsUseCase } from './modules/secure-storage/application/use-cases/file-versioning.use-case';
import { CreateShareGrantUseCase, RevokeShareGrantUseCase, ListShareGrantsUseCase } from './modules/secure-storage/application/use-cases/share-grant.use-case';
import { QuarantineFileUseCase, RestoreQuarantinedFileUseCase, DeleteSecureFileUseCase, ListSecureFilesUseCase, GetSecureFileUseCase } from './modules/secure-storage/application/use-cases/file-governance.use-case';
import { renderSecureStoragePage } from './ui/secure-storage/secure-storage.page';

import { InMemoryAdministrationStore } from './modules/administration/adapters/firestore/in-memory-administration.store';
import { FirebasePlatformHealthAdapter } from './modules/administration/adapters/health/firebase-platform-health.adapter';
import { AdministrationUseCases } from './modules/administration/application/use-cases/administration.use-cases';
import { renderPlatformAdminPage } from './ui/administration/platform-admin.page';
import { renderOrganizationAdminPage } from './ui/administration/organization-admin.page';
import { renderProjectAdminPage } from './ui/administration/project-admin.page';
import { ProductionReadinessEntity } from './modules/production/domain/entities/production-readiness.entity';
import { RuntimeEnvironmentAdapter } from './modules/production/adapters/config/runtime-environment.adapter';
import { renderProductionReadiness } from './ui/production/production-readiness.component';

import { WebSpeechAdapter } from './modules/speech-intelligence/adapters/web-speech.adapter';
import { BilingualTranslatorAdapter } from './modules/speech-intelligence/adapters/bilingual-translator.adapter';
import { BilingualTranslationUseCase } from './modules/speech-intelligence/application/bilingual-translation.use-case';
import { ListenLiveSpeechUseCase } from './modules/speech-intelligence/application/listen-live-speech.use-case';
import { ExportTranscriptUseCase } from './modules/speech-intelligence/application/export-transcript.use-case';
import { SpeechUIController } from './ui/speech/speech-ui.controller';

import { InMemoryEventBus } from './modules/shared/events/event-bus';
import { logger } from './platform/logging/logger';
import { APP_CONFIG } from './platform/config/app.config';
import { renderWorkspacePage } from './ui/pages/workspace.page';
import { renderNarrativePage } from './ui/pages/narrative.page';
import { renderGovernancePage } from './ui/pages/governance.page';
import { NarrativeRequest } from './modules/narrative/domain/narrative.types';

export class VentureHubApp {
  private readonly eventBus: InMemoryEventBus;
  private readonly projectRepository: JsonProjectRepository;
  private readonly legacyAdapter: VentureHubLegacyAdapter;
  private readonly profileRepository: JsonNarrativeProfileRepository;

  // Claim & Evidence Repositories
  private readonly claimRepository: JsonClaimRepository;
  private readonly evidenceRepository: JsonEvidenceRepository;
  private readonly evidenceLinkRepository: JsonEvidenceLinkRepository;

  // Presentation Repositories
  private readonly presentationProfileRepository: JsonPresentationProfileRepository;
  private readonly presentationThemeRepository: JsonPresentationThemeRepository;

  // Presenter Repositories
  private readonly presenterNotesRepository: JsonPresenterNotesRepository;
  private readonly qaRepository: JsonQaRepository;

  // Copilot Adapters & Services
  private readonly aiModelAdapter: MockAiModelAdapter;
  private readonly sessionKeyStore: MemorySessionKeyAdapter;

  // Data Room Repositories
  private readonly dataRoomRepository: JsonDataRoomRepository;
  private readonly documentArtifactRepository: JsonDocumentArtifactRepository;
  private readonly diligenceRequestRepository: JsonDiligenceRequestRepository;
  private readonly diligenceChecklistRepository: JsonDiligenceChecklistRepository;

  // Project Use Cases
  private readonly listProjectsUseCase: ListProjectsUseCase;
  private readonly getProjectUseCase: GetProjectUseCase;
  private readonly validateProjectUseCase: ValidateProjectTwinUseCase;
  private readonly getProjectSectionsUseCase: GetProjectSectionsUseCase;
  private readonly openLegacyUseCase: OpenLegacyPresentationUseCase;

  // Narrative Use Cases
  private readonly generateNarrativePlanUseCase: GenerateNarrativePlanUseCase;
  private readonly listNarrativeProfilesUseCase: ListNarrativeProfilesUseCase;
  private readonly validateNarrativeRequestUseCase: ValidateNarrativeRequestUseCase;
  private readonly annotateNarrativeTrustUseCase: AnnotateNarrativeTrustUseCase;

  // Claim & Evidence Use Cases
  private readonly listProjectClaimsUseCase: ListProjectClaimsUseCase;
  private readonly getClaimUseCase: GetClaimUseCase;
  private readonly evaluateClaimSupportUseCase: EvaluateClaimSupportUseCase;
  private readonly evaluateProjectClaimCoverageUseCase: EvaluateProjectClaimCoverageUseCase;
  private readonly buildProjectTrustSummaryUseCase: BuildProjectTrustSummaryUseCase;
  private readonly listProjectEvidenceUseCase: ListProjectEvidenceUseCase;
  private readonly getEvidenceUseCase: GetEvidenceUseCase;
  private readonly getEvidenceForClaimUseCase: GetEvidenceForClaimUseCase;

  // Presentation Use Cases & Renderer
  private readonly generatePresentationUseCase: GeneratePresentationDefinitionUseCase;
  private readonly listPresentationProfilesUseCase: ListPresentationProfilesUseCase;
  private readonly getPresentationProfileUseCase: GetPresentationProfileUseCase;
  private readonly listPresentationThemesUseCase: ListPresentationThemesUseCase;
  private readonly getPresentationThemeUseCase: GetPresentationThemeUseCase;
  private readonly presentationRenderer: PresentationRenderer;

  // Presenter Cockpit Use Cases
  private readonly createPresenterSessionUseCase: CreatePresenterSessionUseCase;
  private readonly getPresenterContextUseCase: GetPresenterContextUseCase;
  private readonly buildSessionSummaryUseCase: BuildPresenterSessionSummaryUseCase;

  // Copilot Use Cases
  private readonly executeCopilotTaskUseCase: ExecuteCopilotTaskUseCase;
  private readonly reviewCopilotProposalUseCase: ReviewCopilotProposalUseCase;

  // Data Room Use Cases
  private readonly getDataRoomUseCase: GetDataRoomUseCase;
  private readonly listDataRoomDocumentsUseCase: ListDataRoomDocumentsUseCase;
  private readonly listDiligenceRequestsUseCase: ListDiligenceRequestsUseCase;
  private readonly evaluateDiligenceCoverageUseCase: EvaluateDiligenceCoverageUseCase;
  private readonly evaluateDiligenceReadinessUseCase: EvaluateDiligenceReadinessUseCase;

  private activeWorkspaceProject: any = null;
  private activeSectionId: string | undefined = undefined;
  private activeGovernanceTab: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'TRUST' = 'CLAIMS';

  // Active V2 Presentation Runtime State
  private activePresentation: PresentationDefinitionEntity | null = null;
  private activeSceneIndex = 0;
  private activePresentationTheme: 'DARK' | 'LIGHT' = 'DARK';
  private isPresentationOverviewOpen = false;

  // Active Presenter Cockpit State
  private activePresenterSession: PresenterSessionEntity | null = null;
  private activePresenterTab: 'NOTES' | 'TRUST' | 'QA' | 'SPEECH' = 'NOTES';
  private isPresenterOverviewOpen = false;
  private presenterTimerInterval: any = null;

  // Active Copilot State
  private activeCopilotTask: CopilotTaskType = 'PROJECT_ANALYSIS';
  private activeCopilotProvider: AiProviderType = 'MOCK';
  private activeCopilotResult: CopilotResultEntity | null = null;
  private isCopilotExecuting = false;

  // Active Data Room State
  private activeDataRoomTab: 'DOCUMENTS' | 'COVERAGE' | 'REQUESTS' | 'GAPS' | 'READINESS' = 'DOCUMENTS';

  // Security State & Use Cases
  private readonly securityStore: InMemorySecurityStore;
  private readonly buildSecurityContextUseCase: BuildSecurityContextUseCase;
  private readonly authorizePermissionUseCase: AuthorizePermissionUseCase;
  private readonly securityAdminUseCase: SecurityAdminUseCase;
  private readonly listAuditEventsUseCase: ListAuditEventsUseCase;

  // Secure Storage State & Use Cases
  private readonly secureStorageStore: InMemorySecureStorageStore;
  private readonly binaryStorageAdapter: FirebaseSecureBinaryStorageAdapter;
  private readonly createUploadIntentUseCase: CreateUploadIntentUseCase;
  private readonly finalizeUploadUseCase: FinalizeUploadUseCase;
  private readonly authorizeFileDownloadUseCase: AuthorizeFileDownloadUseCase;
  private readonly downloadSecureFileUseCase: DownloadSecureFileUseCase;
  private readonly listFileVersionsUseCase: ListFileVersionsUseCase;
  private readonly createShareGrantUseCase: CreateShareGrantUseCase;
  private readonly revokeShareGrantUseCase: RevokeShareGrantUseCase;
  private readonly listShareGrantsUseCase: ListShareGrantsUseCase;
  private readonly quarantineFileUseCase: QuarantineFileUseCase;
  private readonly restoreQuarantinedFileUseCase: RestoreQuarantinedFileUseCase;
  private readonly deleteSecureFileUseCase: DeleteSecureFileUseCase;
  private readonly listSecureFilesUseCase: ListSecureFilesUseCase;
  private readonly getSecureFileUseCase: GetSecureFileUseCase;

  private activeSecurityTab: 'MEMBERS' | 'PROJECT_ACCESS' | 'PERMISSION_INSPECTOR' | 'AUDIT_LOG' | 'STATUS' = 'STATUS';
  private activeSecureStorageTab: 'FILES' | 'SHARING' | 'AUDIT' | 'UPLOAD_PREFLIGHT' = 'FILES';
  private activeOrganizationId = 'org-arcana';
  private activeUserId = 'usr-founder-arcana';
  private activeProjectId: string | undefined = 'arcana';

  // Administration State & Use Cases (Phase 010)
  private readonly adminStore: InMemoryAdministrationStore;
  private readonly healthAdapter: FirebasePlatformHealthAdapter;
  private readonly adminUseCases: AdministrationUseCases;

  // Live Speech Intelligence & Dual-Language Subtitles (Phase 012)
  private readonly speechTranslatorAdapter: BilingualTranslatorAdapter;
  private readonly webSpeechAdapter: WebSpeechAdapter;
  private readonly bilingualTranslationUseCase: BilingualTranslationUseCase;
  private readonly listenLiveSpeechUseCase: ListenLiveSpeechUseCase;
  private readonly exportTranscriptUseCase: ExportTranscriptUseCase;
  private readonly speechUIController: SpeechUIController;

  constructor() {
    this.eventBus = new InMemoryEventBus();
    this.projectRepository = new JsonProjectRepository();
    this.legacyAdapter = new VentureHubLegacyAdapter();
    this.profileRepository = new JsonNarrativeProfileRepository();

    this.claimRepository = new JsonClaimRepository();
    this.evidenceRepository = new JsonEvidenceRepository();
    this.evidenceLinkRepository = new JsonEvidenceLinkRepository();

    this.presentationProfileRepository = new JsonPresentationProfileRepository();
    this.presentationThemeRepository = new JsonPresentationThemeRepository();

    this.presenterNotesRepository = new JsonPresenterNotesRepository();
    this.qaRepository = new JsonQaRepository();

    this.aiModelAdapter = new MockAiModelAdapter();
    this.sessionKeyStore = new MemorySessionKeyAdapter();

    this.dataRoomRepository = new JsonDataRoomRepository();
    this.documentArtifactRepository = new JsonDocumentArtifactRepository();
    this.diligenceRequestRepository = new JsonDiligenceRequestRepository();
    this.diligenceChecklistRepository = new JsonDiligenceChecklistRepository();

    // Initialize Security Services
    this.securityStore = new InMemorySecurityStore();
    this.buildSecurityContextUseCase = new BuildSecurityContextUseCase(
      this.securityStore,
      this.securityStore,
      this.securityStore,
      this.securityStore,
      this.securityStore
    );
    this.authorizePermissionUseCase = new AuthorizePermissionUseCase(this.buildSecurityContextUseCase);
    this.securityAdminUseCase = new SecurityAdminUseCase(this.securityStore);
    this.listAuditEventsUseCase = new ListAuditEventsUseCase(this.securityStore);

    // Initialize Secure Storage Services
    this.secureStorageStore = new InMemorySecureStorageStore();
    this.binaryStorageAdapter = new FirebaseSecureBinaryStorageAdapter();
    this.createUploadIntentUseCase = new CreateUploadIntentUseCase(this.secureStorageStore, this.secureStorageStore);
    this.finalizeUploadUseCase = new FinalizeUploadUseCase(this.secureStorageStore, this.secureStorageStore, this.secureStorageStore, this.secureStorageStore);
    this.authorizeFileDownloadUseCase = new AuthorizeFileDownloadUseCase(this.secureStorageStore, this.secureStorageStore, this.secureStorageStore);
    this.downloadSecureFileUseCase = new DownloadSecureFileUseCase(this.authorizeFileDownloadUseCase, this.binaryStorageAdapter, this.secureStorageStore);
    this.listFileVersionsUseCase = new ListFileVersionsUseCase(this.secureStorageStore, this.secureStorageStore);
    this.createShareGrantUseCase = new CreateShareGrantUseCase(this.secureStorageStore, this.secureStorageStore);
    this.revokeShareGrantUseCase = new RevokeShareGrantUseCase(this.secureStorageStore, this.secureStorageStore);
    this.listShareGrantsUseCase = new ListShareGrantsUseCase(this.secureStorageStore);
    this.quarantineFileUseCase = new QuarantineFileUseCase(this.secureStorageStore, this.secureStorageStore);
    this.restoreQuarantinedFileUseCase = new RestoreQuarantinedFileUseCase(this.secureStorageStore, this.secureStorageStore);
    this.deleteSecureFileUseCase = new DeleteSecureFileUseCase(this.secureStorageStore, this.secureStorageStore, this.binaryStorageAdapter, this.secureStorageStore);
    this.listSecureFilesUseCase = new ListSecureFilesUseCase(this.secureStorageStore);
    this.getSecureFileUseCase = new GetSecureFileUseCase(this.secureStorageStore);

    // Initialize Administration Services (Phase 010)
    this.adminStore = new InMemoryAdministrationStore();
    this.healthAdapter = new FirebasePlatformHealthAdapter();
    this.adminUseCases = new AdministrationUseCases(
      this.adminStore,
      this.adminStore,
      this.adminStore,
      this.adminStore,
      this.adminStore,
      this.healthAdapter
    );

    this.listProjectsUseCase = new ListProjectsUseCase(this.projectRepository, this.eventBus);
    this.getProjectUseCase = new GetProjectUseCase(this.projectRepository, this.eventBus);
    this.validateProjectUseCase = new ValidateProjectTwinUseCase(this.projectRepository);
    this.getProjectSectionsUseCase = new GetProjectSectionsUseCase(this.projectRepository);
    this.openLegacyUseCase = new OpenLegacyPresentationUseCase(this.legacyAdapter);

    this.generateNarrativePlanUseCase = new GenerateNarrativePlanUseCase(
      this.projectRepository,
      this.profileRepository,
      this.eventBus
    );
    this.listNarrativeProfilesUseCase = new ListNarrativeProfilesUseCase(this.profileRepository);
    this.validateNarrativeRequestUseCase = new ValidateNarrativeRequestUseCase();
    this.annotateNarrativeTrustUseCase = new AnnotateNarrativeTrustUseCase(this.claimRepository);

    this.listProjectClaimsUseCase = new ListProjectClaimsUseCase(this.claimRepository);
    this.getClaimUseCase = new GetClaimUseCase(this.claimRepository);
    this.evaluateClaimSupportUseCase = new EvaluateClaimSupportUseCase(
      this.evidenceRepository,
      this.evidenceLinkRepository
    );
    this.evaluateProjectClaimCoverageUseCase = new EvaluateProjectClaimCoverageUseCase(this.claimRepository);
    this.buildProjectTrustSummaryUseCase = new BuildProjectTrustSummaryUseCase(
      this.claimRepository,
      this.evidenceRepository
    );
    this.listProjectEvidenceUseCase = new ListProjectEvidenceUseCase(this.evidenceRepository);
    this.getEvidenceUseCase = new GetEvidenceUseCase(this.evidenceRepository);
    this.getEvidenceForClaimUseCase = new GetEvidenceForClaimUseCase(
      this.evidenceRepository,
      this.evidenceLinkRepository
    );

    this.generatePresentationUseCase = new GeneratePresentationDefinitionUseCase(
      this.projectRepository,
      this.presentationProfileRepository,
      this.presentationThemeRepository,
      this.claimRepository,
      this.annotateNarrativeTrustUseCase
    );
    this.listPresentationProfilesUseCase = new ListPresentationProfilesUseCase(this.presentationProfileRepository);
    this.getPresentationProfileUseCase = new GetPresentationProfileUseCase(this.presentationProfileRepository);
    this.listPresentationThemesUseCase = new ListPresentationThemesUseCase(this.presentationThemeRepository);
    this.getPresentationThemeUseCase = new GetPresentationThemeUseCase(this.presentationThemeRepository);
    this.presentationRenderer = new PresentationRenderer();

    this.createPresenterSessionUseCase = new CreatePresenterSessionUseCase();
    this.getPresenterContextUseCase = new GetPresenterContextUseCase(
      this.presenterNotesRepository,
      this.qaRepository
    );
    this.buildSessionSummaryUseCase = new BuildPresenterSessionSummaryUseCase();

    this.executeCopilotTaskUseCase = new ExecuteCopilotTaskUseCase(
      this.projectRepository,
      this.claimRepository,
      this.evidenceRepository,
      this.aiModelAdapter
    );
    this.reviewCopilotProposalUseCase = new ReviewCopilotProposalUseCase();

    this.getDataRoomUseCase = new GetDataRoomUseCase(this.dataRoomRepository);
    this.listDataRoomDocumentsUseCase = new ListDataRoomDocumentsUseCase(this.documentArtifactRepository);
    this.listDiligenceRequestsUseCase = new ListDiligenceRequestsUseCase(this.diligenceRequestRepository);
    this.evaluateDiligenceCoverageUseCase = new EvaluateDiligenceCoverageUseCase(
      this.documentArtifactRepository,
      this.diligenceRequestRepository,
      this.diligenceChecklistRepository
    );
    this.evaluateDiligenceReadinessUseCase = new EvaluateDiligenceReadinessUseCase(
      this.documentArtifactRepository,
      this.diligenceRequestRepository,
      this.claimRepository
    );

    // Live Speech & Dual-Language Transcripts
    this.speechTranslatorAdapter = new BilingualTranslatorAdapter();
    this.webSpeechAdapter = new WebSpeechAdapter();
    this.bilingualTranslationUseCase = new BilingualTranslationUseCase(this.speechTranslatorAdapter);
    this.listenLiveSpeechUseCase = new ListenLiveSpeechUseCase(this.webSpeechAdapter, this.bilingualTranslationUseCase);
    this.exportTranscriptUseCase = new ExportTranscriptUseCase();
    this.speechUIController = new SpeechUIController(this.listenLiveSpeechUseCase, this.exportTranscriptUseCase);
  }

  async initialize(): Promise<void> {
    logger.info(`Booting ${APP_CONFIG.appName} v${APP_CONFIG.version} (Schema v${APP_CONFIG.schemaVersion})`);

    // Expose speech bridge IMMEDIATELY so HUD Escucha works before projects finish loading
    this.exposeSpeechBridge();

    // Subscribe to domain events
    this.eventBus.subscribe('project.loaded', (payload: any) => {
      logger.info(`Loaded ${payload.projectsCount} canonical projects`, { count: payload.projectsCount });
    });

    this.eventBus.subscribe('project.selected', (payload: any) => {
      logger.info(`Selected project: ${payload.slug}`);
    });

    this.eventBus.subscribe('narrative.generated', (payload: any) => {
      logger.info(`Narrative plan generated for ${payload.projectId} (${payload.audience}): ${payload.readiness}`);
    });

    // Load canonical projects
    const projects = await this.listProjectsUseCase.execute();
    logger.info(`Initialized successfully with ${projects.length} canonical ventures`);

    // Keyboard listener with Input Isolation
    if (typeof window !== 'undefined') {
      window.addEventListener('keydown', (e: KeyboardEvent) => {
        // Input Isolation check: do NOT trigger navigation if typing inside an editable field
        const target = e.target as HTMLElement;
        if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA' || target.isContentEditable)) {
          return;
        }

        // Presenter Cockpit navigation
        if (this.activePresenterSession) {
          if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            this.nextPresenterScene();
          } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            this.prevPresenterScene();
          } else if (e.key === 'Home') {
            this.goToPresenterScene(0);
          } else if (e.key === 'End') {
            if (this.activePresentation) {
              this.goToPresenterScene(this.activePresentation.getScenes().length - 1);
            }
          } else if (e.key === 'Escape') {
            if (this.isPresenterOverviewOpen) {
              this.togglePresenterOverview();
            } else {
              this.closePresenterCockpit();
            }
          }
          return;
        }

        // Standard Audience V2 Presentation navigation
        if (this.activePresentation) {
          if (e.key === 'ArrowRight' || e.key === 'PageDown' || e.key === ' ') {
            this.nextPresentationScene();
          } else if (e.key === 'ArrowLeft' || e.key === 'PageUp') {
            this.prevPresentationScene();
          } else if (e.key === 'Home') {
            this.goToPresentationScene(0);
          } else if (e.key === 'End') {
            this.goToPresentationScene(this.activePresentation.getScenes().length - 1);
          } else if (e.key === 'Escape') {
            if (this.isPresentationOverviewOpen) {
              this.togglePresentationOverview();
            } else {
              this.closePresentation();
            }
          }
        }
      });

      // Expose full bridge for browser integration and legacy runtime
      (window as any).VentureHubBridge = {
        ...(window as any).VentureHubBridge,
        app: this,
        listProjects: () => this.listProjectsUseCase.execute(),
        getProject: (id: string) => this.getProjectUseCase.execute({ idOrSlug: id }),
        validateProject: (id: string) => this.validateProjectUseCase.execute(id),
        getSections: (id: string) => this.getProjectSectionsUseCase.execute({ projectId: id }),
        launchProject: (id: string) => this.openLegacyUseCase.execute({ projectId: id }),
        launchV2Presentation: (slug: string, audience = 'INVESTOR') => this.launchV2Presentation(slug, audience),
        closePresentation: () => this.closePresentation(),
        nextPresentationScene: () => this.nextPresentationScene(),
        prevPresentationScene: () => this.prevPresentationScene(),
        goToPresentationScene: (idx: number) => this.goToPresentationScene(idx),
        togglePresentationOverview: () => this.togglePresentationOverview(),
        togglePresentationTheme: () => this.togglePresentationTheme(),
        togglePresentationFullscreen: () => this.togglePresentationFullscreen(),
        getPresentationProfile: (id: string) => this.getPresentationProfileUseCase.execute(id),
        getPresentationTheme: (id: string) => this.getPresentationThemeUseCase.execute(id),
        buildSessionSummary: (p: any, s: any) => this.buildSessionSummaryUseCase.execute(p, s),
        getActiveSectionId: () => this.activeSectionId,
        
        // Presenter Cockpit Bridge APIs
        openPresenterCockpit: (slug: string, audience = 'INVESTOR') => this.openPresenterCockpit(slug, audience),
        closePresenterCockpit: () => this.closePresenterCockpit(),
        togglePresenterPlayPause: () => this.togglePresenterPlayPause(),
        endPresenterSession: () => this.endPresenterSession(),
        nextPresenterScene: () => this.nextPresenterScene(),
        prevPresenterScene: () => this.prevPresenterScene(),
        goToPresenterScene: (idx: number) => this.goToPresenterScene(idx),
        setPresenterTab: (tab: 'NOTES' | 'TRUST' | 'QA') => this.setPresenterTab(tab),
        togglePresenterOverview: () => this.togglePresenterOverview(),
        togglePresenterFullscreen: () => this.togglePresenterFullscreen(),

        // Copilot Bridge APIs
        openCopilotWorkspace: (slug: string, taskType?: CopilotTaskType) => this.openCopilotWorkspace(slug, taskType),
        closeCopilotWorkspace: () => this.closeWorkspace(),
        setCopilotProvider: (provider: string) => this.setCopilotProvider(provider),
        runActiveCopilotTask: (projectId: string) => this.runActiveCopilotTask(projectId),
        reviewCopilotProposal: (proposalId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', editedValue?: any) => this.reviewCopilotProposal(proposalId, action, editedValue),
        executeCopilotTask: (req: any) => this.executeCopilotTaskUseCase.execute(req),
        setCopilotSessionKey: (provider: AiProviderType, key: string) => this.sessionKeyStore.setKey(provider, key),

        // Data Room Bridge APIs
        openDataRoomWorkspace: (slug: string, tab?: 'DOCUMENTS' | 'COVERAGE' | 'REQUESTS' | 'GAPS' | 'READINESS') => this.openDataRoomWorkspace(slug, tab),
        closeDataRoomWorkspace: () => this.closeWorkspace(),
        setDataRoomTab: (tab: 'DOCUMENTS' | 'COVERAGE' | 'REQUESTS' | 'GAPS' | 'READINESS') => this.setDataRoomTab(tab),
        getDataRoom: (slug: string) => this.getDataRoomUseCase.execute(slug),
        listDataRoomDocuments: (filter: any) => this.listDataRoomDocumentsUseCase.execute(filter),
        getDiligenceReadiness: (slug: string) => this.evaluateDiligenceReadinessUseCase.execute(slug),

        // Security Control Plane Bridge APIs
        openSecurityDashboard: (tab?: 'MEMBERS' | 'PROJECT_ACCESS' | 'PERMISSION_INSPECTOR' | 'AUDIT_LOG' | 'STATUS') => this.openSecurityDashboard(tab),
        closeSecurityDashboard: () => this.closeWorkspace(),
        setSecurityTab: (tab: 'MEMBERS' | 'PROJECT_ACCESS' | 'PERMISSION_INSPECTOR' | 'AUDIT_LOG' | 'STATUS') => this.setSecurityTab(tab),
        securitySignIn: (email: string, pass: string) => this.securitySignIn(email, pass),
        securitySignOut: () => this.securitySignOut(),
        addOrganizationMember: (email: string, role: OrganizationRole) => this.addOrganizationMember(email, role),
        changeMemberRole: (userId: string, role: OrganizationRole) => this.changeMemberRole(userId, role),
        suspendMember: (userId: string) => this.suspendMember(userId),
        grantProjectAccess: (projectId: string, userId: string, role: ProjectRole) => this.grantProjectAccess(projectId, userId, role),
        changeProjectRole: (projectId: string, userId: string, role: ProjectRole) => this.changeProjectRole(projectId, userId, role),
        getCurrentSecurityContext: (orgId?: string, projId?: string) => this.buildSecurityContextUseCase.execute(orgId || this.activeOrganizationId, projId),
        authorizePermission: (perm: Permission, resource?: any) => this.authorizePermissionUseCase.execute(perm, resource),

        // Secure Storage Bridge APIs (Phase 009)
        openSecureStorageWorkspace: (slug?: string, tab?: 'FILES' | 'SHARING' | 'AUDIT' | 'UPLOAD_PREFLIGHT') => this.openSecureStorageWorkspace(slug, tab),
        closeSecureStorageWorkspace: () => this.closeWorkspace(),
        setSecureStorageTab: (tab: 'FILES' | 'SHARING' | 'AUDIT' | 'UPLOAD_PREFLIGHT') => this.setSecureStorageTab(tab),
        downloadSecureFile: (fileId: string) => this.downloadSecureFile(fileId),
        quarantineSecureFile: (fileId: string) => this.quarantineSecureFile(fileId),
        restoreSecureFile: (fileId: string) => this.restoreSecureFile(fileId),
        deleteSecureFile: (fileId: string) => this.deleteSecureFile(fileId),
        createShareGrant: (granteeUserId: string, scope: any, ceiling: any) => this.createShareGrant(granteeUserId, scope, ceiling),
        revokeShareGrant: (grantId: string) => this.revokeShareGrant(grantId),
        openUploadModal: () => this.openUploadModal(),
        listFileVersions: (fileId: string) => this.listFileVersionsUseCase.execute(this.activeOrganizationId, 'arcana', fileId),
        getSecureFile: (fileId: string) => this.getSecureFileUseCase.execute(this.activeOrganizationId, 'arcana', fileId),

        // Administration Bridge APIs (Phase 010)
        openPlatformAdmin: () => this.openPlatformAdmin(),
        openOrganizationAdmin: (orgId?: string) => this.openOrganizationAdmin(orgId),
        openProjectAdmin: (orgId?: string, projId?: string) => this.openProjectAdmin(orgId, projId),
        closeAdministration: () => this.closeWorkspace(),
        renameOrganization: (orgId: string, name: string) => this.adminUseCases.renameOrganization(orgId, name, this.activeUserId),
        updateOrganizationSettings: (params: any) => this.adminUseCases.updateOrganizationSettings({ ...params, updatedBy: this.activeUserId }),
        suspendOrganization: (orgId: string) => this.adminUseCases.suspendOrganization(orgId, this.activeUserId),
        reactivateOrganization: (orgId: string) => this.adminUseCases.reactivateOrganization(orgId, this.activeUserId),
        archiveOrganization: (orgId: string) => this.adminUseCases.archiveOrganization(orgId, this.activeUserId),
        transferOrganizationOwnership: (orgId: string, newOwnerId: string) => this.adminUseCases.transferOrganizationOwnership(orgId, newOwnerId),
        createProject: (params: any) => this.adminUseCases.createProject({ ...params, createdBy: this.activeUserId }),
        updateProjectSettings: (params: any) => this.adminUseCases.updateProjectSettings({ ...params, updatedBy: this.activeUserId }),
        pauseProject: (orgId: string, projId: string) => this.adminUseCases.pauseProject(orgId, projId, this.activeUserId),
        reactivateProject: (orgId: string, projId: string) => this.adminUseCases.reactivateProject(orgId, projId, this.activeUserId),
        archiveProject: (orgId: string, projId: string) => this.adminUseCases.archiveProject(orgId, projId, this.activeUserId),
        transferProjectOwnership: (orgId: string, projId: string, newOwnerId: string) => this.adminUseCases.transferProjectOwnership(orgId, projId, newOwnerId, this.activeUserId),
        getOrganizationUsage: (orgId: string) => this.adminUseCases.getOrganizationUsage(orgId),
        getProjectUsage: (orgId: string, projId: string) => this.adminUseCases.getProjectUsage(orgId, projId),
        getOperationalHealth: () => this.adminUseCases.getOperationalHealth(),
        getPlatformSummary: () => this.adminUseCases.getPlatformSummary(),
        setActiveOrganization: (orgId: string) => this.setActiveOrganization(orgId),

        // Production Hardening & Observability Bridge APIs (Phase 011)
        getProductionReadiness: () => ProductionReadinessEntity.evaluateReadiness(RuntimeEnvironmentAdapter.getConfig().environment, ProductionReadinessEntity.getStandardChecks()),
        getRuntimeEnvironmentConfig: () => RuntimeEnvironmentAdapter.getConfig(),
        renderProductionReadinessDashboard: () => renderProductionReadiness(ProductionReadinessEntity.evaluateReadiness(RuntimeEnvironmentAdapter.getConfig().environment, ProductionReadinessEntity.getStandardChecks())),

        // Live Speech Intelligence & Subtitle Bridge APIs (Phase 012)
        toggleLiveSpeech: () => this.speechUIController.toggleLiveSpeech(),
        setSpeechLanguage: (lang: 'es' | 'en') => this.speechUIController.setSpeechLanguage(lang),
        toggleSpeechLanguage: () => this.speechUIController.toggleSpeechLanguage(),
        toggleSubtitlesBar: (show?: boolean) => this.speechUIController.toggleSubtitlesVisibility(show),
        openTranscriptDrawer: () => this.speechUIController.openDrawer(),
        closeTranscriptDrawer: () => this.speechUIController.closeDrawer(),
        toggleTranscriptDrawer: () => this.speechUIController.toggleDrawer(),
        filterTranscript: (q: string) => this.speechUIController.filterTranscript(q),
        copyTranscriptToClipboard: () => this.speechUIController.copyToClipboard(),
        copySingleUtterance: (id: string) => this.speechUIController.copySingleUtterance(id),
        downloadTranscriptMarkdown: () => this.speechUIController.downloadMarkdown(),
        downloadTranscriptTxt: () => this.speechUIController.downloadTxt(),
        clearTranscriptSession: () => this.speechUIController.clearSession(),
        syncSpeechSlide: (idx: number) => this.speechUIController.setSlide(idx),
        pauseLiveSpeechForTts: () => this.speechUIController.pauseListeningForTts(),
        resumeLiveSpeechAfterTts: () => this.speechUIController.resumeListeningAfterTts(),

        openWorkspace: (slug: string) => this.openWorkspace(slug),
        openNarrativeWorkspace: (slug: string, req?: Partial<NarrativeRequest>) => this.openNarrativeWorkspace(slug, req),
        openGovernanceWorkspace: (slug: string, tab?: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'TRUST') => this.openGovernanceWorkspace(slug, tab),
        setGovernanceTab: (tab: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'TRUST') => this.setGovernanceTab(tab),
        handleNarrativeSubmit: (e: Event, projectId: string) => this.handleNarrativeSubmit(e, projectId),
        generateNarrativePlan: (req: NarrativeRequest) => this.generateNarrativePlanUseCase.execute(req),
        generatePresentation: (req: any) => this.generatePresentationUseCase.execute(req),
        annotateNarrativeTrust: (plan: any) => this.annotateNarrativeTrustUseCase.execute(plan),
        listProfiles: () => this.listNarrativeProfilesUseCase.execute(),
        listClaims: (projectId: string) => this.listProjectClaimsUseCase.execute(projectId),
        listEvidence: (projectId: string) => this.listProjectEvidenceUseCase.execute(projectId),
        getTrustSummary: (projectId: string) => this.buildProjectTrustSummaryUseCase.execute(projectId),
        getCoverageReport: (projectId: string) => this.evaluateProjectClaimCoverageUseCase.execute(projectId),
        validateNarrativeRequest: (r: any) => this.validateNarrativeRequestUseCase.execute(r),
        getClaim: (id: string) => this.getClaimUseCase.execute(id),
        evaluateClaimSupport: (claim: any) => this.evaluateClaimSupportUseCase.execute(claim),
        getEvidence: (id: string) => this.getEvidenceUseCase.execute(id),
        getEvidenceForClaim: (claimId: string) => this.getEvidenceForClaimUseCase.execute(claimId),
        listPresentationProfiles: () => this.listPresentationProfilesUseCase.execute(),
        listPresentationThemes: () => this.listPresentationThemesUseCase.execute(),
        selectSection: (sectionId: string) => this.selectSection(sectionId),
        openHub: () => this.closeWorkspace(),
        eventBus: this.eventBus
      };
    }
  }

  // --- Due Diligence Data Room Methods ---

  async openDataRoomWorkspace(slug: string, tab: 'DOCUMENTS' | 'COVERAGE' | 'REQUESTS' | 'GAPS' | 'READINESS' = 'DOCUMENTS'): Promise<void> {
    try {
      const project = await this.getProjectUseCase.execute({ idOrSlug: slug });
      this.activeWorkspaceProject = project;
      this.activeDataRoomTab = tab;

      await this.renderCurrentDataRoomWorkspace();
      logger.info(`Opened Data Room workspace for '${slug}' [Tab: ${tab}]`);
    } catch (err) {
      logger.error(`Failed to open Data Room workspace for '${slug}':`, err);
    }
  }

  async setDataRoomTab(tab: 'DOCUMENTS' | 'COVERAGE' | 'REQUESTS' | 'GAPS' | 'READINESS'): Promise<void> {
    this.activeDataRoomTab = tab;
    await this.renderCurrentDataRoomWorkspace();
  }

  async renderCurrentDataRoomWorkspace(): Promise<void> {
    if (!this.activeWorkspaceProject) return;
    const slug = this.activeWorkspaceProject.getId();

    const docs = await this.listDataRoomDocumentsUseCase.execute({ projectId: slug });
    const reqs = await this.listDiligenceRequestsUseCase.execute(slug);
    const coverage = await this.evaluateDiligenceCoverageUseCase.execute(slug);
    const { explanation, gaps } = await this.evaluateDiligenceReadinessUseCase.execute(slug);

    const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
    mount.innerHTML = renderDataRoomPage(
      this.activeWorkspaceProject,
      docs,
      reqs,
      coverage,
      explanation,
      gaps,
      this.activeDataRoomTab
    );
    mount.style.display = 'block';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = 'none';
  }

  // --- Security Control Plane Methods ---

  async openSecurityDashboard(tab: 'MEMBERS' | 'PROJECT_ACCESS' | 'PERMISSION_INSPECTOR' | 'AUDIT_LOG' | 'STATUS' = 'STATUS'): Promise<void> {
    try {
      this.activeSecurityTab = tab;
      await this.renderSecurityDashboard();
      logger.info(`Opened Security Dashboard [Tab: ${tab}]`);
    } catch (err) {
      logger.error('Failed to open Security Dashboard:', err);
    }
  }

  async setSecurityTab(tab: 'MEMBERS' | 'PROJECT_ACCESS' | 'PERMISSION_INSPECTOR' | 'AUDIT_LOG' | 'STATUS'): Promise<void> {
    this.activeSecurityTab = tab;
    await this.renderSecurityDashboard();
  }

  async renderSecurityDashboard(errorMessage?: string, successMessage?: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId);
    const members = await this.securityStore.listMembershipsByOrg(this.activeOrganizationId);
    const projectAccess = await this.securityStore.listProjectAccessByProject(this.activeOrganizationId, 'arcana');
    const auditEvents = await this.listAuditEventsUseCase.execute(this.activeOrganizationId);

    const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
    mount.innerHTML = renderSecurityDashboardPage({
      context,
      activeTab: this.activeSecurityTab,
      members,
      projectAccess,
      auditEvents,
      errorMessage,
      successMessage
    });
    mount.style.display = 'block';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = 'none';
  }

  async securitySignIn(email: string, pass: string): Promise<void> {
    try {
      await this.securityStore.signInWithEmailPassword(email, pass);
      await this.renderSecurityDashboard(undefined, `Sesión iniciada correctamente como ${email}`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message || 'Error al iniciar sesión');
    }
  }

  async securitySignOut(): Promise<void> {
    await this.securityStore.signOut();
    await this.renderSecurityDashboard(undefined, 'Sesión finalizada');
  }

  async addOrganizationMember(email: string, role: OrganizationRole): Promise<void> {
    const identity = await this.securityStore.getCurrentIdentity();
    if (!identity) return;
    try {
      await this.securityAdminUseCase.addMember(this.activeOrganizationId, email, role, identity.userId);
      await this.renderSecurityDashboard(undefined, `Miembro '${email}' agregado con rol ${role}`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message);
    }
  }

  async changeMemberRole(userId: string, role: OrganizationRole): Promise<void> {
    const identity = await this.securityStore.getCurrentIdentity();
    if (!identity) return;
    try {
      await this.securityAdminUseCase.changeMemberRole(this.activeOrganizationId, userId, role, identity.userId);
      await this.renderSecurityDashboard(undefined, `Rol del usuario '${userId}' actualizado a ${role}`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message);
    }
  }

  async suspendMember(userId: string): Promise<void> {
    const identity = await this.securityStore.getCurrentIdentity();
    if (!identity) return;
    try {
      await this.securityAdminUseCase.suspendMember(this.activeOrganizationId, userId, identity.userId);
      await this.renderSecurityDashboard(undefined, `Usuario '${userId}' suspendido`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message);
    }
  }

  async grantProjectAccess(projectId: string, userId: string, role: ProjectRole): Promise<void> {
    const identity = await this.securityStore.getCurrentIdentity();
    if (!identity) return;
    try {
      await this.securityAdminUseCase.grantProjectAccess(this.activeOrganizationId, projectId, userId, role, identity.userId);
      await this.renderSecurityDashboard(undefined, `Acceso al proyecto '${projectId}' concedido a '${userId}' como ${role}`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message);
    }
  }

  async changeProjectRole(projectId: string, userId: string, role: ProjectRole): Promise<void> {
    const identity = await this.securityStore.getCurrentIdentity();
    if (!identity) return;
    try {
      await this.securityAdminUseCase.changeProjectRole(this.activeOrganizationId, projectId, userId, role, identity.userId);
      await this.renderSecurityDashboard(undefined, `Rol del proyecto '${projectId}' para '${userId}' cambiado a ${role}`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message);
    }
  }

  async revokeProjectAccess(projectId: string, userId: string): Promise<void> {
    const identity = await this.securityStore.getCurrentIdentity();
    if (!identity) return;
    try {
      await this.securityAdminUseCase.revokeProjectAccess(this.activeOrganizationId, projectId, userId, identity.userId);
      await this.renderSecurityDashboard(undefined, `Acceso al proyecto '${projectId}' revocado para '${userId}'`);
    } catch (err: any) {
      await this.renderSecurityDashboard(err.message);
    }
  }

  // --- Secure Storage UI Methods (Phase 009) ---

  async openSecureStorageWorkspace(slug = 'arcana', tab: 'FILES' | 'SHARING' | 'AUDIT' | 'UPLOAD_PREFLIGHT' = 'FILES'): Promise<void> {
    try {
      const project = await this.getProjectUseCase.execute({ idOrSlug: slug });
      this.activeWorkspaceProject = project;
      this.activeSecureStorageTab = tab;
      await this.renderSecureStorageWorkspace();
    } catch (err: any) {
      logger.error('Failed to open secure storage workspace:', err);
    }
  }

  async setSecureStorageTab(tab: 'FILES' | 'SHARING' | 'AUDIT' | 'UPLOAD_PREFLIGHT'): Promise<void> {
    this.activeSecureStorageTab = tab;
    await this.renderSecureStorageWorkspace();
  }

  async renderSecureStorageWorkspace(errorMessage?: string, successMessage?: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    const files = await this.listSecureFilesUseCase.execute(this.activeOrganizationId, 'arcana');
    const grants = await this.listShareGrantsUseCase.execute(this.activeOrganizationId, 'arcana');
    const auditEvents = await this.secureStorageStore.listStorageAuditEvents(this.activeOrganizationId, 'arcana');

    const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
    mount.innerHTML = renderSecureStoragePage({
      context,
      activeTab: this.activeSecureStorageTab,
      files,
      grants,
      auditEvents,
      errorMessage,
      successMessage
    });
    mount.style.display = 'block';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = 'none';
  }

  async downloadSecureFile(fileId: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    if (!context) {
      await this.renderSecureStorageWorkspace('Inicie sesión para descargar archivos seguros.');
      return;
    }

    try {
      const result = await this.downloadSecureFileUseCase.execute({
        context,
        organizationId: this.activeOrganizationId,
        projectId: 'arcana',
        fileId
      });
      await this.renderSecureStorageWorkspace(undefined, `Descarga autorizada para '${result.fileName}' (${result.mediaType})`);
    } catch (err: any) {
      await this.renderSecureStorageWorkspace(err.message);
    }
  }

  async quarantineSecureFile(fileId: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    if (!context) return;
    try {
      await this.quarantineFileUseCase.execute(this.activeOrganizationId, 'arcana', fileId, context.identity.userId);
      await this.renderSecureStorageWorkspace(undefined, `Archivo '${fileId}' puesto en cuarentena de seguridad`);
    } catch (err: any) {
      await this.renderSecureStorageWorkspace(err.message);
    }
  }

  async restoreSecureFile(fileId: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    if (!context) return;
    try {
      await this.restoreQuarantinedFileUseCase.execute(this.activeOrganizationId, 'arcana', fileId, context.identity.userId);
      await this.renderSecureStorageWorkspace(undefined, `Archivo '${fileId}' restaurado a estado disponible`);
    } catch (err: any) {
      await this.renderSecureStorageWorkspace(err.message);
    }
  }

  async deleteSecureFile(fileId: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    if (!context) return;
    if (!confirm('¿Confirma que desea eliminar este archivo y todas sus versiones de forma permanente?')) return;
    try {
      await this.deleteSecureFileUseCase.execute(this.activeOrganizationId, 'arcana', fileId, context.identity.userId);
      await this.renderSecureStorageWorkspace(undefined, `Archivo '${fileId}' eliminado`);
    } catch (err: any) {
      await this.renderSecureStorageWorkspace(err.message);
    }
  }

  async createShareGrant(granteeUserId: string, scope = 'PROJECT_DATA_ROOM', ceiling = 'CONFIDENTIAL'): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    if (!context) return;
    try {
      await this.createShareGrantUseCase.execute({
        organizationId: this.activeOrganizationId,
        projectId: 'arcana',
        granteeUserId,
        scope: scope as any,
        fileIds: [],
        confidentialityCeiling: ceiling as any,
        createdBy: context.identity.userId
      });
      await this.renderSecureStorageWorkspace(undefined, `Concesión de acceso creada para '${granteeUserId}' con límite ${ceiling}`);
    } catch (err: any) {
      await this.renderSecureStorageWorkspace(err.message);
    }
  }

  async revokeShareGrant(grantId: string): Promise<void> {
    const context = await this.buildSecurityContextUseCase.execute(this.activeOrganizationId, 'arcana');
    if (!context) return;
    try {
      await this.revokeShareGrantUseCase.execute(grantId, context.identity.userId);
      await this.renderSecureStorageWorkspace(undefined, `Concesión '${grantId}' revocada`);
    } catch (err: any) {
      await this.renderSecureStorageWorkspace(err.message);
    }
  }

  async openUploadModal(): Promise<void> {
    const intent = await this.createUploadIntentUseCase.execute({
      organizationId: this.activeOrganizationId,
      projectId: this.activeProjectId || 'arcana',
      requestedBy: this.activeUserId,
      logicalName: 'New Evidence Document',
      originalFileName: 'new_evidence_document.pdf',
      mediaType: 'application/pdf',
      sizeBytes: 1500000,
      confidentiality: 'INTERNAL'
    });
    await this.finalizeUploadUseCase.execute({
      intentId: intent.id,
      actorUserId: this.activeUserId,
      actualStoragePath: `organizations/${this.activeOrganizationId}/projects/${this.activeProjectId || 'arcana'}/data-room/${intent.id}/versions/v1/new_evidence_document.pdf`,
      actualSizeBytes: 1500000
    });
    this.activeSecureStorageTab = 'UPLOAD_PREFLIGHT';
    await this.renderSecureStorageWorkspace(undefined, 'Upload intent created and finalized successfully. Preflight verification passed.');
  }

  // --- AI Copilot Methods ---

  async openCopilotWorkspace(slug: string, taskType: CopilotTaskType = 'PROJECT_ANALYSIS'): Promise<void> {
    try {
      const project = await this.getProjectUseCase.execute({ idOrSlug: slug });
      this.activeWorkspaceProject = project;
      this.activeCopilotTask = taskType;
      this.activeCopilotResult = null;
      this.isCopilotExecuting = false;

      this.renderCurrentCopilotWorkspace();
      logger.info(`Opened Copilot workspace for '${slug}'`);
    } catch (err) {
      logger.error(`Failed to open Copilot workspace for '${slug}':`, err);
    }
  }

  setCopilotProvider(provider: string): void {
    this.activeCopilotProvider = provider as AiProviderType;
    this.renderCurrentCopilotWorkspace();
  }

  async runActiveCopilotTask(projectId: string): Promise<void> {
    const taskSelect = document.getElementById('copilotTaskSelect') as HTMLSelectElement;
    const userInstructionEl = document.getElementById('copilotUserInstruction') as HTMLTextAreaElement;

    if (taskSelect) this.activeCopilotTask = taskSelect.value as CopilotTaskType;
    const userInstruction = userInstructionEl ? userInstructionEl.value : undefined;

    this.isCopilotExecuting = true;
    this.renderCurrentCopilotWorkspace();

    try {
      const result = await this.executeCopilotTaskUseCase.execute({
        id: `req-${Date.now()}`,
        taskType: this.activeCopilotTask,
        projectId,
        projectVersion: '0.1.0',
        contextScope: ['PROJECT', 'SECTION', 'CLAIMS', 'EVIDENCE', 'TRUST'],
        userInstruction,
        providerConfig: {
          provider: this.activeCopilotProvider,
          modelId: 'mock-deterministic-v1'
        },
        language: 'ES',
        createdAt: new Date().toISOString()
      });

      this.activeCopilotResult = result;
    } catch (err) {
      logger.error('Failed to execute Copilot task:', err);
    } finally {
      this.isCopilotExecuting = false;
      this.renderCurrentCopilotWorkspace();
    }
  }

  reviewCopilotProposal(proposalId: string, action: 'APPROVE' | 'REJECT' | 'EDIT', editedValue?: any): void {
    if (!this.activeCopilotResult) return;
    const proposal = this.activeCopilotResult.getProposals().find(p => p.getId() === proposalId);
    if (proposal) {
      this.reviewCopilotProposalUseCase.execute({
        proposal,
        action,
        editedValue,
        reviewerName: 'EXECUTIVE_USER'
      });
      this.renderCurrentCopilotWorkspace();
      logger.info(`Copilot proposal '${proposalId}' reviewed: ${action}`);
    }
  }

  renderCurrentCopilotWorkspace(): void {
    if (!this.activeWorkspaceProject) return;
    const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
    mount.innerHTML = renderCopilotPage(
      this.activeWorkspaceProject,
      this.activeCopilotTask,
      this.activeCopilotProvider,
      this.activeCopilotResult,
      this.isCopilotExecuting
    );
    mount.style.display = 'block';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = 'none';
  }

  // --- Presenter Cockpit Methods ---

  async openPresenterCockpit(slug: string, audience = 'INVESTOR'): Promise<void> {
    try {
      const defaultReq: NarrativeRequest = {
        projectId: slug,
        audience: (audience as any) || 'INVESTOR',
        objective: 'RAISE_CAPITAL',
        duration: 'TEN_MINUTES',
        language: 'EN',
        depth: 'STANDARD'
      };

      const narrativePlan = await this.generateNarrativePlanUseCase.execute(defaultReq);
      const presentation = await this.generatePresentationUseCase.execute({
        projectId: slug,
        narrativePlan
      });

      this.activePresentation = presentation;
      this.activePresenterSession = this.createPresenterSessionUseCase.execute({ presentation });
      this.activePresenterTab = 'NOTES';
      this.isPresenterOverviewOpen = false;

      // Start tick interval for live session timer
      if (this.presenterTimerInterval) clearInterval(this.presenterTimerInterval);
      this.presenterTimerInterval = setInterval(() => {
        if (this.activePresenterSession && this.activePresenterSession.getStatus() === 'RUNNING') {
          this.activePresenterSession.tick(1);
          this.renderCurrentPresenterCockpit();
        }
      }, 1000);

      await this.renderCurrentPresenterCockpit();
      logger.info(`Opened Presenter Cockpit for '${slug}'`);
    } catch (err) {
      logger.error(`Failed to open Presenter Cockpit for '${slug}':`, err);
    }
  }

  async renderCurrentPresenterCockpit(): Promise<void> {
    if (!this.activePresentation || !this.activePresenterSession) return;

    const context = await this.getPresenterContextUseCase.execute(
      this.activePresentation,
      this.activePresenterSession
    );

    const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
    mount.innerHTML = renderPresenterPage(
      this.activePresentation,
      context,
      this.presentationRenderer,
      this.activePresenterTab,
      this.isPresenterOverviewOpen
    );
    mount.style.display = 'block';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = 'none';
  }

  togglePresenterPlayPause(): void {
    if (!this.activePresenterSession) return;
    const st = this.activePresenterSession.getStatus();

    if (st === 'IDLE') {
      this.activePresenterSession.start();
    } else if (st === 'RUNNING') {
      this.activePresenterSession.pause();
    } else if (st === 'PAUSED') {
      this.activePresenterSession.resume();
    }
    this.renderCurrentPresenterCockpit();
  }

  endPresenterSession(): void {
    if (!this.activePresenterSession) return;
    this.activePresenterSession.end();
    if (this.presenterTimerInterval) {
      clearInterval(this.presenterTimerInterval);
      this.presenterTimerInterval = null;
    }
    this.renderCurrentPresenterCockpit();
  }

  nextPresenterScene(): void {
    if (!this.activePresenterSession || !this.activePresentation) return;
    const total = this.activePresentation.getScenes().length;
    this.activePresenterSession.next(total);
    this.speechUIController.setSlide(this.activePresenterSession.getCurrentSceneIndex());
    this.renderCurrentPresenterCockpit();
  }

  prevPresenterScene(): void {
    if (!this.activePresenterSession || !this.activePresentation) return;
    const total = this.activePresentation.getScenes().length;
    this.activePresenterSession.prev(total);
    this.speechUIController.setSlide(this.activePresenterSession.getCurrentSceneIndex());
    this.renderCurrentPresenterCockpit();
  }

  goToPresenterScene(index: number): void {
    if (!this.activePresenterSession || !this.activePresentation) return;
    const total = this.activePresentation.getScenes().length;
    this.activePresenterSession.goToScene(index, total);
    this.speechUIController.setSlide(index);
    this.isPresenterOverviewOpen = false;
    this.renderCurrentPresenterCockpit();
  }

  setPresenterTab(tab: 'NOTES' | 'TRUST' | 'QA' | 'SPEECH'): void {
    this.activePresenterTab = tab;
    this.renderCurrentPresenterCockpit();
  }

  togglePresenterOverview(): void {
    this.isPresenterOverviewOpen = !this.isPresenterOverviewOpen;
    const el = document.getElementById('presenterOverviewDrawer');
    if (el) el.style.display = this.isPresenterOverviewOpen ? 'block' : 'none';
  }

  togglePresenterFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  closePresenterCockpit(): void {
    if (this.presenterTimerInterval) {
      clearInterval(this.presenterTimerInterval);
      this.presenterTimerInterval = null;
    }
    this.activePresenterSession = null;
    this.isPresenterOverviewOpen = false;
    this.closeWorkspace();
  }

  // --- Standard V2 Presentation Methods ---

  async launchV2Presentation(slug: string, audience = 'INVESTOR'): Promise<void> {
    try {
      const defaultReq: NarrativeRequest = {
        projectId: slug,
        audience: (audience as any) || 'INVESTOR',
        objective: 'RAISE_CAPITAL',
        duration: 'TEN_MINUTES',
        language: 'EN',
        depth: 'STANDARD'
      };

      const narrativePlan = await this.generateNarrativePlanUseCase.execute(defaultReq);
      const presentation = await this.generatePresentationUseCase.execute({
        projectId: slug,
        narrativePlan
      });

      this.activePresentation = presentation;
      this.activeSceneIndex = 0;
      this.isPresentationOverviewOpen = false;
      this.speechUIController.setSlide(0);

      this.renderCurrentPresentation();
      logger.info(`Launched V2 presentation for '${slug}' (${presentation.getScenes().length} scenes)`);
    } catch (err) {
      logger.error(`Failed to launch V2 presentation for '${slug}':`, err);
    }
  }

  renderCurrentPresentation(): void {
    if (!this.activePresentation) return;
    const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
    mount.innerHTML = this.presentationRenderer.renderPresentationShell(
      this.activePresentation,
      this.activeSceneIndex,
      this.activePresentationTheme
    );
    mount.style.display = 'block';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = 'none';
  }

  nextPresentationScene(): void {
    if (!this.activePresentation) return;
    if (this.activeSceneIndex < this.activePresentation.getScenes().length - 1) {
      this.activeSceneIndex++;
      this.speechUIController.setSlide(this.activeSceneIndex);
      this.renderCurrentPresentation();
    }
  }

  prevPresentationScene(): void {
    if (!this.activePresentation) return;
    if (this.activeSceneIndex > 0) {
      this.activeSceneIndex--;
      this.speechUIController.setSlide(this.activeSceneIndex);
      this.renderCurrentPresentation();
    }
  }

  goToPresentationScene(index: number): void {
    if (!this.activePresentation) return;
    if (index >= 0 && index < this.activePresentation.getScenes().length) {
      this.activeSceneIndex = index;
      this.speechUIController.setSlide(index);
      this.isPresentationOverviewOpen = false;
      this.renderCurrentPresentation();
    }
  }

  togglePresentationOverview(): void {
    this.isPresentationOverviewOpen = !this.isPresentationOverviewOpen;
    const overviewEl = document.getElementById('v2OverviewDrawer');
    if (overviewEl) {
      overviewEl.style.display = this.isPresentationOverviewOpen ? 'block' : 'none';
    }
  }

  togglePresentationTheme(): void {
    this.activePresentationTheme = this.activePresentationTheme === 'DARK' ? 'LIGHT' : 'DARK';
    this.renderCurrentPresentation();
  }

  togglePresentationFullscreen(): void {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen().catch(() => {});
    } else {
      document.exitFullscreen().catch(() => {});
    }
  }

  closePresentation(): void {
    this.activePresentation = null;
    this.activeSceneIndex = 0;
    this.isPresentationOverviewOpen = false;
    this.closeWorkspace();
  }

  // --- Administration Workspace Methods (Phase 010) ---

  async openPlatformAdmin(): Promise<void> {
    try {
      const summary = await this.adminUseCases.getPlatformSummary();
      const health = await this.adminUseCases.getOperationalHealth();
      const organizations = await this.adminStore.listAllOrgRecords();

      const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
      mount.innerHTML = renderPlatformAdminPage({
        summary,
        health,
        organizations
      });
      mount.style.display = 'block';

      const mainHub = document.getElementById('deck-hub');
      if (mainHub) mainHub.style.display = 'none';
      logger.info('Opened Platform Admin Console');
    } catch (err: any) {
      logger.error('Failed to open Platform Admin Console:', err);
    }
  }

  async openOrganizationAdmin(orgId = 'org-arcana'): Promise<void> {
    try {
      this.activeOrganizationId = orgId;
      let orgRecord = await this.adminStore.findOrgRecordById(orgId);
      if (!orgRecord) {
        orgRecord = {
          organizationId: orgId,
          name: 'Arcana Trust Network',
          slug: 'arcana',
          status: 'ACTIVE',
          ownerUserId: this.activeUserId,
          memberCount: 3,
          activeProjectCount: 1,
          archivedProjectCount: 0,
          storageUsageBytes: 22445000,
          createdAt: new Date().toISOString(),
          updatedAt: new Date().toISOString()
        };
      }

      let settings = await this.adminStore.findOrgSettingsById(orgId);
      if (!settings) {
        settings = {
          organizationId: orgId,
          displayName: orgRecord.name,
          defaultLanguage: 'es',
          timezone: 'America/Bogota',
          defaultProjectRole: 'PROJECT_VIEWER',
          invitePolicy: 'ADMINS_ONLY',
          dataRoomDefaultConfidentiality: 'INTERNAL',
          updatedAt: new Date().toISOString(),
          updatedBy: this.activeUserId
        };
      }

      const usage = await this.adminUseCases.getOrganizationUsage(orgId);
      const rawMembers = await this.securityStore.listMembershipsByOrg(orgId);
      const members = rawMembers.map(m => ({
        userId: m.userId,
        email: `${m.userId}@arcanatrust.net`,
        role: m.role,
        status: m.status,
        projectCount: 1,
        joinedAt: m.createdAt
      }));

      const projects = await this.adminStore.listProjectRecordsByOrganization(orgId);
      const auditEvents = await this.listAuditEventsUseCase.execute(orgId);

      const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
      mount.innerHTML = renderOrganizationAdminPage({
        orgRecord,
        settings,
        usage,
        members,
        projects,
        auditEvents,
        currentUserId: this.activeUserId
      });
      mount.style.display = 'block';

      const mainHub = document.getElementById('deck-hub');
      if (mainHub) mainHub.style.display = 'none';
      logger.info(`Opened Organization Admin Console for '${orgId}'`);
    } catch (err: any) {
      logger.error(`Failed to open Organization Admin Console for '${orgId}':`, err);
    }
  }

  async openProjectAdmin(orgId = 'org-arcana', projId = 'arcana'): Promise<void> {
    try {
      this.activeOrganizationId = orgId;
      this.activeProjectId = projId;

      let projectRecord = await this.adminStore.findProjectRecordById(orgId, projId);
      if (!projectRecord) {
        projectRecord = {
          projectId: projId,
          organizationId: orgId,
          name: 'Arcana Trust Network Venture',
          slug: 'arcana',
          status: 'ACTIVE',
          ownerUserId: this.activeUserId,
          projectTwinId: 'twin-arcana-pilot',
          createdAt: new Date().toISOString(),
          createdBy: this.activeUserId,
          updatedAt: new Date().toISOString(),
          updatedBy: this.activeUserId
        };
      }

      let settings = await this.adminStore.findProjectSettingsById(orgId, projId);
      if (!settings) {
        settings = {
          organizationId: orgId,
          projectId: projId,
          displayName: projectRecord.name,
          defaultLanguage: 'es',
          defaultNarrativeAudience: 'INVESTOR',
          defaultNarrativeDuration: 'FIVE_MINUTES',
          dataRoomEnabled: true,
          copilotEnabled: true,
          presenterEnabled: true,
          updatedAt: new Date().toISOString(),
          updatedBy: this.activeUserId
        };
      }

      const usage = await this.adminUseCases.getProjectUsage(orgId, projId);
      const rawAccess = await this.securityStore.listProjectAccessByProject(orgId, projId);
      const accessList = rawAccess.map(a => ({
        userId: a.userId,
        role: a.role,
        status: a.status,
        grantedBy: a.createdBy,
        grantedAt: a.createdAt
      }));

      const auditEvents = await this.listAuditEventsUseCase.execute(orgId);

      const mount = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
      mount.innerHTML = renderProjectAdminPage({
        projectRecord,
        settings,
        usage,
        accessList,
        auditEvents
      });
      mount.style.display = 'block';

      const mainHub = document.getElementById('deck-hub');
      if (mainHub) mainHub.style.display = 'none';
      logger.info(`Opened Project Admin Console for '${orgId}:${projId}'`);
    } catch (err: any) {
      logger.error(`Failed to open Project Admin Console for '${orgId}:${projId}':`, err);
    }
  }

  setActiveOrganization(orgId: string): void {
    this.activeOrganizationId = orgId;
    this.activeProjectId = undefined; // Clears active project context on organization switch (T-44)
    logger.info(`Switched active organization to '${orgId}'. Active project cleared.`);
  }

  async openWorkspace(slug: string): Promise<void> {
    try {
      const project = await this.getProjectUseCase.execute({ idOrSlug: slug });
      const validation = await this.validateProjectUseCase.execute(slug);
      this.activeWorkspaceProject = project;
      this.activeSectionId = undefined;

      const workspaceContainer = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
      workspaceContainer.innerHTML = renderWorkspacePage(project, validation);
      workspaceContainer.style.display = 'block';

      const mainHub = document.getElementById('deck-hub');
      if (mainHub) mainHub.style.display = 'none';

      logger.info(`Opened workspace for '${slug}'`);
    } catch (err) {
      logger.error(`Failed to open workspace for '${slug}':`, err);
    }
  }

  async openNarrativeWorkspace(slug: string, currentReq?: Partial<NarrativeRequest>): Promise<void> {
    try {
      const project = await this.getProjectUseCase.execute({ idOrSlug: slug });
      this.activeWorkspaceProject = project;

      const defaultReq: NarrativeRequest = {
        projectId: slug,
        audience: currentReq?.audience || 'INVESTOR',
        objective: currentReq?.objective || 'RAISE_CAPITAL',
        duration: currentReq?.duration || 'TEN_MINUTES',
        language: currentReq?.language || 'EN',
        depth: currentReq?.depth || 'STANDARD'
      };

      const plan = await this.generateNarrativePlanUseCase.execute(defaultReq);

      const workspaceContainer = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
      workspaceContainer.innerHTML = renderNarrativePage(project, plan, defaultReq);
      workspaceContainer.style.display = 'block';

      const mainHub = document.getElementById('deck-hub');
      if (mainHub) mainHub.style.display = 'none';

      logger.info(`Opened narrative workspace for '${slug}'`);
    } catch (err) {
      logger.error(`Failed to open narrative workspace for '${slug}':`, err);
    }
  }

  async openGovernanceWorkspace(slug: string, tab: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'TRUST' = 'CLAIMS'): Promise<void> {
    try {
      this.activeGovernanceTab = tab;
      const claims = await this.listProjectClaimsUseCase.execute(slug);
      const evidence = await this.listProjectEvidenceUseCase.execute(slug);
      const summary = await this.buildProjectTrustSummaryUseCase.execute(slug);
      const coverage = await this.evaluateProjectClaimCoverageUseCase.execute(slug);

      const workspaceContainer = document.getElementById('projectWorkspaceMount') || this.createWorkspaceMount();
      workspaceContainer.innerHTML = renderGovernancePage(slug, claims, evidence, summary, coverage, tab);
      workspaceContainer.style.display = 'block';

      const mainHub = document.getElementById('deck-hub');
      if (mainHub) mainHub.style.display = 'none';

      logger.info(`Opened governance workspace for '${slug}' [Tab: ${tab}]`);
    } catch (err) {
      logger.error(`Failed to open governance workspace for '${slug}':`, err);
    }
  }

  setGovernanceTab(tab: 'CLAIMS' | 'EVIDENCE' | 'COVERAGE' | 'TRUST'): void {
    if (!this.activeWorkspaceProject && !this.activeGovernanceTab) return;
    const slug = this.activeWorkspaceProject ? this.activeWorkspaceProject.getId() : 'arcana';
    this.openGovernanceWorkspace(slug, tab);
  }

  async handleNarrativeSubmit(e: Event, projectId: string): Promise<void> {
    e.preventDefault();
    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);

    const req: NarrativeRequest = {
      projectId,
      audience: formData.get('audience') as any,
      objective: formData.get('objective') as any,
      duration: formData.get('duration') as any,
      language: formData.get('language') as any,
      depth: formData.get('depth') as any
    };

    try {
      const plan = await this.generateNarrativePlanUseCase.execute(req);
      const project = await this.getProjectUseCase.execute({ idOrSlug: projectId });

      const workspaceContainer = document.getElementById('projectWorkspaceMount');
      if (workspaceContainer) {
        workspaceContainer.innerHTML = renderNarrativePage(project, plan, req);
      }
    } catch (err) {
      logger.error('Failed to compile narrative plan:', err);
    }
  }

  selectSection(sectionId: string): void {
    if (!this.activeWorkspaceProject) return;
    this.activeSectionId = sectionId;
    const mount = document.getElementById('projectWorkspaceMount');
    if (mount) {
      this.validateProjectUseCase.execute(this.activeWorkspaceProject.getId()).then(validation => {
        mount.innerHTML = renderWorkspacePage(this.activeWorkspaceProject, validation, sectionId);
      });
    }
  }

  closeWorkspace(): void {
    const mount = document.getElementById('projectWorkspaceMount');
    if (mount) mount.style.display = 'none';

    const mainHub = document.getElementById('deck-hub');
    if (mainHub) mainHub.style.display = '';

    this.activeWorkspaceProject = null;
    this.activeSectionId = undefined;
    this.legacyAdapter.openHub();
  }

  private createWorkspaceMount(): HTMLElement {
    const mount = document.createElement('div');
    mount.id = 'projectWorkspaceMount';
    mount.style.cssText = 'position:fixed;inset:0;z-index:9999;display:none;background:#030712;overflow:auto;';
    document.body.appendChild(mount);
    return mount;
  }

  /** Speech HUD must work even if project loading is slow/fails. */
  private exposeSpeechBridge(): void {
    if (typeof window === 'undefined') return;
    const prev = (window as any).VentureHubBridge || {};
    (window as any).VentureHubBridge = {
      ...prev,
      toggleLiveSpeech: () => this.speechUIController.toggleLiveSpeech(),
      toggleSpeechLanguage: () => this.speechUIController.toggleSpeechLanguage(),
      toggleSubtitlesBar: (show?: boolean) => this.speechUIController.toggleSubtitlesVisibility(show),
      openTranscriptDrawer: () => this.speechUIController.openDrawer(),
      closeTranscriptDrawer: () => this.speechUIController.closeDrawer(),
      toggleTranscriptDrawer: () => this.speechUIController.toggleDrawer(),
      filterTranscript: (q: string) => this.speechUIController.filterTranscript(q),
      copyTranscriptToClipboard: () => this.speechUIController.copyToClipboard(),
      copySingleUtterance: (id: string) => this.speechUIController.copySingleUtterance(id),
      downloadTranscriptMarkdown: () => this.speechUIController.downloadMarkdown(),
      downloadTranscriptTxt: () => this.speechUIController.downloadTxt(),
      clearTranscriptSession: () => this.speechUIController.clearSession(),
      syncSpeechSlide: (idx: number) => this.speechUIController.setSlide(idx),
      pauseLiveSpeechForTts: () => this.speechUIController.pauseListeningForTts(),
      resumeLiveSpeechAfterTts: () => this.speechUIController.resumeListeningAfterTts()
    };
  }
}

// Auto-boot if in browser context
if (typeof window !== 'undefined') {
  const app = new VentureHubApp();
  app.initialize().catch(err => {
    logger.error('Failed to initialize Venture Hub OS:', err);
  });
}
