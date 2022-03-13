/** source/controllers/shoes.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';
import { MongoClient } from "mongodb";

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
    } catch(err) {
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
    } catch(err) {
        console.log(err);
    }
    return res.status(200).json({
        userRecord
    });
};

const validateUser = async(req: Request, res: Response) => {
    let userRecord;
    try {
        const collection = await getCollection("users");
        userRecord = await collection.findOne({
            $and: [ {email: req.query.email}, {password: req.query.password}]
        });
        console.log(userRecord);
    } catch(err) {
        console.log(err);
    } if(userRecord === null){
        return res.status(400).json({
            userValidated: false
        });
    } else {
        return res.status(200).json({
            userValidated: true
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
    } catch(err) {
        console.log(err);
    }
    return res.status(200).json({
        result: runnerRecords
    });
};

// getting a single shoe
const getShoe = async (req: Request, res: Response, next: NextFunction) => {
    let runnerRecord;
    try {
        const collection = await getCollection("shoe_records");
        runnerRecord = await collection.findOne({
            email: req.params.email
        });
        console.log(runnerRecord);
    } catch(err) {
        console.log(err);
    }
    return res.status(200).json({
        runnerRecord
    });
};

// updating a shoe
const updateShoe = async (req: Request, res: Response, next: NextFunction) => {
    // get the shoe id from the req.params
    let id: string = req.params.id;
    // get the data from req.body
    let title: string = req.body.title ?? null;
    let body: string = req.body.body ?? null;
    // update the shoe
    let response: AxiosResponse = await axios.put(`https://jsonplaceholder.typicode.com/shoes/${id}`, {
        ...(title && { title }),
        ...(body && { body })
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};

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

// adding a shoe
const addShoe = async (req: Request, res: Response, next: NextFunction) => {
    // get the data from req.body
    let title: string = req.body.title;
    let body: string = req.body.body;
    // add the shoe
    let response: AxiosResponse = await axios.post(`https://jsonplaceholder.typicode.com/shoes`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
};


export default { getShoes, getShoe, updateShoe, deleteShoe, addShoe, getUser, getUsers, validateUser};


