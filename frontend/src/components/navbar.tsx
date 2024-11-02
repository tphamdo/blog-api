import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { useAuth } from '../AuthProvider';
import L from '../lib/logger';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

export default function NavBar() {
  const { isAuth, clearToken } = useAuth();
  const navigate = useNavigate();

  function logout() {
    L.log('here in logout');
    clearToken();
    navigate('/');
  }

  return (
    <header className="flex p-5 items-center justify-center">
      <Link to='/'><h1 className="text-xl font-bold">Blogs</h1></Link>
      <div className="ml-auto">
        <DropdownMenu>
          <DropdownMenuTrigger className="mx-5">Menu</DropdownMenuTrigger>
          <DropdownMenuContent className="bg-black text-white" align="end">
            {!isAuth() &&
              <Link to="/login">
                <DropdownMenuItem className="hover:bg-zinc-50 cursor-pointer">
                  Login
                </DropdownMenuItem>
              </Link>
            }
            {isAuth() &&
              <>
                <Link to="/newBlog">
                  <DropdownMenuItem className="hover:bg-zinc-50 cursor-pointer">
                    New Blog
                  </DropdownMenuItem>
                </Link>
                <button onClick={logout} className="w-full">
                  <DropdownMenuItem className="hover:bg-zinc-50 cursor-pointer">
                    Logout
                  </DropdownMenuItem>
                </button>
              </>
            }
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header >
  );
}
