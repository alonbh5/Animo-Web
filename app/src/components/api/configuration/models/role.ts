export type Role = {
    role_id?: number;
    Permissions?: string[];
    role_type?: string;
}

export const RoleEnum = {
  Admin: 'Admin',
  Psychologist: 'Psychologist',
  General: 'General'
};
