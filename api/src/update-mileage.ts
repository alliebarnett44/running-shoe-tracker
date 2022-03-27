import { MongoClient } from "mongodb";
import { ExitStatus } from "typescript";


(async () => {

  // Connection URI
  const uri = "mongodb://mongoadmin:secret@localhost:27017";

  // Create a new MongoClient
  const client = new MongoClient(uri);

  await client.connect();
  
  console.log('connecting to database...')
  const db = await client.db('running_shoe_tracker');
  console.log('getting database')
  db.collection('shoe_records').updateOne(
    { "email" : "annaharden@gmail.com"}, //Specifying the document to update
    { $set: {"shoe_records.2.mileage" : "500"}}
  )
  console.log('updating mileage')
})().catch((err => {
  console.error(err);
}));

