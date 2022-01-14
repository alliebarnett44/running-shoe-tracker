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

async function getCollection(collection: string) {
    await client.connect();
    const database = await client.db("running_shoe_tracker");
    return await database.collection(collection);
    }

const validateUser = async  (req: Request, res: Response) => {
    let userRecord;
    try {
        const collection = await getCollection('users');
        userRecord = await collection.findOne({
            email: req.query.email
        })
        console.log(req)
    }
    catch(err) {
        console.log(err);
    }
    return res.status(200).json({
        result: userRecord
    });
        
}

const getUser = async  (req: Request, res: Response) => {
    let userRecord;
    try {
        const collection = await getCollection('users');
        userRecord = await collection.findOne({
            email: req.query.email
        })
        console.log(req)
    }
    catch(err) {
        console.log(err);
    }
    return res.status(200).json({
        result: userRecord
    });
        
}
 
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
        await client.connect();
        const database = await client.db("running_shoe_tracker");
        const runnerRecordCollection = await database.collection("shoe_records");
        runnerRecord = await runnerRecordCollection.findOne({
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

export default { getShoes, getShoe, updateShoe, deleteShoe, addShoe, getUser, validateUser };

// const getShoesResult: runnerRecord[] = [
//     {
//         userName: 'Allie',
//         shoeBrand: 'Brooks',
//         mileage: 500,
//         condition: Condition.BITCH_GET_OFF_THE_ROAD,
//         shoeAge: 10
//     },
//     {
//         userName: 'Neal',
//         shoeBrand: 'Altra',
//         mileage: 2,
//         condition: Condition.LIKE_NEW,
//         shoeAge: 1
//     },
//     {
//         userName: 'Cluadig',
//         shoeBrand: 'Brooks',
//         mileage: 100,
//         condition: Condition.GOOD,
//         shoeAge: 3
//     },
//     {
//         userName: 'Bob',
//         shoeBrand: 'Paws',
//         mileage: 350,
//         condition: Condition.BAD,
//         shoeAge: 5
//     },
// ]
