import { Request, Response } from 'express';
import L from '../lib/logger';
import * as db from '../db/queries';

export async function blogPost(req: Request, res: Response): Promise<void> {
  const { title, content } = req.body;
  const authorId = req.user?.id;
  if (!title || !content || !authorId) {
    res.status(400).json({ message: 'All fields are required.' });
    return;
  }

  const blog = await db.addBlog({ title, content, authorId });
  L.log(blog);
  res.send('tpham -> blog posted');
}

export async function blogGet(req: Request, res: Response): Promise<void> {
  const { blogId } = req.params;
  if (!blogId) {
    res.status(400).json({ message: 'Missing blog id' });
    return;
  }

  const blog = await db.getBlog(blogId);
  if (!blog) res.status(400).json({ message: 'blog not found' });
  else res.json({ blog });
}

export async function blogsGet(req: Request, res: Response): Promise<void> {
  const blogs = await db.getBlogs();
  L.log(blogs);
  if (!blogs) res.status(500).json({ message: 'Blogs not found' });
  else res.json({ blogs });
}
