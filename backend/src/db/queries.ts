import prisma from '../config/prismaClient';
import { User, Blog, Comment } from '@prisma/client';
import { genPassword } from '../lib/password';

export async function addUser(
  username: string,
  password: string,
): Promise<User | null> {
  const { hash, salt } = genPassword(password);
  try {
    const user = await prisma.user.create({
      data: {
        username,
        password: hash,
        salt,
      },
    });
    return user;
  } catch {
    return null;
  }
}

export async function getUser(username: string): Promise<User | null> {
  const user = await prisma.user.findUnique({
    where: {
      username,
    },
  });

  return user;
}

export async function addBlog(args: {
  title: string;
  content: string;
  authorId: string;
}): Promise<Blog | null> {
  try {
    const blog = await prisma.blog.create({
      data: {
        title: args.title,
        content: args.content,
        authorId: args.authorId,
      },
    });

    return blog;
  } catch {
    return null;
  }
}

export async function getBlog(blogId: string): Promise<Blog | null> {
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  return blog;
}

export async function addComment(args: {
  authorId: string;
  blogId: string;
  content: string;
}): Promise<Comment | null> {
  try {
    const user = await prisma.comment.create({
      data: {
        authorId: args.authorId,
        blogId: args.blogId,
        content: args.content,
      },
    });

    return user;
  } catch {
    return null;
  }
}
