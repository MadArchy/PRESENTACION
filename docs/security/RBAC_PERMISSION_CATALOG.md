# RBAC Permission Catalog v1.0

**Specification:** `SPEC-008 — Security, Authentication, RBAC & Audit`  
**Version:** `1.0`  
**Total Permissions:** `30`  

---

| Permission Family | Permission Key | Description |
| :--- | :--- | :--- |
| **Organization** | `organization.read` | Read organization profile and public metadata |
| | `organization.manage` | Modify organization name, slug, and lifecycle |
| **Members** | `members.read` | View organization membership directory |
| | `members.invite` | Invite new members to organization |
| | `members.manage_roles` | Change roles of existing members |
| | `members.suspend` | Suspend or revoke memberships |
| **Projects** | `projects.read` | View project metadata |
| | `projects.create` | Create new projects under organization |
| | `projects.manage_access` | Grant or revoke project access assignments |
| | `projects.manage_settings` | Configure project metadata and policies |
| **Project Twin** | `project_twin.read` | Read canonical project twin facts and sections |
| | `project_twin.edit` | Update canonical project twin content |
| **Claims** | `claims.read` | Read governance claims catalog |
| | `claims.edit` | Create and edit claims |
| | `claims.review` | Review claim verification and support status |
| **Evidence** | `evidence.read` | Read evidence items and links |
| | `evidence.manage` | Create, link, and retire evidence |
| **Narrative** | `narrative.read` | View compiled narrative plans |
| | `narrative.generate` | Trigger narrative compiler execution |
| **Presentation** | `presentation.read` | View executive presentation decks |
| | `presentation.generate` | Generate presentation definitions |
| **Presenter** | `presenter.use` | Launch and control Executive Presenter Cockpit |
| **Copilot** | `copilot.use` | Execute AI Copilot tasks |
| | `copilot.configure_provider` | Configure LLM providers and session keys |
| **Data Room** | `data_room.read` | Read data room overview and public artifacts |
| | `data_room.read_confidential` | View CONFIDENTIAL diligence documents |
| | `data_room.read_highly_confidential` | View HIGHLY_CONFIDENTIAL diligence documents |
| | `data_room.manage_metadata` | Manage document metadata and statuses |
| | `data_room.manage_requests` | Manage diligence requests and checklist |
| **Security & Audit** | `security.read` | View security dashboard and access maps |
| | `security.manage` | Perform privileged security operations |
| | `audit.read` | Query append-only security audit events |
