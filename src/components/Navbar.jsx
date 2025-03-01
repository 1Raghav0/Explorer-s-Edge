import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import { signOut, onAuthStateChanged } from "firebase/auth";
import "remixicon/fonts/remixicon.css";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Listen for auth state changes in real-time
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser({ name: user.displayName, email: user.email });
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe(); // Cleanup listener on unmount
  }, []);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      navigate("/login"); // Redirect to login after logout
    } catch (error) {
      console.error("Logout Error: ", error);
    }
  };

  const closeSidebar = () => setIsOpen(false);

  return (
    <nav className="bg-white shadow-md fixed w-full z-10">
      <div className="container mx-auto py-2 px-6 flex justify-between items-center">
        {/* Logo */}
        <Link to="/" className="text-2xl font-bold text-indigo-600">
          <img src="./logo.jpg" alt="Logo" className="h-16" />
        </Link>

        {/* Desktop Menu */}
        <ul className="hidden md:flex space-x-6">
          <li><Link to="/" className="text-gray-700 hover:text-indigo-600">Home</Link></li>
          <li><Link to="/features" className="text-gray-700 hover:text-indigo-600">Features</Link></li>
          <li><Link to="/pricing" className="text-gray-700 hover:text-indigo-600">Pricing</Link></li>
          <li><Link to="/contact" className="text-gray-700 hover:text-indigo-600">Contact</Link></li>
        </ul>

        {/* User Info & Logout */}
        <div className="hidden md:flex items-center space-x-4">
          {user ? (
            <>
              <span className="text-gray-700 text-lg font-semibold">{`Hello, ${user.name}`}</span>
              <button onClick={handleLogout} className="bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-red-600">
                Logout
              </button>
            </>
          ) : (
            <Link to="/login" className="bg-indigo-600 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-indigo-700">
              Login
            </Link>
          )}
        </div>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="md:hidden text-gray-700 text-2xl">
          <i className="ri-menu-line cursor-pointer"></i>
        </button>
      </div>

      {/* Sidebar for Mobile */}
      <div
        className={`fixed top-0 left-0 h-full w-64 pt-6 shadow-lg backdrop-blur-lg bg-white bg-opacity-30 border-r border-white border-opacity-20 transform ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        } transition-transform duration-500 ease-in-out z-50`}
      >
        {/* Sidebar Header */}
        <div className="flex justify-between items-center p-5 border-b border-white border-opacity-20">
          <h2 className="text-lg font-bold text-indigo-600">Menu</h2>
          <button className="text-gray-700" onClick={closeSidebar}>
            <i className="ri-close-line text-2xl cursor-pointer"></i>
          </button>
        </div>

        {/* Sidebar Links */}
        <ul className="flex flex-col gap-y-8 p-6">
          <li><Link to="/" className="block text-gray-700 hover:text-indigo-600" onClick={closeSidebar}>Home</Link></li>
          <li><Link to="/features" className="block text-gray-700 hover:text-indigo-600" onClick={closeSidebar}>Features</Link></li>
          <li><Link to="/pricing" className="block text-gray-700 hover:text-indigo-600" onClick={closeSidebar}>Pricing</Link></li>
          <li><Link to="/contact" className="block text-gray-700 hover:text-indigo-600" onClick={closeSidebar}>Contact</Link></li>
        </ul>

        {/* Sidebar User Info & Logout */}
        <div className="p-6">
          {user ? (
            <>
              <span className="text-gray-700 text-lg font-semibold">{`Hello, ${user.name}`}</span>
              <button
                onClick={() => {
                  handleLogout();
                  closeSidebar();
                }}
                className="mt-4 bg-red-500 text-white py-2 px-4 rounded-md cursor-pointer hover:bg-red-600 w-full"
              >
                Logout
              </button>
            </>
          ) : (
            <Link
              to="/login"
              className="mt-4 block bg-indigo-600 text-white py-2 px-4 rounded-md text-center hover:bg-indigo-700 w-full"
              onClick={closeSidebar}
            >
              Login
            </Link>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
