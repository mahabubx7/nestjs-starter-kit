export const Roles = ['admin', 'editor', 'auditor', 'user'] as const;

export type RoleTypes = (typeof Roles)[number];
