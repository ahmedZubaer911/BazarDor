import { betterAuth } from "better-auth";
import { mongodbAdapter } from "better-auth/adapters/mongodb";
import { MongoClient } from "mongodb";
import { setServers, getServers } from "node:dns";

setServers(["1.1.1.1", "8.8.8.8"]);
console.log("Auth DNS servers:", getServers());

const mongoUri = process.env.MONGODB_URI;

if (!mongoUri) {
  throw new Error("MONGODB_URI is missing from .env.local");
}

const client = new MongoClient(mongoUri, {
  serverSelectionTimeoutMS: 10000,
  connectTimeoutMS: 10000,
});
const db = client.db("bazardor");

export const auth = betterAuth({
  database: mongodbAdapter(db, { client }),

  emailAndPassword: {
    enabled: true,
    autoSignIn: false,
  },
});
