import express from 'express';
import * as blogController from '../controllers/blogController';
import * as commentController from '../controllers/commentController';
import passport from 'passport';

const router = express.Router();

router.post('/', passport.authenticate('jwt', { session: false }), blogController.blogPost);
router.get('/', blogController.blogsGet);

router.get('/:blogId', blogController.blogGet);

router.post('/:blogId/comments', passport.authenticate('jwt', { session: false }), commentController.commentPost);


export default router;
