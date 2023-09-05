import { VercelRequest, VercelResponse } from "@vercel/node";
import { connect } from "@planetscale/database";
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = await connect(config);
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
