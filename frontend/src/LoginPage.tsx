import LoginForm from './components/loginForm';
import { Link } from 'react-router-dom';

function LoginPage() {
  return (
    <div className="flex justify-center items-center h-full border border-blue-400">
      <div>
        <LoginForm />
        <Link to="/register" className="text-sm">Register</Link>
      </div>
    </div>
  );
}

export default LoginPage;
