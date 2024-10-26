import RegisterForm from './components/registerForm';
import { Link } from 'react-router-dom';

function RegisterPage() {
  return (
    <div className="flex justify-center items-center h-full border border-blue-400">
      <div>
        <RegisterForm />
        <Link to="/login" className="text-sm">Login</Link>
      </div>
    </div>
  );
}

export default RegisterPage;
