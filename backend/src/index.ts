import express from "express";
import { Db, MongoClient, ObjectId } from "mongodb";
import bodyParser from "body-parser";
import cors from "cors";
require("dotenv").config(".env");

const app = express();
const port = 8080;
let db: Db;

app.use(express.json());
app.use(
  cors({
    origin: "http://localhost:3000",
  })
);
app.use(bodyParser.urlencoded({extended: false}));

app.get("/pictures", async (req, res) => {
    const collection = db.collection("pictures");
    const result = await collection.find({}).toArray()
    return res.json(result);
});

app.post("/pictures", async (req, res) => {
  const pictureBodyData = req.body;
  console.log(pictureBodyData);
  const collection = db.collection("pictures");
  const newPicture = {image_address: pictureBodyData.image_address, alt_text: pictureBodyData.alt_text};
  try {
      await collection.insertOne(newPicture);
      return res.json(newPicture);
  } catch (e) {
      return res.status(500).send();
  }
});

function start() {
  const client = new MongoClient(process.env.ATLAS_URI);
  client
    .connect()
    .then(() => {
      console.log("Connected successfully to server");
      db = client.db("database");
      app.listen(port, () => {
        console.log(`server started at http://localhost:${port}`);
      });
    })
    .catch((err) => {
      console.log("error connecting to mongoDB!", err);
    });
}

start();
