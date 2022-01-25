import { Clients } from "@prisma/client"

export interface ContactObj {
  id?: number;
  name: string;
  nationalCode: string;
  email: string;
  contact: string;
  notes?: string;
  parentId?: number | null;
  address?: string;
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
