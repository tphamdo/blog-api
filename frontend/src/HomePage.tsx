import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import api from './api';
import {
  Card,
  CardContent,
  CardTitle,
  CardHeader,
} from "@/components/ui/card"
import NavBar from './components/navbar';

function HomePage() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    const abortController = new AbortController();
    const { signal } = abortController;

    console.log('inside useeffect----------------------');
    const fecthData = async () => {
      try {
        const response = await api.get('http://localhost:3000/blogs', { signal });
        if (response.status === 200 && response.statusText === "OK") {
          console.log("------------------------------------");
          console.log(response.data.blogs);
          setBlogs(response.data.blogs);
        }
      } catch (err) {
        console.error(`caught an error: ${err}`);
      } finally {
      }

    }

    fecthData();
    return () => {
      abortController.abort();
    }
  }, [])
  return (
    <>
      <NavBar />
      <div className="flex justify-center">
        <div className="p-5">
          <div className="flex gap-6 items-stretch flex-wrap">
            {blogs.map(blog => (
              <Card className="w-80" key={blog.id}>
                <Link to={`blogs/${blog.id}`} className="self-stretch">
                  <CardHeader>
                    <CardTitle>{blog.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p>{blog.content.length < 100 ? blog.content : blog.content.slice(0, 100) + '...'}</p>
                  </CardContent>
                </Link>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default HomePage
