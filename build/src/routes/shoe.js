"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
/** source/routes/shoe.ts */
const express_1 = __importDefault(require("express"));
const shoe_1 = __importDefault(require("../controllers/shoe"));
const router = express_1.default.Router();
router.get('/shoes', shoe_1.default.getShoes);
router.get('/shoes/:id', shoe_1.default.getShoe);
router.put('/shoes/:id', shoe_1.default.updateShoe);
router.delete('/shoes/:id', shoe_1.default.deleteShoe);
router.post('/shoes', shoe_1.default.addShoe);
module.exports = router;
