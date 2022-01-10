import { connectDataBase, insertDocument } from "../../helpers/db-util";
async function handler(req, res) {
  if (req.method === "POST") {
    const userEmail = req.body.email;
    console.log(userEmail);

    if (!userEmail || !userEmail.includes("@")) {
      res.status(422).json({ message: "Invalid userEmail" });
      return;
    }
    let client;
    try {
      client = connectDataBase();
    } catch (error) {
      res.status(500).json({ message: "Connecting failed" });
      return;
    }
    try {
      await insertDocument(client, "emails", { email: userEmail });
    } catch (error) {
      res.status(500).json({ message: "Inserting data failed" });
      return;
    }

    res.status(201).json({ message: "Success" });
  }
}

export default handler;
