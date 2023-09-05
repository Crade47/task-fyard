import { VercelRequest, VercelResponse } from "@vercel/node";
import { connect } from "@planetscale/database";
const config = {
  host: process.env.DATABASE_HOST,
  username: process.env.DATABASE_USERNAME,
  password: process.env.DATABASE_PASSWORD,
};

const conn = connect(config);
export default async function update(req: VercelRequest, res: VercelResponse) {
  const { id, first_name, last_name, phone_number } = req.body;
  if(!id){
    res.status(400).json({"error":"bad request, missing id"})
    return
  }
  //Checking if the http method is PATCH or not
  if (req.method === "PATCH") {
    // Dynamically setting the query
    let query ="UPDATE contacts SET ";
    const values = [];
    const fields = { first_name, last_name, phone_number }

    // Looping through all the fields 
    for(const [key, value] of Object.entries(fields)){
        if(value){
            query += `${key} = ?, `
            values.push(value)
        }
    } 
    //Removing the last comma and space 
    query = query.slice(0,-2);
    //Adding ID 
    query += " WHERE id = ?";
    values.push(id)

    try {
      const result = await conn.execute(query, values);

      if (result.rowsAffected === 0) {
        res.status(409).json({ error: "could not update entry" });
        return;
      }
      res.status(200).json({"message":"updated successfully"});
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