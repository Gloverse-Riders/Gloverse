import {User} from "@/app/models/User";
import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";

import CredentialsProvider from "next-auth/providers/credentials";
import * as mongoose from "mongoose";
import bcrypt from "bcrypt";
import {MongoDBAdapter} from "@auth/mongodb-adapter";
import clientPromise from "@/libs/mongoConnect";

export const authOptions = {
    //secret:process.env.SECRET,
    adapter: MongoDBAdapter(clientPromise),
    providers: [
        GoogleProvider({
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
        }),
        CredentialsProvider({
            name:"credentials",

            credentials: {
                username: { label: "Username", type: "email", placeholder: "test@example.com" },
                password: { label: "Password", type: "password" }
            },
            async authorize(credentials, req) {
                const email = credentials?.email;
                const password = credentials?.password;

                mongoose.connect(process.env.MONGO_URL);
                const user = await User.findOne({email});
                const passwordOk = user && bcrypt.compareSync(password, user.password);

                if(passwordOk){
                    //document.write("aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa")
                    return user;
                }

                return null;

            }
        })
    ],
    session: {
        strategy:"jwt",
    },
    secret: process.env.SECRET,
    pages: {
        signIn: "/login",
    },
};

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST }