import { Prisma, PrismaClient } from 'db';
import { DbTransaction } from 'types';

export interface AddDiscountHistory {
  clientId: number;
  amount: number;
  remain: number;
  prisma: DbTransaction
  isReachedToMax: boolean;
  status?: string
  endDate?: Date | null
}
