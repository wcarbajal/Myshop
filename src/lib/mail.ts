import { Resend } from 'resend';


const resend = new Resend(process.env.AUTH_RESEND_KEY);

export const sendEmailVerification = async(email: string, token: string) => {
 
  try {
    
    await resend.emails.send({
      from: 'Wuilmer Carbajal <onboarding@resend.dev>',
      to: email,
      subject: 'Verifica tu e-mail',
      html: `
      <h2>Activación de usuario en la plataforma </h2>
      
      <p>De click en el siguiente enlace par verificar tu email</p>
      <a href="${process.env.NEXTAUTH_URL}/api/auth/verify-email?token=${token}">Verificar email</a>

      `
    });
    return { success: true,
      resend
    }

  } catch (error: any) {
    return {
      error: true,
      message: error.message
    }
  }


}
