import type { NextAuthConfig } from "next-auth";

export const authConfig = {
    pages: {
        signIn: '/users/sign-in'
    },
    callbacks: {
        authorized({ auth, request: { nextUrl } }) {
            const isLoggedIn = !!auth?.user;
            const isRestricted = nextUrl.pathname.startsWith('/home');
            if(isRestricted) {
                if(isLoggedIn) return true;
                return false;
            } else if(isLoggedIn) {
                return Response.redirect(new URL('/home/cards', nextUrl));
            }
            return true;
        },
        async session({ session, token }) {
            session.user.id = token.sub || '';
            return session;
        }
    },
    providers: []
} satisfies NextAuthConfig;