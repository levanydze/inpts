import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
    }),
  ],
};
export default NextAuth(authOptions);

//  on this link (api services credentials) i need to switch localhost:300 in to domain
//  https://console.cloud.google.com/apis/credentials/oauthclient/646452106465-hg7udo4mmbdigosmq3u7mug3707v1ch5.apps.googleusercontent.com?authuser=0&hl=en&project=authtest-e85f5

// https://inpts.vercel.app/api/auth/callback/google
// https://inpts.vercel.app
