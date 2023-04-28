// pages/api/comment/[idMovie]/[idComment].js
import clientPromise from "../../../../lib/mongodb";
import { ObjectId } from "mongodb";

export default async function handler(req, res) {
  const idComment = req.query.idComment;
  const idMovie = req.query.idMovie;
  const client = await clientPromise;
  const db = client.db("sample_mflix");

  switch (req.method) {
    case "GET":
      const dbComment = await db.collection("comments").findOne({ movie_id: new ObjectId(idMovie), _id: new ObjectId(idComment) });
      res.json({ status: 200, data: { comment: dbComment } });
      break;

    case "PUT":
      const { name, email, text } = req.body;
      const resultUpdate = await db.collection("comments").findOneAndUpdate(
        {
          _id: new ObjectId(idComment),
          movie_id: new ObjectId(idMovie),
        },
        {
          $set: {
            name: "test PUT",
            email: "test@test.com",
            text: "test test test",
          },
        },
        {
          returnOriginal: false,
        }
      );
      res.json({ status: 200, data: resultUpdate.value });
      break;

    case "DELETE":
      const resultDeletion = await db.collection("comments").findOneAndDelete({ _id: new ObjectId(idComment), movie_id: new ObjectId(idMovie) });
      res.json({ status: 200, data: resultDeletion.value });
      break;

    default:
      res.setHeader("Allow", ["GET", "PUT", "DELETE"]);
      res.status(405).end(`Method ${req.method} Not Allowed`);
  }
}
