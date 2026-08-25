import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

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
        username: { label: "Username", type: "text", placeholder: "jsmith" },
        password: { label: "Password", type: "password" },
        secrateCode: {
          label: "Secrate code",
          type: "number",
          placeholder: "Enter code",
        },
      },
      async authorize(credentials, req) {
        const { username, password, secrateCode } = credentials;

        //find user
        const user = userList.find((u) => u.name == username);
        //if not user => error
        if (!user) return null;

        //check password
        const isPasswoerdOk = user.password == password;
        if (isPasswoerdOk) {
          return user;
        }

        // My own login logic
        return null;
      },
    }),
  ],
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
