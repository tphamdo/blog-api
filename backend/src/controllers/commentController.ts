import { Request, Response } from 'express';
import L from '../lib/logger';
import * as db from '../db/queries';

export async function commentPost(req: Request, res: Response): Promise<void> {
  const { content } = req.body;
  const { blogId } = req.params;
  const authorId = req.user?.id;
  if (!blogId || !authorId || !content) {
    L.log(blogId);
    L.log(authorId);
    L.log(content);
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  L.log(req.body);
  const comment = await db.addComment({ blogId, content, authorId });
  if (comment) res.json({ message: 'Comment successfully added!' });
  else res.json({ message: 'Comment was not added!' });
}
