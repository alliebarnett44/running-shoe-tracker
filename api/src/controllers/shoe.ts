/** source/controllers/shoes.ts */
import { Request, Response, NextFunction } from 'express';
import axios, { AxiosResponse } from 'axios';

enum Condition {
    LIKE_NEW = 'Like New',
    GOOD = 'Good',
    BAD = 'Bad',
    BITCH_GET_OFF_THE_ROAD = 'BITCH GET OFF THE ROAD'
}

interface ShoeRecord {
    userName: string;
    shoeBrand: string;
    mileage: number;
    condition?: Condition;
    shoeAge: number;
}

const getShoesResult: ShoeRecord[] = [
    {
        userName: 'Allie',
        shoeBrand: 'Brooks',
        mileage: 500,
        condition: Condition.BITCH_GET_OFF_THE_ROAD,
        shoeAge: 10
    },
    {
        userName: 'Neal',
        shoeBrand: 'Altra',
        mileage: 2,
        condition: Condition.LIKE_NEW,
        shoeAge: 1
    },
    {
        userName: 'Cluadig',
        shoeBrand: 'Brooks',
        mileage: 100,
        condition: Condition.GOOD,
        shoeAge: 3
    },
    {
        userName: 'Bob',
        shoeBrand: 'Paws',
        mileage: 350,
        condition: Condition.BAD,
        shoeAge: 5
    },
]

// getting all shoes
const getShoes = async (req: Request, res: Response) => {
    return res.status(200).json({
        result: getShoesResult
    });
};

// getting a single shoe
const getShoe = async (req: Request, res: Response, next: NextFunction) => {
    // get the shoe id from the req
    let id: string = req.params.id;
    // get the shoe
    let result: AxiosResponse = await axios.get(`https://jsonplaceholder.typicode.com/shoes/${id}`);
    let shoe: ShoeRecord = result.data;
    return res.status(200).json({
        message: shoe
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

export default { getShoes, getShoe, updateShoe, deleteShoe, addShoe };