/** source/routes/shoe.ts */
import express from 'express';
import controller from '../controllers/controllers';
const router = express.Router();

router.get('/shoes', controller.getShoes);
router.get('/runner/:email', controller.getRunner);
router.put('/shoes', controller.updateShoe);
router.delete('/shoes/:id', controller.deleteShoe);
router.post('/runner', controller.addShoeRecord);
router.post('/user', controller.addUser);
router.post('/shoe/email', controller.addNewShoe)
router.put('/runner', controller.updatePassword)

router.get('/user', controller.getUser);
router.get('/users', controller.getUsers);
router.get('/butt', controller.validateUser);

export = router;