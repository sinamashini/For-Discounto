import { Clients, DiscountClient, Discounts } from "@prisma/client"
import getClients from "./backend/queries/getClients";

export interface ContactObj  {
  id?: number;
  name: string;
  nationalCode: string;
  email?: string;
  contact: string;
  notes?: string;
  parentId?: number | null;
  address?: string;
}

export interface InputForDiscount {
  discountPercent: number;
  numberOfIncludedPeople: number;
  levelOfSearch: number;
}

export interface LabelObj {
  id: number;
  name: string;
  alias: string;
  color: string;
}

export type UpdateContactCache = Clients & {
  parent: Clients | null;
  introduced: Clients[];
};

export type GetClientResult = Awaited<Promise<ReturnType<typeof getClients>>>
