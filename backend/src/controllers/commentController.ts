import { Request, Response } from 'express';
import L from '../lib/logger';
import * as db from '../db/queries';

export async function commentPost(req: Request, res: Response): Promise<void> {
  const { content } = req.body;
  const { blogId } = req.params;
  const authorId = 'e4277c0d-0877-44b0-aa62-0e3c3abf97fc';
  if (!blogId || !authorId || !content) {
    res.status(400).send('All fields are required.');
    return;
  }

  L.log(req.body);
  const blog = await db.addComment({ blogId, content, authorId });
  L.log(blog);
  res.send('tpham -> blog posted');
}
