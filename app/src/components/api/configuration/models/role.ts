
export type Role = {
    role_id: number;
    Permissions: string[];
    role_type: string;
}

export enum RoleEnum {
    Admin = "Admin",
    General = "General",
    Psychologist = "Psychologist"
}
