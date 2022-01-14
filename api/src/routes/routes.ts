/** source/routes/shoe.ts */
import express from 'express';
import controller from '../controllers/controllers';
const router = express.Router();

router.get('/shoes', controller.getShoes);
router.get('/shoes/:email', controller.getShoe);
router.put('/shoes/:id', controller.updateShoe);
router.delete('/shoes/:id', controller.deleteShoe);
router.post('/shoes', controller.addShoe);

router.get('/users', controller.getUser);
router.get('./users', controller.validateUser);

export = router;