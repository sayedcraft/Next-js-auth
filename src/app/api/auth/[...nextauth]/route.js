import { dbConnect } from "@/lib/dbConnect";
import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import bcrypt from "bcryptjs";

const userList = [
  { name: "hablu", password: "1234" },
  { name: "bablu", password: "5678" },
  { name: "kablu", password: "9010" },
];

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    CredentialsProvider({
      // Sign in with ...
      name: "Credentials",

      credentials: {
        email: { label: "Email", type: "email", placeholder: "Enter Email" },
        password: {
          label: "Password",
          type: "password",
          placeholder: "Enter password",
        },
      },
      async authorize(credentials, req) {
        const { email, password } = credentials;

        //find user
        // const user = userList.find((u) => u.name == username);
        const user = await dbConnect("users").findOne({ email });
        //if not user => error
        if (!user) return null;

        //check password
        // const isPasswoerdOk = user.password == password;
        const isPasswoerdOk = await bcrypt.compare(password, user.password);
        if (isPasswoerdOk) {
          return user;
        }

        // My own login logic
        return null;
      },
    }),
  ],

  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      return true;
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async session({ session, token, user }) {
      if (token) {
        session.role = token.role;
      }
      return session;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (user) {
        token.email = user.email;
        token.role = user.role;
      }
      return token;
    },
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
