export const PUBLISHER_ROLE = 'PUBLISHER';
export const READER_ROLE = 'READER';
export const ADMIN_ROLE = 'ADMIN';

export type RoleType = typeof ADMIN_ROLE | typeof READER_ROLE | typeof PUBLISHER_ROLE;

export const hasRole = (role: RoleType | null, roles: Array<RoleType>) => {
  return !!role && roles.includes(role);
};
