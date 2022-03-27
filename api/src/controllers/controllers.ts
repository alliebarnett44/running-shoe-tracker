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
      email: req.query.email
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
  }}

  //add/insert a user
  const addUser = async (req: Request, res: Response, next: NextFunction) => {
    const user = req.body as User
    try {
      const collection = await getCollection("users");
      const userRecord = await collection.insertOne(user);
      console.log(userRecord);
      if (userRecord) {
        return res.status(200).json(userRecord);
      }
      return res.status(400).json({});
    } catch (err) {
      console.log(err);
      return res.status(500).json({err});
    }}

  // // get the data from req.body
  // let title: string = req.body.title;
  // let body: string = req.body.body;
  // // add the shoe
  // let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/shoes`, {
  //   title,
  //   body
  // });
  // // return response
  // return res.status(200).json({
  //   message: response.data
  // });
// };


// updating mileage
async function updateShoe(req: Request, res: Response, next: NextFunction) {
  const data = req.body as ShoeRecord
  const filter = {"email": req.body.email}
  const updateShoeRecord = {$set: {"shoe_records": data}}
  try {
    const collection = await getCollection("shoe_records");
    const updatedShoeRecord = await collection.updateOne(filter, updateShoeRecord);
    console.log(updatedShoeRecord);
    if (updatedShoeRecord) {
      return res.status(200).json(updatedShoeRecord);
    }
    return res.status(400).json({});
  } catch (err) {
    console.log(err);
    return res.status(500).json({err});
  }}

  
  async function addNewShoe(req: Request, res: Response, next: NextFunction) {

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
    

  
  // // get the shoe id from the req.params
  // let id: string = req.params.id;
  // // get the data from req.body
  // let title: string = req.body.title ?? null;
  // let body: string = req.body.body ?? null;
  // // update the shoe
  // let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/shoes/${id}`, {
  //   ...(title && { title }),
  //   ...(body && { body })
  // });
  // // return response
  // return res.status(200).json({
  //   message: response.data
  // });
// }

// deleting a shoe
const deleteShoe = async (req: Request, res: Response, next: NextFunction) => {
  // get the shoe id from req.params
  let id: string = req.params.id;
  // delete the shoe
  let response: AxiosResponse = await axios.delete(`https://jsonplaceholder.typicode.com/shoes/${id}`);
  // return response
  return res.status(200).json({
    message: 'shoe deleted successfully'
  });
};


export default { getShoes, getRunner, updateShoe, deleteShoe, addShoeRecord, getUser, getUsers, addUser, validateUser, addNewShoe, updatePassword };