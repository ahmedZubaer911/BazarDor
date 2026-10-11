
import dns from "node:dns";

dns.setServers(["1.1.1.1", "8.8.8.8"]);

async function main() {
  try {
    const host = "ac-mfvp9n0-shard-00-00.kumrdbo.mongodb.net";
    const addresses = await dns.promises.resolve4(host);
    console.log("Resolved host:", addresses);

    // Import the driver after setting DNS servers.
    const { MongoClient } = await import("mongodb");

    const uri = process.env.MONGODB_URI;
    if (!uri) throw new Error("MONGODB_URI is missing");

    const client = new MongoClient(uri, {
      serverSelectionTimeoutMS: 10000,
      connectTimeoutMS: 10000,
    });

    try {
      await client.connect();
      await client.db("bazardor").command({ ping: 1 });
      console.log("MongoDB connection and ping successful!");
    } finally {
      await client.close();
    }
  } catch (error) {
    console.error("Diagnostic failed:", error);
  }
}

main();
