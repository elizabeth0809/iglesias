import NextAuth, { type NextAuthConfig } from "next-auth";
import Credentials from "next-auth/providers/credentials";
import { z } from "zod";
import { LoginAction } from "./insfractucture/actions";
export const authConfig: NextAuthConfig = {
  pages: {
    signIn: "/login",
  },
  providers: [
    Credentials({
      async authorize(credentials) {
        // Validación de credenciales con Zod
        const parsedCredentials = z
          .object({ 
            email: z.string().email(),
            password: z.string().min(6)
          })
          .safeParse(credentials);

        if (!parsedCredentials.success) return null;

        const { email, password } = parsedCredentials.data;

        try {
          // Llamar a tu acción de login
          const response = await LoginAction(email, password);
          console.log({response})
          // Si hay error de validación
          if ('data' in response && 'message' in response) {
            console.error('Errores de validación:', response.data);
            return null;
          }

          // Si es exitoso
          if ('access_token' in response) {
            return {
              id: response.data.id.toString(),
              email: response.data.email,
              name: response.data.username,
              role: response.data.role,
              accessToken: response.access_token
            };
          }

          return response;

        } catch (error) {
          console.error('Error en autenticación:', error);
          return null;
        }
      },
    }),
  ],

};

export const { signIn, signOut, auth } = NextAuth(authConfig);