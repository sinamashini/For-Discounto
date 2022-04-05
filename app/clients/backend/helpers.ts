import { ContactObj, GetClientResult } from "../types";

export const mapStatusOfContact = (status: string): string => {
  const slugs = { all: 'all', 'no-parent': 'noParent', 'has-parent': 'hasParent' };
  if (slugs[status]) {
    return slugs[status];
  }
  return "";
}

export const createWhereQuery = (status: string) => {
  const statusKind = {
    all: {},
    noParent: { parent: null },
    hasParent: { NOT: [{ parent: null }] }
  };
  if (statusKind[status]) {
    return statusKind[status];
  }
  return {};
}

export const mapedToSelectedContent = (client: GetClientResult[0]): ContactObj => ({
  contact: client.contact,
  name: client.name,
  id: client.id,
  address: client?.address ?? '',
  nationalCode: client.nationalCode ?? '',
  notes: client?.notes ?? '',
  parentId: client.parentId ?? undefined,
  email: client?.email ?? '',
  packageId: client?.packageClients[0]?.packageId ?? undefined
})

