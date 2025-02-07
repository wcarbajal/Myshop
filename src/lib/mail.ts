import { Resend } from 'resend';


const resend = new Resend("re_UNY4Xho5_89GxLzCQaD5s9sfrRsiQnMzQ");

export const sendEmailVerification = async(email: string, token: string) => {
 
  try {
    
    await resend.emails.send({
      from: 'Wuilmer Carbajal <onboarding@resend.dev>',
      to: email,
      subject: 'Verifica tu e-mail',
      html: `
      <h2>Activación de usuario en la plataforma </h2>
      
      <p>De click en el siguiente enlace par verificar tu email</p>
      <a href="http://localhost:3000/api/auth/verify-email?token=${token}">Verificar email</a>

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
