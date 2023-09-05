import { VercelRequest, VercelResponse } from "@vercel/node";
import { connect } from "@planetscale/database";
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

type ContactType = {
  id: number,
  first_name:string,
  last_name:string,
  phone_number:string
}

const conn = connect(config);
export default async function getContact(
  req: VercelRequest,
  res: VercelResponse
) {
  const { id }:Partial<ContactType> = req.query;
  if (req.method === "GET") {
    const query = `SELECT * FROM contacts WHERE id= ?`;
    try {
      const result = await conn.execute(query, [id]);
      if (result.rows.length === 0) {
        res.status(404).json({ error: "contact not found" });
        return;
      }
      res.status(200).json(result.rows);
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return
  }
  if (req.method === "DELETE") {
    const query = `DELETE FROM contacts WHERE id=?`;
    try {
      const result = await conn.execute(query, [id]);
      if (result.rowsAffected === 0) {
        res.status(404).json({ error: "contact not found" });
      } else {
        res
          .status(200)
          .json({ message: `successfully deleted row with id ${id}` });
      }
    } catch (error: any) {
      res.status(500).json({ error: error.message });
    }
    return
  } 
  res.status(405).json({ error: "method not allowed" });
}
