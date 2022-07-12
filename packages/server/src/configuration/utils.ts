export const PUBLISHER_ROLE = 'PUBLISHER_ROLE';
export const READER_ROLE = 'READER_ROLE';
export const ADMIN_ROLE = 'ADMIN_ROLE';

type Role = typeof ADMIN_ROLE | typeof READER_ROLE | typeof PUBLISHER_ROLE;

export const hasRole = (role: Role | null, roles: Array<Role>) => {
  return !!role && roles.includes(role);
};
