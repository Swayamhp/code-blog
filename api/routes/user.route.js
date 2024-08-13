import express from 'express'
import { deleteUser, signOutUser, test ,updateUser, getUsers, deleteusers, getUser} from '../controller/user.controller.js';
import { verifyToken } from '../utils/verifyUser.js';

const router=express.Router();

router.get('/test',test);
router.put('/update/:userId', verifyToken, updateUser);
router.delete('/delete/:userId', verifyToken, deleteUser);
router.post('/signout',signOutUser);
router.get('/getusers',verifyToken,getUsers);
router.delete('/deletes/:userId',verifyToken,deleteusers);
router.get('/:userId',getUser);

export default router;