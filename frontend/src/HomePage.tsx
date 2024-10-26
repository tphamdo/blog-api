import { Link } from 'react-router-dom';

function HomePage() {
  return (
    <div className="flex justify-center items-center h-full">
      <div>
        <Link to={'login'} className="hover:underline text-2xl">Login</Link>
      </div>
    </div>
  );
}

export default HomePage
