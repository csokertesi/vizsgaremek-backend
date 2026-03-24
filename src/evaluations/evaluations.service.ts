import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';

@Injectable()
export class EvaluationsService {
  constructor(private prisma: PrismaService) {}

  findBySite(siteId: number) {
    return this.prisma.siteEvaluation.findMany({
      where: { site_id: siteId },
      orderBy: { generated_at: 'desc' },
    });
  }

  create(siteId: number, evaluationText: string, generatedBy?: number) {
    return this.prisma.siteEvaluation.create({
      data: {
        site_id: siteId,
        evaluation_text: evaluationText,
        generated_by: generatedBy || null,
      },
    });
  }
}
