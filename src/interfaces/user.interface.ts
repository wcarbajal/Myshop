import { Role, State } from '@prisma/client';

export interface User {
  id: string;
    name: string;
    email: string;
    telefono: string | null;
    emailVerified: Date | null;
    password: string | null;
    role: Role;
    image: string | null;
    state: State | null;
    createdAt: Date | null;
    updatedAt: Date | null;
}



