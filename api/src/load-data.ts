import { MongoClient } from "mongodb";
import { ExitStatus } from "typescript";

(async () => {

  // Connection URI
  const uri = "mongodb://mongoadmin:secret@localhost:27017";

  // Create a new MongoClient
  const client = new MongoClient(uri);

  await client.connect();

  console.log('createing database...');
  const db = await client.db('running_shoe_tracker');
  console.log('createing users collection...');
  const usersCollection = await db.createCollection('users');
  console.log('createing shoe_records collection...');
  const shoeRecordsCollection = await db.createCollection('shoe_records');
 

  usersCollection.insertMany(
    [
      {
        "email": "allie.barnett44@gmail.com",
        "username": "ambarn",
        "password": "app"
      },
      {
        "email": "nealajpatel@gmail.com",
        "username": "bigboi",
        "password": "bitch" 
      },
      {
        "email": "annaharden@gmail.com",
        "username": "anna",
        "password": "harden"
      }
    ]
  )

  shoeRecordsCollection.insertMany(
      [
        {
          "email": "allie.barnett44@gmail.com",
          "shoe_brand": "Brooks",
          "mileage": "100",
          "condition": "good",
        },
        {
          "email": "nealajpatel@gmail.com",
          "shoe_brand": "Asics",
          "mileage": "500",
          "condition": "UGLY",
        },
        {
          "email": "annaharden@gmail.com",
          "shoe_brand": "Nike",
          "mileage": "200",
          "condition": "bad",
        }
      ]
    )
  
})().catch((err => {
  console.error(err);
}));


