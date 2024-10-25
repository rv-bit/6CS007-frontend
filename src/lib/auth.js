import { createAuthClient } from "better-auth/client"
export const { authClient, signIn, signUp, signOut, useSession } = createAuthClient({
    baseURL: import.meta.env.NODE_ENV === 'production' ? import.meta.env.BASE_URL : 'http://localhost:5001/api/auth',
})