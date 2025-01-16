import { object, string } from "zod"
 
export const loginSchema = object({
  email: string({ required_error: "Email es requerido" })
    .min(1, "Email es requerido")
    .email("Email invalido"),
  password: string({ required_error: "Password es requerido" })
    .min(1, "Password es requerido")
    .min(6, "Password debe tener 8 characters como mínimo")
    .max(32, "Password debe tener 32 characters como máximo"),
})

 
export const RegisterSchema = object({
  email: string({ required_error: "Email es requerido" })
    .min(1, "Email es requerido")
    .email("Email invalido"),
  password: string({ required_error: "Password es requerido" })
    .min(1, "Password es requerido")
    .min(6, "Password debe tener 8 characters como mínimo")
    .max(32, "Password debe tener 32 characters como máximo"),
    name: string({ required_error: "Nombre es requerido" })
    .min(3, "Nombre debe tener al menos 3 caracteres")
    .max(30, "Nombre no debe tener más de 30 caracteres"),
})