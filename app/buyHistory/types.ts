import { DiscountHistoryStatus } from 'db'
import { DbTransaction } from 'types';

export interface AddDiscountHistory {
  clientId: number;
  amount: number;
  remain: number;
  prisma: DbTransaction
  status?: DiscountHistoryStatus
  endDate?: Date | null
}
