import { VercelRequest, VercelResponse } from "@vercel/node";
import { connect } from "@planetscale/database";
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(config);
export default async function all(req: VercelRequest, res: VercelResponse) {
  const { first_name, last_name, phone_number } = req.body;
  if (req.method === "POST") {
    const query =
      "INSERT INTO contacts (first_name, last_name, phone_number) VALUES(?,?,?)";
    try {
      const result = await conn.execute(query, [
        first_name,
        last_name,
        phone_number,
      ]);

      if (result.rowsAffected === 0) {
        res.status(409).json({ error: "could not create entry" });
        return;
      }
      res.status(200).json({"message":"created successfully", "statement": result.statement});
      return
    } catch (error: any) {
      res.status(500).json({ error: error.message });
      return
    }
  } else {
    res.status(405).json({ error: "method not allowed" });
    return
  }
}
