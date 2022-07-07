import { MongoClient } from "mongodb";
import { v4 as uuidv4} from "uuid";

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
        "password": "app",
        "first_name": "Allie",
        "last_name": "Barnett"
      },
      {
        "email": "nealajpatel@gmail.com",
        "username": "bigboi",
        "password": "bitch",
        "first_name": "Neal",
        "last_name": "Patel"
      },
      {
        "email": "annaharden@gmail.com",
        "username": "anna",
        "password": "harden",
        "first_name": "Anna",
        "last_name": "Harden"
      }
    ]
  )

  shoeRecordsCollection.insertMany(
      [
        {
          email: "allie.barnett44@gmail.com",
          shoe_records: [
            {
              id: uuidv4(),
              shoe_brand: "Brooks",
              mileage: 100,
              condition: "good"
            },
            {
              id: uuidv4(),
              shoe_brand: "Reebok",
              mileage: 100,
              condition: "good"
            },
            {
              id: uuidv4(),
              shoe_brand: "Nike",
              mileage: 100,
              condition: "good"
            }
          ]
        },
        {
          email: "nealajpatel@gmail.com",
          shoe_records: [
            {
              id: uuidv4(),
              shoe_brand: "Brooks",
              mileage: 100,
              condition: "good"
            },
            {
              id: uuidv4(),
              shoe_brand: "Reebok",
              mileage: 100,
              condition: "good"
            },
            {
              id: uuidv4(),
              shoe_brand: "Nike",
              mileage: 100,
              condition: "good"
            }
          ]
        },
        {
          email: "annaharden@gmail.com",
          shoe_records: [
            {
              id: uuidv4(),
              shoe_brand: "Brooks",
              mileage: 100,
              condition: "good"
            },
            {
              id: uuidv4(),
              shoe_brand: "Reebok",
              mileage: 100,
              condition: "good"
            },
            {
              id: uuidv4(),
              shoe_brand: "Nike",
              mileage: 100,
              condition: "good"
            }
          ]
        }
      ]
    )
  
})().catch((err => {
  console.error(err);
}));


