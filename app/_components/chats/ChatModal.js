"use client";

import { useState, useRef, useEffect } from "react";
import {
  MessageCircle,
  X,
  Send,
  Image,
  User,
  Phone,
  Mail,
  Loader2,
} from "lucide-react";
import { createChat, getChatHistory } from "./actions/chat.actions";
import ReusableImage from "../ReusableImage";
import useCommonState from "@/app/src/hooks/useCommonState";

export default function CustomerSupportChat() {
  const [isFormSubmitted, setIsFormSubmitted] = useState(false);
  const [loggedInUser, setLoggedInUser] = useState(null);
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    message: "",
  });
  const [messages, setMessages] = useState([]);
  const [currentMessage, setCurrentMessage] = useState("");
  const [error, setError] = useState(null);
  const [selectedImage, setSelectedImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isInitializing, setIsInitializing] = useState(true);
  const fileInputRef = useRef(null);
  const { common, setCommon } = useCommonState();
  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    const initializeChat = async () => {
      setIsInitializing(true);
      try {
        const savedUser = localStorage.getItem("chatUser");
        if (savedUser) {
          const user = JSON.parse(savedUser);
          setLoggedInUser(user);
          setIsFormSubmitted(true);

          // Load chat history
          const history = await getChatHistory(user.phone);
          if (history.success && history.data.length > 0) {
            const formattedMessages = history.data.map((msg, idx) => ({
              id: idx + 1,
              text: msg.text,
              image: msg.image,
              sender: msg.sender,
              timestamp: new Date(msg.createdAt).toLocaleTimeString("bn-BD", {
                hour: "2-digit",
                minute: "2-digit",
              }),
            }));
            setMessages(formattedMessages);
          }
        } else {
          setLoggedInUser(null);
          setIsFormSubmitted(false);
        }
      } catch (err) {
        console.error("Error initializing chat:", err);
      } finally {
        setIsInitializing(false);
      }
    };

    initializeChat();
  }, []);

  const handleFormSubmit = async (e) => {
    e.preventDefault();

    if (!formData.name || !formData.phone || !formData.message) {
      setError("অনুগ্রহ করে সব ফিল্ড পূরণ করুন।");
      return;
    }

    setIsLoading(true);

    try {
      // Create initial user message
      const userMessage = {
        text: formData.message,
        sender: "user",
      };

      const response = await createChat(userMessage, {
        name: formData.name,
        phone: formData.phone,
      });

      if (response.success) {
        setIsFormSubmitted(true);
        localStorage.setItem(
          "chatUser",
          JSON.stringify({
            name: formData.name,
            phone: formData.phone,
          })
        );
        setLoggedInUser({
          name: formData.name,
          phone: formData.phone,
        });

        // Add messages to UI
        const timestamp = new Date().toLocaleTimeString("bn-BD", {
          hour: "2-digit",
          minute: "2-digit",
        });

        setMessages([
          {
            id: 1,
            text: formData.message,
            sender: "user",
            timestamp: timestamp,
          },
          {
            id: 2,
            text: `ধন্যবাদ ${formData.name}! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।`,
            sender: "support",
            timestamp: timestamp,
          },
        ]);

        // Save auto-reply to database
        setTimeout(async () => {
          await createChat(
            {
              text: `ধন্যবাদ ${formData.name}! আমরা শীঘ্রই আপনার সাথে যোগাযোগ করব।`,
              sender: "support",
            },
            {
              name: formData.name,
              phone: formData.phone,
            }
          );
        }, 500);
      } else {
        setError("মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleImageSelect = (e) => {
    const file = e.target.files[0];
    if (file && file.type.startsWith("image/")) {
      if (file.size > 5 * 1024 * 1024) {
        // 5MB limit
        setError("ছবির সাইজ ৫MB এর কম হতে হবে।");
        return;
      }
      setSelectedImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const removeImage = () => {
    setSelectedImage(null);
    setImagePreview(null);
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleSendMessage = async () => {
    if (!currentMessage.trim() && !selectedImage) return;

    setIsLoading(true);

    try {
      const timestamp = new Date().toLocaleTimeString("bn-BD", {
        hour: "2-digit",
        minute: "2-digit",
      });

      const newMessage = {
        id: messages.length + 1,
        text: currentMessage,
        image: imagePreview,
        sender: "user",
        timestamp: timestamp,
      };

      // Add message to UI immediately
      setMessages((prev) => [...prev, newMessage]);
      setCurrentMessage("");
      const tempImagePreview = imagePreview;
      setSelectedImage(null);
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }

      // Save to database
      const response = await createChat(
        {
          text: currentMessage,
          image: tempImagePreview,
          sender: "user",
        },
        {
          name: loggedInUser?.name,
          phone: loggedInUser?.phone,
        }
      );

      if (!response.success) {
        setError("মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      setError("মেসেজ পাঠাতে সমস্যা হয়েছে। আবার চেষ্টা করুন।");
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  return (
    <div className="fixed bottom-4 right-4 sm:bottom-6 sm:right-6 z-50">
      {common?.chatModal && (
        <div className="bg-black border border-gray-800 rounded-lg shadow-2xl w-[calc(100vw-2rem)] sm:w-96 h-[80vh] sm:h-[600px] flex flex-col overflow-hidden">
          <div className="bg-secondary text-white p-4 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <div className="bg-white text-black rounded-full p-2">ES</div>
              <div>
                <h3 className="font-bold text-lg">ES FITT Support</h3>
                <p className="text-xs text-white/80 bangla-font">
                  সাধারণত ৫ মিনিটে উত্তর দেয়
                </p>
              </div>
            </div>
            <button
              onClick={() => setCommon({ ...common, chatModal: false })}
              className="hover:bg-black/20 rounded-full p-1 transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          {isInitializing ? (
            <div className="flex-1 flex items-center justify-center bg-black">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
                <p className="text-gray-400 text-sm bangla-font">
                  লোড হচ্ছে...
                </p>
              </div>
            </div>
          ) : !isFormSubmitted ? (
            <div className="flex-1 p-4 sm:p-6 overflow-y-auto bg-black">
              <div className="mb-4">
                <h4 className="text-white text-lg font-semibold mb-2 bangla-font">
                  আমরা কিভাবে সাহায্য করতে পারি?
                </h4>
                <p className="text-gray-400 text-sm bangla-font">
                  আপনার তথ্য দিয়ে শুরু করুন
                </p>
              </div>
              {error && (
                <div className="flex items-center mb-4 gap-3 rounded-lg bg-red-300 p-4">
                  <div className="mt-0.5 h-5 w-5 flex-shrink-0 rounded-full bg-red-600 text-white flex items-center justify-center text-xs font-bold">
                    !
                  </div>
                  <p className="text-sm font-medium text-red-700">{error}</p>
                </div>
              )}

              <form onSubmit={handleFormSubmit} className="space-y-4">
                <div>
                  <label className="text-gray-300 text-sm mb-2 flex items-center gap-2 bangla-font">
                    <User className="w-4 h-4" />
                    নাম *
                  </label>
                  <input
                    type="text"
                    value={formData.name}
                    onChange={(e) => {
                      if (error) setError(null);
                      setFormData({ ...formData, name: e.target.value });
                    }}
                    className="w-full nav-border bangla-font bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors"
                    placeholder="আপনার নাম লিখুন"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="text-gray-300 bangla-font text-sm mb-2 flex items-center gap-2">
                    <Phone className="w-4 h-4" />
                    ফোন নম্বর *
                  </label>
                  <input
                    type="tel"
                    value={formData.phone}
                    onChange={(e) => {
                      if (error) setError(null);
                      setFormData({ ...formData, phone: e.target.value });
                    }}
                    className="w-full bg-gray-900 bangla-font bg-transparent border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white nav-border transition-colors"
                    placeholder="০১XXXXXXXXX"
                    disabled={isLoading}
                  />
                </div>

                <div>
                  <label className="text-gray-300 text-sm mb-2 flex items-center gap-2 bangla-font">
                    <Mail className="w-4 h-4" />
                    মেসেজ *
                  </label>
                  <textarea
                    value={formData.message}
                    onChange={(e) => {
                      if (error) setError(null);
                      setFormData({ ...formData, message: e.target.value });
                    }}
                    className="w-full bangla-font bg-transparent border nav-border rounded-lg px-4 py-3 text-white focus:outline-none focus:border-white transition-colors resize-none"
                    placeholder="আপনার প্রশ্ন বা সমস্যা লিখুন..."
                    rows="4"
                    disabled={isLoading}
                  />
                </div>

                <button
                  type="submit"
                  disabled={isLoading}
                  className="w-full bg-white bangla-font hover:bg-white/80 disabled:bg-gray-600 disabled:cursor-not-allowed text-black font-semibold py-3 rounded-lg transition-colors flex items-center justify-center gap-2"
                >
                  {isLoading ? (
                    <>
                      <Loader2 className="w-5 h-5 animate-spin" />
                      পাঠানো হচ্ছে...
                    </>
                  ) : (
                    <>
                      <MessageCircle className="w-5 h-5" />
                      চ্যাট শুরু করুন
                    </>
                  )}
                </button>
              </form>
            </div>
          ) : (
            <>
              <div className="flex-1 overflow-y-auto p-4 bg-black space-y-4">
                {messages.map((msg) => (
                  <div
                    key={msg.id}
                    className={`flex ${
                      msg.sender === "user" ? "justify-end" : "justify-start"
                    }`}
                  >
                    <div
                      className={`max-w-[80%] ${
                        msg.sender === "user"
                          ? "bg-white text-black"
                          : "bg-secondary text-white"
                      } rounded-lg p-3 shadow-lg`}
                    >
                      {msg.image && (
                        <ReusableImage
                          src={msg.image}
                          alt="Uploaded"
                          className="rounded-lg mb-2 max-w-full h-auto"
                        />
                      )}
                      {msg.text && (
                        <p className="text-sm break-words bangla-font">
                          {msg.text}
                        </p>
                      )}
                      <span
                        className={`text-xs mt-1 block ${
                          msg.sender === "user"
                            ? "text-black/70"
                            : "text-gray-400"
                        }`}
                      >
                        {msg.timestamp}
                      </span>
                    </div>
                  </div>
                ))}
                <div ref={messagesEndRef} />
              </div>

              {imagePreview && (
                <div className="px-4 py-2 bg-secondary border-t border-gray-800">
                  <div className="relative inline-block">
                    <ReusableImage
                      src={imagePreview}
                      alt="Preview"
                      className="h-20 w-20 object-cover rounded-lg"
                    />
                    <button
                      onClick={removeImage}
                      className="absolute -top-2 -right-2 bg-red-500 hover:bg-red-600 text-white rounded-full p-1 transition-colors"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              )}

              <div className="p-4">
                <div className="flex items-end gap-2">
                  <input
                    type="file"
                    ref={fileInputRef}
                    onChange={handleImageSelect}
                    accept="image/*"
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={isLoading}
                    className="bg-secondary rounded-lg text-white p-3 disabled:opacity-50 transition-colors shrink-0"
                  >
                    <Image className="w-5 h-5" />
                  </button>
                  <textarea
                    value={currentMessage}
                    onChange={(e) => setCurrentMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="মেসেজ লিখুন..."
                    disabled={isLoading}
                    className="flex-1 bg-black nav-border focus:border-white rounded-2xl px-4 py-2 bangla-font text-white focus:outline-none transition-colors resize-none disabled:opacity-50"
                    rows="1"
                  />
                  <button
                    onClick={handleSendMessage}
                    disabled={
                      (!currentMessage.trim() && !selectedImage) || isLoading
                    }
                    className="bg-white hover:bg-white/80 disabled:bg-secondary disabled:cursor-not-allowed disabled:text-white text-black p-3 rounded-lg transition-colors shrink-0"
                  >
                    {isLoading ? (
                      <Loader2 className="w-5 h-5 animate-spin" />
                    ) : (
                      <Send className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}
