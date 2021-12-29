/** source/routes/shoe.ts */
import express from 'express';
import controller from '../controllers/shoe';
const router = express.Router();

router.get('/shoes', controller.getShoes);
router.get('/shoes/:id', controller.getShoe);
router.put('/shoes/:id', controller.updateShoe);
router.delete('/shoes/:id', controller.deleteShoe);
router.post('/shoes', controller.addShoe);

export = router;