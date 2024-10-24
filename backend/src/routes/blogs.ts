import express from 'express';
import * as blogController from '../controllers/blogController';
import * as commentController from '../controllers/commentController';

const router = express.Router();

router.post('/', blogController.blogPost);

router.get('/:blogId', blogController.blogGet);

router.post('/:blogId/comments', commentController.commentPost);


export default router;
