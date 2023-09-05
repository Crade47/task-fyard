import { VercelRequest, VercelResponse } from "@vercel/node";
import { connect } from "@planetscale/database";

type ContactType = {
  id: number,
  first_name:string,
  last_name:string,
  phone_number:string
}

const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = await connect(config);
export default async function create(req: VercelRequest, res: VercelResponse) {
  //Destructuring body for all the contact fields, id is automatically generated in the db
  const { first_name, last_name, phone_number }: Partial<ContactType> = req.body;
  if (req.method === "POST") {
    //SQL Query which we later bind the values to in conn.execute(..)
    const query =
      "INSERT INTO contacts (first_name, last_name, phone_number) VALUES(?,?,?)";
    try {

    //Second argument is binding all the values to prevent SQL injections
      const result = await conn.execute(query, [
        first_name,
        last_name,
        phone_number,
      ]);

      if (result.rowsAffected === 0) {
        res.status(409).json({ error: "could not create entry" });
        return;
      }
      res.status(200).json({"message":"created successfully"});
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
