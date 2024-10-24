import prisma from '../config/prismaClient';

export async function addBlog(args: { title: string, content: string, authorId: string }) {
  const blog = await prisma.blog.create({
    data: {
      title: args.title,
      content: args.content,
      authorId: args.authorId,
    },
  });

  return blog;
}

export async function getBlog(blogId: string) {
  const blog = await prisma.blog.findUnique({
    where: {
      id: blogId,
    },
  });

  return blog;
}

export async function addUser(username: string) {
  const user = await prisma.user.create({
    data: {
      username,
    }
  });

  return user;
}

export async function addComment(args: { authorId: string, blogId: string, content: string }) {
  const user = await prisma.comment.create({
    data: {
      authorId: args.authorId,
      blogId: args.blogId,
      content: args.content,
    }
  });

  return user;
}
