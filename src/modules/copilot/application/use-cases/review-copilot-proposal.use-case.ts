import { CopilotProposalEntity } from '../../domain/entities/copilot-proposal.entity';

export interface ReviewProposalRequest {
  proposal: CopilotProposalEntity;
  action: 'APPROVE' | 'REJECT' | 'EDIT';
  editedValue?: unknown;
  reviewerName?: string;
}

export class ReviewCopilotProposalUseCase {
  execute(req: ReviewProposalRequest): CopilotProposalEntity {
    const by = req.reviewerName || 'HUMAN_REVIEWER';

    if (req.action === 'APPROVE') {
      req.proposal.approve(by);
    } else if (req.action === 'REJECT') {
      req.proposal.reject(by);
    } else if (req.action === 'EDIT') {
      req.proposal.edit(req.editedValue, by);
    }

    return req.proposal;
  }
}
