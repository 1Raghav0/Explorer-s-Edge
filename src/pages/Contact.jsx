import { useState, useEffect } from "react";
import { db, auth } from "../firebase/Firebase";
import { collection, addDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const Contact = () => {
  const [user, setUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const [isSent, setIsSent] = useState(false);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    onAuthStateChanged(auth, (currentUser) => {
      if (currentUser) {
        setUser(currentUser);
        setFormData({
          name: currentUser.displayName || "",
          email: currentUser.email || "",
          message: "",
        });
      }
    });
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    const updatedMessage = `${formData.message}\n\nAs a user of your website\n\nRegards,\nYour Explorer’s Edge Website`;

    try {
      const response = await fetch("https://formspree.io/f/xwpvgnkl", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...formData, message: updatedMessage }),
      });

      if (response.ok) {
        console.log("Message sent successfully!");

        if (user) {
          await addDoc(collection(db, "messages"), {
            userId: user.uid,
            name: formData.name,
            email: formData.email,
            message: updatedMessage,
            timestamp: new Date(),
          });
        }

        setIsSent(true);
        setFormData({ name: user?.displayName || "", email: user?.email || "", message: "" });
      } else {
        console.error("Failed to send message.");
      }
    } catch (error) {
      console.error("Error sending message:", error);
    }

    setLoading(false);
  };

  const handleInputClick = () => {
    setIsSent(false);
  };

  return (
    <div className="w-full py-24 px-6 transition-colors duration-300 bg-gray-100 text-gray-900">
      <div className="max-w-7xl mx-auto">
        <h1 className="text-4xl font-bold text-center mb-6">
          Get in Touch <span className="text-blue-500">📩</span>
        </h1>
        <p className="text-center max-w-2xl mx-auto text-gray-700">
          Have questions about AI? Want to improve your website or discuss your project? Let's chat!
        </p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mt-10">
          <div className="shadow-lg rounded-lg p-8 bg-white border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Send Us a Message 📝</h2>

            {isSent && <p className="text-green-600 font-bold text-center">✅ Message Sent Successfully!</p>}

            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block font-medium text-gray-800">Name</label>
                <input
                  type="text"
                  name="name"
                  placeholder="Your Name"
                  value={formData.name}
                  onChange={handleChange}
                  onClick={handleInputClick}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-800">Email</label>
                <input
                  type="email"
                  name="email"
                  placeholder="Your Email"
                  value={formData.email}
                  onChange={handleChange}
                  onClick={handleInputClick}
                  required
                  className="w-full px-4 py-2 border rounded-lg bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                />
              </div>
              <div>
                <label className="block font-medium text-gray-800">Message</label>
                <textarea
                  name="message"
                  placeholder="How can we help you?"
                  value={formData.message}
                  onChange={handleChange}
                  onClick={handleInputClick}
                  required
                  className="w-full px-4 py-2 border rounded-lg h-32 bg-white text-gray-900 border-gray-300 focus:ring-blue-500 focus:border-blue-500"
                ></textarea>
              </div>
              <button
                type="submit"
                className={`w-full text-white py-2 rounded-lg font-semibold transition cursor-pointer ${
                  loading
                    ? "bg-blue-400 cursor-not-allowed"
                    : "bg-blue-500 hover:bg-blue-600"
                }`}
                disabled={loading}
              >
                {loading ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>

          <div className="shadow-lg rounded-lg p-8 bg-white border border-gray-300">
            <h2 className="text-2xl font-semibold mb-4">Stay Connected 🔗</h2>
            <p className="text-gray-700">We love discussing AI, web development, and innovative ideas.</p>
            <div className="mt-4 space-y-4">
              <p className="flex items-center text-gray-700"><i className="ri-map-pin-line mr-2 text-xl"></i> Roorkee, Uttarakhand</p>
              <p className="flex items-center text-gray-700"><i className="ri-mail-line mr-2 text-xl"></i> raghav514422@gmail.com</p>
              <p className="flex items-center text-gray-700"><i className="ri-phone-line mr-2 text-xl"></i> 6397258224</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact;
