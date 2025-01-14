import { State } from '@prisma/client';

export interface User {
  id: string;
    name: string;
    email: string;
    telefono: string | null;
    emailVerified: Date | null;
    password: string;
    role: string;
    image: string | null;
    state: 'activo' | 'inactivo' | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}

