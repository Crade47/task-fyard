import { VercelRequest, VercelResponse } from "@vercel/node";
import { connect } from "@planetscale/database";

//CONFIG OBJECT FOR CONNECTING TO DB
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

//Initializing a connection to planetscale db
const conn = await connect(config);

//Function to get all contacts
export default async function all(req: VercelRequest, res: VercelResponse) {
  if (req.method === "GET") {
    const query = "SELECT * FROM contacts";
    try {
      const result = await conn.execute(query);
      res.status(200).json(result.rows);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
  } else {
    res.status(405).json({ error: "method not allowed" });
  }
}
