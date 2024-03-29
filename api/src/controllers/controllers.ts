/** source/controllers/shoes.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { MongoClient } from "mongodb";
import { Runner, ShoeRecord, User } from '../types';

// enum Condition {
//     LIKE_NEW = 'Like New',
//     GOOD = 'Good',
//     BAD = 'Bad',
//     BITCH_GET_OFF_THE_ROAD = 'BITCH GET OFF THE ROAD'
// }

// interface RunnerRecord {
//     userName: string;
//     shoeBrand: string;
//     mileage: number;
//     condition?: Condition;
//     shoeAge: number;
// }

// Connection URI
const uri =
  "mongodb://mongoadmin:secret@localhost:27017";

// Create a new MongoClient
const client = new MongoClient(uri);

// Get collection 
async function getCollection(collection: string) {
  await client.connect();
  const database = await client.db("running_shoe_tracker");
  return await database.collection(collection);
}

const getShoeCondition = (mileage: number) => {
  if(mileage <= 100){
    return 'new'
  }
  else if (mileage > 100 && mileage <= 300){
    return 'good'
  }
  else if(mileage > 300 && mileage <=500){
    return 'bad'
  }
  else if(mileage > 500){
    return 'bitch get off the road'
  }
}


// Get All Users
const getUsers = async (req: Request, res: Response) => {
  let users;
  try {
    const collection = await getCollection('users');
    users = await collection.find({}).toArray();
    console.log(users);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({
    result: users
  });
};

// Get User 
const getUser = async (req: Request, res: Response, next: NextFunction) => {
  let userRecord;
  try {
    const collection = await getCollection("users");
    userRecord = await collection.findOne({
      email: req.params.email
    });
    console.log(userRecord);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({
    userRecord
  });
};

const validateUser = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection("users");
    const userRecord = await collection.findOne({
      $and: [{ email: req.query.email }, { password: req.query.password }]
    }) as User;
    if (userRecord) {
      return res.status(200).json({
        userValidated: true
      });
    }
    return res.status(400).json({
      userValidated: false
    });
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      userValidated: false
    });
  }
};

//Validate New User
const validateNewUser = async (req: Request, res: Response) => {
  try {
    const collection = await getCollection("users");
    const userRecord = await collection.findOne({
       email: req.query.email
    })
    if (userRecord) {
      return res.status(400).json({
        userValidated: false
      });
      }
    return res.status(200).json({
      uservalidated: true
    })
  } catch (err) {
    console.log(err);

    return res.status(500).json({
      userValidated: false
    });
  }
};

// getting all shoes
const getShoes = async (req: Request, res: Response) => {
  let runnerRecords;
  try {
    const collection = await getCollection('shoe_records');
    runnerRecords = await collection.find({}).toArray();
    console.log(runnerRecords);
  } catch (err) {
    console.log(err);
  }
  return res.status(200).json({
    result: runnerRecords
  });
};

// getting a single shoe
const getRunner = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const collection = await getCollection("shoe_records");
    const runnerRecord = await collection.findOne({
      email: req.params.email
    }) as Runner;
    console.log(runnerRecord);
    if (runnerRecord) {
      return res.status(200).json(runnerRecord);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }
};

// add/insert a shoe record
const addShoeRecord = async (req: Request, res: Response, next: NextFunction) => {
  const runner = req.body as Runner
  try {
    const collection = await getCollection("shoe_records");
    const runnerRecord = await collection.insertOne(runner);
    console.log(runnerRecord);
    if (runnerRecord) {
      return res.status(200).json(runnerRecord);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }};

//add/insert a user
const addUser = async (req: Request, res: Response, next: NextFunction) => {
  const user = req.body as User
  // const shoe_record = req.body.email
  try {
    // const shoe_records_collection = await getCollection('shoe_records')
    const collection = await getCollection("users");
    let validateUser = await collection.findOne({ email: req.body.email });
    if(validateUser){
      return res.status(400).send('That user already exisits!');
    } else {
        const userRecord = await collection.insertOne(user);
        console.log(userRecord);
        // const newShoeRecord = await shoe_records_collection.insertOne(shoe_record) 
        if (userRecord) {
          return res.status(200).json(userRecord);
        }
        return res.status(400).json({});
      }}
      catch (err) {
        console.log(err);
        return res.status(500).json({err});
}};


// updating shoe-brand/mileage
async function updateShoe(req: Request, res: Response, next: NextFunction) {
  const data = req.body.shoe_record as ShoeRecord
  const filter = {"email": req.body.email, "shoe_records.id": data.id}
  const updateShoeRecord = {$set: {"shoe_records.$": data}}
  console.log(data)
  console.log(filter)
  try {
    const collection = await getCollection("shoe_records");
    const newShoeRecord = await collection.updateOne(filter, updateShoeRecord);
    console.log(newShoeRecord);
    if (newShoeRecord) {
      return res.status(200).json(newShoeRecord);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }}

  
async function addNewShoe(req: Request, res: Response, next: NextFunction) {
  const newShoe = req.body.shoe_record as ShoeRecord
  try {
    const collection = await getCollection("shoe_records");
    const updatedShoeRecord = await collection.updateOne({ email: req.body.email },
    { $push: { shoe_records: newShoe }});
    console.log(updatedShoeRecord);
    if (updatedShoeRecord) {
      return res.status(200).json(updatedShoeRecord);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }
}

async function updatePassword(req: Request, res: Response, next: NextFunction) {
  const data = req.body as User
  const filter = {"email": data.email}
  const newPassword = {$set: {"password": data.password}}
  console.log(data)
  console.log(req.body)
  try {
    const collection = await getCollection("users");
    const updatedPassword = await collection.updateOne(filter, newPassword);
    console.log(updatedPassword);
    if (updatedPassword) {
      return res.status(200).json(updatedPassword);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }}



// deleting a shoe
const deleteShoe = async (req: Request, res: Response, next: NextFunction) => {
  const shoe = req.body.shoe_record as ShoeRecord
  try {
    const collection = await getCollection("shoe_records");
    const shoeToRemove = await collection.updateOne({ email: req.body.email },
    { $pull: {shoe_records: shoe }});
    console.log(shoeToRemove);
    if (shoeToRemove) {
      return res.status(200).json(shoeToRemove);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }
}
const updateCondition = async (req: Request, res: Response, next: NextFunction) => {
  const newCondition = getShoeCondition(req.body.total_miles)
  const filter = {"shoe_records.id": req.body.id}
  const updateShoeRecord = {$set: {"shoe_records.$.condition": newCondition}}
  console.log(newCondition)
  console.log(filter)
  console.log(updateShoeRecord)
  try {
    const collection = await getCollection("shoe_records")
    const mileage = await collection.updateOne(filter, updateShoeRecord);
    console.log(mileage);
    if (mileage) {
      return res.status(200).json(mileage);
    }
    return res.status(400).json({});
  }
    catch (err) {
      console.log(err);
      return res.status(500).json({err});
  }
} 


//updating mileage
const updateMileage = async (req: Request, res: Response, next: NextFunction) => {
  // const mileage = req.body.mileage
  // const shoeRecord = req.body.shoe_records as ShoeRecord
  
  try {
    const collection = await getCollection("shoe_records");
    const newMileage = await collection.updateOne({ "shoe_records.id":req.body.id, "shoe_records.shoe_brand": req.body.shoe_brand },
      { $inc: { "shoe_records.$.mileage" : req.body.miles_added } });
    console.log(newMileage);
    if (newMileage) {
      getShoeCondition(req.body.total_miles)
      console.log(getShoeCondition(req.body.total_miles))
      return res.status(200).json(newMileage);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }
}

//updating shoe condition based on mileage 
const updateMileageCondtition = async (req: Request, res: Response, next: NextFunction) => {
  // const mileage = req.body.mileage
  // const shoeRecord = req.body.shoe_records as ShoeRecord
  const newCondition = getShoeCondition(req.body.total_miles)
  const filter = {"shoe_records.id": req.body.id}
  const updateShoeRecord = {$set: {"shoe_records.$.condition": newCondition}}
  
  try {
    const collection = await getCollection("shoe_records");
    const newMileage = await collection.updateOne({ "shoe_records.id":req.body.id, "shoe_records.shoe_brand": req.body.shoe_brand },
      { $inc: { "shoe_records.$.mileage" : req.body.miles_added } });
    const BrandNewCondition = await collection.updateOne(filter, updateShoeRecord);
    console.log(newMileage);
    if (newMileage) {
      getShoeCondition(req.body.total_miles)
      console.log(getShoeCondition(req.body.total_miles))
      return res.status(200).json(newMileage && BrandNewCondition);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }
}





export default { getShoes, getRunner, updateShoe, deleteShoe, addShoeRecord, getUser, getUsers, addUser, validateUser, addNewShoe, updatePassword, updateMileage, validateNewUser, updateCondition, updateMileageCondtition };