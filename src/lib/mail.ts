import { Resend } from 'resend';


const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async(email: string, token: string) => {
 
  try {
    
    await resend.emails.send({
      from: 'NextAuth js <onboarding@resend.dev>',
      to: email,
      subject: 'Verifica tu e-mail',
      html: `
      <p>De click en el siguiente enlace par verificar tu email</p>
      <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verificar email</a>

      `
    });
    return { success: true}

  } catch (error: any) {
    return {
      error: true,
      message: error.message
    }
  }


}
