import api from './api';
import L from './lib/logger';
import { useLoaderData } from 'react-router-dom';
import NavBar from './components/navbar';
import Comments from './components/comments';

export async function loader({ params }: any) {
  const response = await api.get(`http://localhost:3000/blogs/${params.blogId}`);
  L.log('loader', response.data.blog);
  return response.data.blog;
}

function BlogPage() {
  const blog = useLoaderData();
  L.log('bp', blog);

  return (
    <>
      <NavBar />
      <div className="flex justify-center h-full mt-20">
        <div className="max-w-[800px] w-[800px]">
          <h1 className="font-bold text-2xl mb-1">{blog.title}</h1>
          <p className="mb-5">By: {blog.author.username}</p>
          <p className="leading-relaxed">{blog.content}</p>
          <div className="mt-16">
            <h3 className="font-semibold">Comments</h3>
            <Comments className="mt-2" blogId={blog.id} comments={blog.comments} />
          </div>
        </div>
      </div>
    </>
  );
}

export default BlogPage
