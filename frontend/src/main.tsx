import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import { loader as blogLoader } from './BlogPage';
import BlogPage from './BlogPage.tsx'
import ErrorPage from './ErrorPage.tsx'
import HomePage from './HomePage.tsx'
import LoginPage from './LoginPage.tsx'
import NewBlogPage from './NewBlogPage.tsx'
import RegisterPage from './RegisterPage.tsx'
import {
  createBrowserRouter,
  RouterProvider,
  Navigate,
} from "react-router-dom";
import AuthProvider from './AuthProvider';

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />
  },
  {
    path: "/newBlog",
    element: <NewBlogPage />
  },
  {
    path: "/login",
    element: <LoginPage />
  },
  {
    path: "/register",
    element: <RegisterPage />
  },
  {
    path: "/blogs/:blogId",
    loader: blogLoader,
    element: <BlogPage />,
    errorElement: <ErrorPage />
  },
  {
    path: "*",
    element: <Navigate to="/" />
  }
]);

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <AuthProvider>
      <RouterProvider router={router} />
    </AuthProvider>
  </StrictMode>,
)
