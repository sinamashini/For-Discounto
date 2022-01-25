export const mapStatusOfContact = (status: string) => {
  const slugs = { all: 'all', 'no-parent': 'noParent', 'has-parent': 'hasParent' };
  return slugs[status];
}
