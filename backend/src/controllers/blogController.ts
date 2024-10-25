import { Request, Response } from 'express';
import L from '../lib/logger';
import * as db from '../db/queries';

export async function blogPost(req: Request, res: Response): Promise<void> {
  const { title, content } = req.body;
  const authorId = 'e4277c0d-0877-44b0-aa62-0e3c3abf97fc';
  if (!title || !content || !authorId) {
    res.status(400).send('All fields are required.');
    return;
  }

  L.log(req.body);
  const blog = await db.addBlog({ title, content, authorId });
  L.log(blog);
  res.send('tpham -> blog posted');
}

export async function blogGet(req: Request, res: Response): Promise<void> {
  const { blogId } = req.params;
  if (!blogId) {
    res.status(400).send('Invalid Blog Id');
    return;
  }

  const blog = await db.getBlog(blogId);
  if (!blog) res.send('blog not found');
  else res.send(`${JSON.stringify(blog, null, 4)}`);
}
