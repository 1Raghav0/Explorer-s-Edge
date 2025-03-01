import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { auth } from "../firebase/Firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  signInWithPopup,
  GoogleAuthProvider,
  updateProfile,
  onAuthStateChanged,
} from "firebase/auth";

const Auth = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({ name: "", email: "", password: "" });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [showPopup, setShowPopup] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        localStorage.setItem("user", JSON.stringify({ name: user.displayName, email: user.email }));
      }
    });
    return () => unsubscribe();
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let userCredential;

      if (isSignUp) {
        if (formData.password.length < 6) {
          setError("Password must be at least 6 characters long.");
          setLoading(false);
          return;
        }

        userCredential = await createUserWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        await updateProfile(user, { displayName: formData.name });
        localStorage.setItem("user", JSON.stringify({ name: formData.name, email: user.email }));

        setShowPopup(true);
        setTimeout(() => {
          setShowPopup(false);
          setIsSignUp(false);
        }, 2000);
      } else {
        userCredential = await signInWithEmailAndPassword(auth, formData.email, formData.password);
        const user = userCredential.user;

        const name = user.displayName || "User";
        localStorage.setItem("user", JSON.stringify({ name, email: user.email }));

        navigate("/tripassistant");
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const googleSignIn = async () => {
    setLoading(true);
    try {
      const provider = new GoogleAuthProvider();
      const result = await signInWithPopup(auth, provider);
      const user = result.user;

      localStorage.setItem("user", JSON.stringify({ name: user.displayName, email: user.email }));

      navigate("/tripassistant");
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center transition-all duration-300 bg-gray-900">
      <div className="shadow-lg p-8 rounded-xl w-full max-w-md bg-gray-800">
        <h2 className="text-3xl font-bold text-center">
          {isSignUp ? "Create an Account" : "Welcome Back!"}
        </h2>

        {error && <p className="text-red-500 text-center mt-2">{error}</p>}

        {showPopup && (
          <div className="fixed top-20 left-1/2 transform -translate-x-1/2 bg-green-500 text-white p-3 rounded-md shadow-lg">
            Successfully Signed Up! Redirecting to Sign In...
          </div>
        )}

        <form className="mt-6 space-y-4" onSubmit={handleSubmit}>
          {isSignUp && (
            <input
              type="text"
              name="name"
              placeholder="Full Name"
              value={formData.name}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg focus:outline-none transition bg-gray-700 border-gray-600 text-white"
              required
            />
          )}

          <input
            type="email"
            name="email"
            placeholder="Email Address"
            value={formData.email}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none transition bg-gray-700 border-gray-600 text-white"
            required
          />

          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:outline-none transition bg-gray-700 border-gray-600 text-white"
            required
          />

          <button
            type="submit"
            className="w-full bg-green-500 text-white py-2 rounded-lg font-semibold transition hover:bg-green-600"
            disabled={loading}
          >
            {loading ? "Processing..." : isSignUp ? "Sign Up" : "Sign In"}
          </button>
        </form>

        <button
          onClick={googleSignIn}
          className="w-full bg-blue-500 text-white py-2 mt-4 rounded-lg font-semibold transition hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? "Processing..." : "Sign In with Google"}
        </button>

        <p className="text-center mt-4">
          {isSignUp ? "Already have an account?" : "Don't have an account?"} {" "}
          <button
            className="text-blue-400 hover:underline"
            onClick={() => setIsSignUp(!isSignUp)}
          >
            {isSignUp ? "Sign In" : "Sign Up"}
          </button>
        </p>
      </div>
    </div>
  );
};

export default Auth;
