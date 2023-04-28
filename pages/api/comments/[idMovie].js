// pages/api/comment/[id].js
import clientPromise from "../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const idMovie = req.query.idMovie;
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const dbComment = await db.collection("comments").find({ movie_id: new ObjectId(idMovie) }).toArray();
      res.json({ status: 200, data: { comment: dbComment } });
      break;

    case "POST":
      const { name, email, text } = req.body;
      const newComment = {
        "name": "Louis Allier",
        "email": "louisallier@gmail.com",
        movie_id: new ObjectId(idMovie),
        "text": "Id error ab at molestias dolorum incidunt. Non deserunt praesentium dolorem nihil. Optio tempora vel ut quas.\nMinus dicta numquam quasi. Rem totam cumque at eum. Ullam hic ut ea magni.",
        date: new Date(),
      };
      const resultInsertion = await db.collection("comments").insertOne(newComment);
      res.json({ status: 200, data: resultInsertion.ops });
      break;

    default:
      res.setHeader("Allow", ["GET", "POST"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
