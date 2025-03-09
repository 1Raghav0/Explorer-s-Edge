import axios from "axios";
import { useState, useRef, useEffect } from "react";
import { db, auth } from "../firebase/Firebase";
import {
  collection,
  addDoc,
  query,
  where,
  getDocs,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

const TripAssistant = () => {
  const [question, setQuestion] = useState("");
  const [conversation, setConversation] = useState([]);
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      if (currentUser) {
        fetchUserConversations(currentUser.uid);
      }
    });
    return () => unsubscribe();
  }, []);

  // Fetch user's saved conversations (both questions and AI responses)
  const fetchUserConversations = async (userId) => {
    try {
      const q = query(collection(db, "conversations"), where("userId", "==", userId));
      const querySnapshot = await getDocs(q);
      const userConversations = querySnapshot.docs.flatMap((doc) => [
        { id: doc.id, text: `👨‍💻 **Question:** ${doc.data().question}`, sender: "user" },
        { id: doc.id, text: `🤖 **AI Suggestions:** ${doc.data().response}`, sender: "ai" },
      ]);
      setConversation(userConversations);
    } catch (error) {
      console.error("Error fetching conversation:", error);
    }
  };

  // Save both question and AI response to Firestore
  const saveConversationToFirestore = async (questionText, responseText) => {
    if (!user) return;
    try {
      await addDoc(collection(db, "conversations"), {
        userId: user.uid,
        question: questionText,
        response: responseText,
        timestamp: new Date(),
      });
    } catch (error) {
      console.error("Error saving conversation:", error);
    }
  };

  // Analyze trip question and get AI response
  const analyzeUI = async () => {
    if (!question.trim()) return;

    const userMessage = { text: `👨‍💻 **Question:** ${question}`, sender: "user" };
    setConversation((prev) => [...prev, userMessage]);

    setQuestion("");

    setTimeout(() => {
      if (chatContainerRef.current) {
        chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
      }
    }, 100);

    setLoading(true);
    try {
      const response = await axios.post(
        `${import.meta.env.VITE_GEMINI_API_URL}?key=${import.meta.env.VITE_GEMINI_API_KEY}`,
        {
          contents: [{ parts: [{ text: `Analyze this trip, destination, places to travel:\n${question}` }] }],
        },
        { headers: { "Content-Type": "application/json" } }
      );

      const aiResponse =
        response.data.candidates?.[0]?.content?.parts?.[0]?.text ||
        "I'm having trouble responding right now.";

      const aiMessage = { text: `🤖 **AI Suggestions:** ${aiResponse}`, sender: "ai" };
      setConversation((prev) => [...prev, aiMessage]);

      // Save both question & response in Firestore
      saveConversationToFirestore(question, aiResponse);
    } catch (error) {
      console.error("Error analyzing UI:", error);
      const errorMessage = { text: `❌ **Error:** Failed to analyze.`, sender: "ai" };
      setConversation((prev) => [...prev, errorMessage]);
    }
    setLoading(false);
  };

  // Clear all saved conversations for the logged-in user
  const clearConversations = async () => {
    if (!user) return;
    try {
      const q = query(collection(db, "conversations"), where("userId", "==", user.uid));
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach(async (document) => {
        await deleteDoc(doc(db, "conversations", document.id));
      });
      setConversation([]);
    } catch (error) {
      console.error("Error clearing conversations:", error);
    }
  };

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [conversation]);

  return (
    <div className="min-h-screen flex justify-center items-center bg-gray-300 p-6">
      <div className="w-full max-w-3xl mt-10 bg-gray-100 rounded-lg shadow-2xl overflow-hidden">
        {/* Chat Header */}
        <div className="p-4 border-b border-gray-700 text-lg font-semibold flex justify-between">
          <span>Explorer’s Edge</span>
          {/* Show Clear Button Only if User is Logged In */}
          {user && (
            <button
              onClick={clearConversations}
              className="bg-red-500 px-3 py-1 rounded-md text-sm text-white cursor-pointer hover:bg-red-600"
            >
              Clear
            </button>
          )}
        </div>

        {/* Chat Area */}
        <div ref={chatContainerRef} className="h-[450px] overflow-y-auto p-4 space-y-4 scrollbar-hide">
          {conversation.map((msg, index) => (
            <div key={index} className={`flex ${msg.sender === "user" ? "justify-start" : "justify-end"}`}>
              <div
                className={`px-4 py-2 rounded-xl max-w-lg md:max-w-md text-white shadow-md ${
                  msg.sender === "user" ? "bg-zinc-600 text-left" : "bg-gray-800 text-center"
                }`}
              >
                <span dangerouslySetInnerHTML={{ __html: msg.text.replace(/\n/g, "<br>") }} />
              </div>
            </div>
          ))}
        </div>

        {/* Input Field */}
        <div className="p-4 bg-gray-00 border-t border-gray-600 flex items-center gap-2">
          <input
            type="text"
            className="flex-1 bg-gray-300 text-gray-800 p-2 rounded-lg focus:outline-none placeholder-gray-400"
            placeholder="City-where you visit, Budget-, Duration- ..."
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && analyzeUI()}
          />
          <button
            className="px-4 py-2 bg-green-500 text-white rounded-lg cursor-pointer hover:bg-green-600 disabled:bg-gray-500"
            onClick={analyzeUI}
            disabled={loading}
          >
            {loading ? "Processing.." : "Send"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default TripAssistant;
