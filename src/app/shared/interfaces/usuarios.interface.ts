/* eslint-disable @typescript-eslint/naming-convention */
export let Role: {
    USER: 'USER';
    ADMIN: 'ADMIN';
    DOCTOR: 'DOCTOR';
};

export type Role = typeof Role[keyof typeof Role];

export interface User {
    id: string;
    personId: string;
    email: string;
    passwordHash: string;
    createdAt: Date;
    createdBy: string | null;
    updatedAt: Date;
    updatedBy: string | null;
    status: boolean;
    role: Role;
}

export interface Person {
    id: string;
    documentTypeId: number;
    documentNumber: string;
    fullName: string;
    birthDate: Date | null;
    cellphone: string | null;
    createdAt: Date;
    updatedAt: Date | null;
}
