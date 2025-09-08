import { Link } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="p-4 text-white bg-white shadow-md">
      <div className="container flex items-center justify-between mx-auto">
        <Link to="/" className="text-2xl font-bold tracking-wide text-green-600 hover:text-green-900">
          Workout Buddy
        </Link>

        <div className="space-x-6">
          <Link to="/" className="text-green-600 hover:text-green-900">
            Home
          </Link>
          <Link to="/about" className="text-green-600 hover:text-green-900">
            About
          </Link>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
