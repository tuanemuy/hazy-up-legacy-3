import { withAuth } from "next-auth/middleware";

export const config = { matcher: ["/user"] };

export default withAuth({
  pages: {
    signIn: "/auth/signin",
    signOut: "/auth/signout",
    error: "/auth/error",
    verifyRequest: "/auth/verify-request",
  },
});
