import { Router } from 'express';
import { PostController } from '../controllers/Feed/PostController';

export const PostRoute = Router();
const postCrudRoute = '/api/post/:id?';
const PostFeedCtrl = new PostController();

PostRoute.route(postCrudRoute).post(async (req, res, next) => {
  try {
    let {
      post,
      user: { id }
    } = req.body;

    let postResponse = await PostFeedCtrl.CreatePost(post, id);

    res.json(postResponse);
  } catch (error) {
    res.status(302).json({ mensage: 'error' });
  }
});