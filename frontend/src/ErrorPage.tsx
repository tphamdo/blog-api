import { Link } from 'react-router-dom';

function ErrorPage() {
  return (
    <div className="flex flex-col justify-center h-full items-center gap-10">
      <p>Sorry that page does not exist</p>
      <Link to="/" className="underline">Go Home</Link>
    </div>
  );
}

export default ErrorPage
