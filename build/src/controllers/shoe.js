"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const axios_1 = __importDefault(require("axios"));
var Condition;
(function (Condition) {
    Condition["LIKE_NEW"] = "Like New";
    Condition["GOOD"] = "Good";
    Condition["BAD"] = "Bad";
    Condition["BITCH_GET_OFF_THE_ROAD"] = "BITCH GET OFF THE ROAD";
})(Condition || (Condition = {}));
const getShoesResult = [
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
];
// getting all shoes
const getShoes = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    return res.status(200).json({
        result: getShoesResult
    });
});
// getting a single shoe
const getShoe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the shoe id from the req
    let id = req.params.id;
    // get the shoe
    let result = yield axios_1.default.get(`https://jsonplaceholder.typicode.com/shoes/${id}`);
    let shoe = result.data;
    return res.status(200).json({
        message: shoe
    });
});
// updating a shoe
const updateShoe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    var _a, _b;
    // get the shoe id from the req.params
    let id = req.params.id;
    // get the data from req.body
    let title = (_a = req.body.title) !== null && _a !== void 0 ? _a : null;
    let body = (_b = req.body.body) !== null && _b !== void 0 ? _b : null;
    // update the shoe
    let response = yield axios_1.default.put(`https://jsonplaceholder.typicode.com/shoes/${id}`, Object.assign(Object.assign({}, (title && { title })), (body && { body })));
    // return response
    return res.status(200).json({
        message: response.data
    });
});
// deleting a shoe
const deleteShoe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the shoe id from req.params
    let id = req.params.id;
    // delete the shoe
    let response = yield axios_1.default.delete(`https://jsonplaceholder.typicode.com/shoes/${id}`);
    // return response
    return res.status(200).json({
        message: 'shoe deleted successfully'
    });
});
// adding a shoe
const addShoe = (req, res, next) => __awaiter(void 0, void 0, void 0, function* () {
    // get the data from req.body
    let title = req.body.title;
    let body = req.body.body;
    // add the shoe
    let response = yield axios_1.default.post(`https://jsonplaceholder.typicode.com/shoes`, {
        title,
        body
    });
    // return response
    return res.status(200).json({
        message: response.data
    });
});
exports.default = { getShoes, getShoe, updateShoe, deleteShoe, addShoe };
