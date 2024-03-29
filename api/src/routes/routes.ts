/** source/routes/shoe.ts */
import express from 'express';
import controller from '../controllers/controllers';
const router = express.Router();

router.get('/shoes', controller.getShoes);
router.get('/runner/:email', controller.getRunner);
router.put('/shoes', controller.updateShoe);
router.put('/delete', controller.deleteShoe);
router.post('/runner', controller.addShoeRecord);
router.post('/user', controller.addUser);
router.put('/shoe', controller.addNewShoe);
router.put('/runner', controller.updatePassword);
router.put('/mileage', controller.updateMileage);
router.put('/condition', controller.updateCondition);
router.put('/mileagecondition', controller.updateMileageCondtition);

router.get('/user/:email', controller.getUser);
router.get('/users', controller.getUsers);
router.get('/butt', controller.validateUser);
router.get('/newuser', controller.validateNewUser);

export = router;