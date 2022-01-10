import {
  connectDataBase,
  getAllDocuments,
  insertDocument,
} from "../../../helpers/db-util";

async function handler(req, res) {
  const id = req.query.id;
  let client;
  try {
    client = await connectDataBase();
  } catch (error) {
    res.status(500).json({ message: "Connection failed" });
    return;
  }

  if (req.method === "POST") {
    const { email, name, text } = req.body;
    if (
      !email.includes("@") ||
      !name ||
      name.trim() === "" ||
      text.trim() === "" ||
      !text
    ) {
      res.status(422).json({ message: "Input error" });
      ;
      return;
    }
    let result;
    const newComment = {
      email,
      text,
      name,
      id,
    };
    try {
      result = insertDocument(client, "comments", newComment);
      newComment._id = result.insertedId;
      res.status(201).json({ message: "Added comment", comment: newComment });
    } catch (error) {
      res.status(500).json({ message: "insert failed" });
    }
  }

  if (req.method === "GET") {
    try {
      const documents = await getAllDocuments(client, "comments", { _id: -1 });
      res.status(200).json({ comments: documents });
    } catch (error) {
      res.status(500).json({ message: "Getting comments failed!" });
      return;
    }
    ;
  }
}

export default handler;
