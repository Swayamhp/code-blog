import express from 'express';
import {verifyToken} from '../utils/verifyUser.js'
import { create, deleteposts, deletepostsByAdmin, getposts, updatePost } from '../controller/post.controller.js';


const router = express.Router();

router.post('/create', verifyToken, create)
router.get('/getposts',getposts);
router.delete('/delete/:postId/:userId',verifyToken,deleteposts);
router.delete('/deletes/:postId',verifyToken,deletepostsByAdmin);
router.put('/updatepost/:postId/:userId',verifyToken, updatePost );


export default router;