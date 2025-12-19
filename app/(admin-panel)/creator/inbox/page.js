"use client";
import React, { useState, useRef, useEffect } from "react";
import {
  Send,
  MoreVertical,
  X,
  Image,
  CheckCircle,
  Loader2,
  ArrowLeft,
} from "lucide-react";
import { useSearchParams, useRouter } from "next/navigation";
import Conversations from "./_components/Conversations";
import {
  getChatMessages,
  sendSupportMessage,
  markMessagesAsRead,
} from "./actions/chat.action";
import { io } from "socket.io-client";

export default function InboxPage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const receiverId = searchParams.get("receiverId");

  const [selectedChat, setSelectedChat] = useState(null);
  const [selectedChatName, setSelectedChatName] = useState("");
  const [message, setMessage] = useState("");
  const [isMobileChatOpen, setIsMobileChatOpen] = useState(false);
  const [previewImages, setPreviewImages] = useState([]);
  const [messages, setMessages] = useState([]);
  const [loading, setLoading] = useState(false);
  const [sending, setSending] = useState(false);
  const [selectedConv, setSelectedConv] = useState(null);
  const [customerTyping, setCustomerTyping] = useState(false);
  const [onlineCustomers, setOnlineCustomers] = useState([]);
  const [refreshConversations, setRefreshConversations] = useState(0);
  const [socketConnected, setSocketConnected] = useState(false);
  const fileInputRef = useRef(null);
  const messagesEndRef = useRef(null);
  const messagesContainerRef = useRef(null);
  const typingTimeoutRef = useRef(null);
  const socketRef = useRef(null);
  const shouldScrollRef = useRef(true);

  const scrollToBottom = (force = false) => {
    if (!messagesEndRef.current) return;

    // Check if user is near bottom (within 100px)
    const container = messagesContainerRef.current;
    if (container && !force) {
      const { scrollTop, scrollHeight, clientHeight } = container;
      const isNearBottom = scrollHeight - scrollTop - clientHeight < 100;

      // Only auto-scroll if user is near bottom or force is true
      if (!isNearBottom && !shouldScrollRef.current) return;
    }

    // Use requestAnimationFrame for smooth scroll after DOM update
    requestAnimationFrame(() => {
      messagesEndRef.current?.scrollIntoView({
        behavior: shouldScrollRef.current ? "smooth" : "auto",
        block: "end",
      });
    });
  };

  // Scroll when messages change
  useEffect(() => {
    // Small delay to ensure images and content are rendered
    const timeoutId = setTimeout(() => {
      scrollToBottom();
    }, 100);

    return () => clearTimeout(timeoutId);
  }, [messages, customerTyping]);

  // Scroll when images load
  useEffect(() => {
    const container = messagesContainerRef.current;
    if (!container) return;

    const images = container.querySelectorAll("img");
    let loadedCount = 0;

    const handleImageLoad = () => {
      loadedCount++;
      if (loadedCount === images.length) {
        scrollToBottom();
      }
    };

    images.forEach((img) => {
      if (img.complete) {
        loadedCount++;
      } else {
        img.addEventListener("load", handleImageLoad);
      }
    });

    if (loadedCount === images.length && images.length > 0) {
      scrollToBottom();
    }

    return () => {
      images.forEach((img) => {
        img.removeEventListener("load", handleImageLoad);
      });
    };
  }, [messages]);

  // Initialize Socket.IO
  useEffect(() => {
    socketInitializer();

    return () => {
      if (socketRef.current) {
        socketRef.current.disconnect();
      }
    };
  }, []);

  const socketInitializer = async () => {
    try {
      socketRef.current = io("http://localhost:4000", {
        transports: ["websocket", "polling"],
        reconnection: true,
        reconnectionAttempts: 5,
        reconnectionDelay: 1000,
      });

      socketRef.current.on("connect", () => {
        console.log("Admin socket connected:", socketRef.current.id);
        setSocketConnected(true);
        socketRef.current.emit("admin:join");
      });

      socketRef.current.on("connect_error", (error) => {
        console.error("Socket connection error:", error);
        setSocketConnected(false);
      });

      // Listen for customer online status
      socketRef.current.on("customer:online", (data) => {
        console.log("Customer online:", data);
        setOnlineCustomers((prev) => {
          if (!prev.includes(data.phone)) {
            return [...prev, data.phone];
          }
          return prev;
        });
      });

      socketRef.current.on("customer:offline", (data) => {
        console.log("Customer offline:", data);
        setOnlineCustomers((prev) =>
          prev.filter((phone) => phone !== data.phone)
        );
      });

      // Get list of online customers when admin joins
      socketRef.current.on("customers:online", (customers) => {
        console.log("Online customers:", customers);
        setOnlineCustomers(customers);
      });

      socketRef.current.on("disconnect", () => {
        console.log("Admin socket disconnected");
        setSocketConnected(false);
      });
    } catch (error) {
      console.error("Socket initialization error:", error);
    }
  };

  // Handle incoming customer messages - updates when selectedChat changes
  useEffect(() => {
    if (!socketRef.current) return;

    // Remove old listener to prevent duplicates
    socketRef.current.off("customer:new-message");

    // Attach new listener with current selectedChat value
    socketRef.current.on("customer:new-message", (data) => {
      console.log("New message from customer:", data);

      const { phone, message } = data;

      // ONLY update UI if we're currently viewing THIS conversation
      if (selectedChat === phone) {
        const newMessage = {
          id: Date.now(),
          sender: "client",
          text: message.text,
          image: message.image,
          time: formatTime(new Date()),
          isRead: false,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        shouldScrollRef.current = true;

        // Mark as read since admin is viewing
        markMessagesAsRead(phone);
      }

      // Always trigger conversation list refresh to show unread indicator
      setRefreshConversations((prev) => prev + 1);
    });

    return () => {
      // Cleanup listener on unmount or when selectedChat changes
      if (socketRef.current) {
        socketRef.current.off("customer:new-message");
      }
    };
  }, [selectedChat]);

  // Handle customer typing - updates when selectedChat changes
  useEffect(() => {
    if (!socketRef.current) return;

    socketRef.current.off("customer:typing");

    socketRef.current.on("customer:typing", (data) => {
      console.log("Customer typing:", data);
      if (selectedChat === data.phone) {
        setCustomerTyping(true);

        if (typingTimeoutRef.current) {
          clearTimeout(typingTimeoutRef.current);
        }

        typingTimeoutRef.current = setTimeout(() => {
          setCustomerTyping(false);
        }, 3000);
      }
    });

    return () => {
      if (socketRef.current) {
        socketRef.current.off("customer:typing");
      }
    };
  }, [selectedChat]);

  useEffect(() => {
    if (receiverId) {
      openChat(receiverId);
    } else {
      setSelectedChat(null);
      setSelectedChatName("");
      setMessages([]);
      setSelectedConv(null);
      setIsMobileChatOpen(false);
    }
  }, [receiverId]);

  const loadMessages = async (phone) => {
    setLoading(true);
    shouldScrollRef.current = false; // Don't animate scroll on initial load
    try {
      const result = await getChatMessages(phone);

      if (result.error) {
        console.error("Error loading messages:", result.message);
        setMessages([]);
      } else {
        setMessages(result.data || []);
        await markMessagesAsRead(phone);

        // Force scroll to bottom after messages load
        setTimeout(() => {
          scrollToBottom(true);
          shouldScrollRef.current = true; // Re-enable smooth scrolling
        }, 150);
      }
    } catch (err) {
      console.error("Error loading messages:", err);
      setMessages([]);
    } finally {
      setLoading(false);
    }
  };

  const openChat = async (phone, name = "") => {
    setSelectedChat(phone);
    setSelectedChatName(name || phone);
    setIsMobileChatOpen(true);

    // Get current path to maintain consistency
    const currentPath = window.location.pathname;
    router.push(`${currentPath}?receiverId=${phone}`, { scroll: false });

    await loadMessages(phone);

    // Notify customer that admin is viewing
    if (socketRef.current && socketRef.current.connected) {
      console.log("Emitting admin:view-conversation for", phone);
      socketRef.current.emit("admin:view-conversation", phone);
    }
  };

  const closeChat = () => {
    setIsMobileChatOpen(false);
    setSelectedChat(null);
    setSelectedChatName("");
    setSelectedConv(null);
    setMessages([]);
    setCustomerTyping(false);

    // Get current path to maintain consistency
    const currentPath = window.location.pathname;
    router.push(currentPath, { scroll: false });
  };

  const handleSendMessage = async () => {
    if ((!message.trim() && previewImages.length === 0) || !selectedChat) {
      return;
    }

    setSending(true);

    try {
      const messageData = {
        text: message.trim(),
        image: previewImages[0] || null,
      };

      const result = await sendSupportMessage(selectedChat, messageData);

      if (result.success) {
        const newMessage = {
          id: result.data._id,
          sender: "admin",
          text: messageData.text,
          image: result.data.image,
          time: formatTime(new Date()),
          isRead: false,
          createdAt: new Date(),
        };

        setMessages((prev) => [...prev, newMessage]);
        shouldScrollRef.current = true;

        // Emit message to customer via Socket.IO
        if (socketRef.current && socketRef.current.connected) {
          console.log("Emitting admin message to customer:", selectedChat);
          socketRef.current.emit("admin:message", {
            phone: selectedChat,
            message: {
              text: messageData.text,
              image: result.data.image,
              sender: "support",
            },
          });
        } else {
          console.warn("Socket not connected, message saved to DB only");
        }

        setMessage("");
        setPreviewImages([]);
      } else {
        alert(result.message || "Failed to send message");
      }
    } catch (err) {
      console.error("Error sending message:", err);
      alert("Failed to send message. Please try again.");
    } finally {
      setSending(false);
    }
  };

  const handleTyping = () => {
    if (socketRef.current && socketRef.current.connected && selectedChat) {
      socketRef.current.emit("admin:typing", selectedChat);
    }
  };

  const handleImageSelect = (e) => {
    const files = Array.from(e.target.files);

    if (files.length === 0) return;

    const file = files[0];

    if (!file.type.startsWith("image/")) {
      alert("Please select an image file");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      alert("Image size must be less than 5MB");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setPreviewImages([reader.result]);
    };
    reader.readAsDataURL(file);
  };

  const removePreviewImage = (index) => {
    setPreviewImages((prev) => prev.filter((_, i) => i !== index));
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  const handleKeyPress = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const markAsSolved = async () => {
    if (!selectedChat) return;

    const confirmed = confirm("Mark this conversation as solved?");
    if (!confirmed) return;

    try {
      const result = await sendSupportMessage(selectedChat, {
        text: "✅ This conversation has been marked as solved.",
      });

      if (result.success) {
        await loadMessages(selectedChat);

        // Notify customer via Socket.IO
        if (socketRef.current && socketRef.current.connected) {
          socketRef.current.emit("admin:message", {
            phone: selectedChat,
            message: {
              text: "✅ This conversation has been marked as solved.",
              sender: "support",
            },
          });
        }
      }
    } catch (err) {
      console.error("Error marking as solved:", err);
    }
  };

  const formatTime = (date) => {
    if (!date) return "";
    const d = new Date(date);
    return d.toLocaleTimeString("en-US", {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  const isCustomerOnline =
    selectedChat && onlineCustomers.includes(selectedChat);

  return (
    <div className="h-screen bg-[#000] flex flex-col">
      <div className="flex-1 flex overflow-hidden">
        <Conversations
          isMobileChatOpen={isMobileChatOpen}
          selectedChat={selectedChat}
          openChat={openChat}
          onlineCustomers={onlineCustomers}
          refresh={refreshConversations}
        />

        <div
          className={`${
            isMobileChatOpen ? "flex" : "hidden md:flex"
          } flex-1 flex-col bg-[#000]`}
        >
          {selectedChat ? (
            <>
              <div className="bg-[#000] border-b border-zinc-900 px-5 py-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <button
                    onClick={closeChat}
                    className="md:hidden mr-1 p-2 hover:bg-zinc-900 rounded-lg transition-colors"
                  >
                    <ArrowLeft size={20} className="text-white" />
                  </button>
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg">
                      {selectedChatName.charAt(0).toUpperCase()}
                    </div>
                    {isCustomerOnline && (
                      <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-black rounded-full"></div>
                    )}
                  </div>
                  <div>
                    <h2 className="font-semibold text-white text-[15px]">
                      {selectedChatName}
                    </h2>
                    <p className="text-xs text-zinc-500">
                      {customerTyping
                        ? "typing..."
                        : isCustomerOnline
                        ? "online"
                        : `${messages.length} messages`}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button
                    onClick={markAsSolved}
                    className="px-4 py-2 bg-green-600 hover:bg-green-700 rounded-lg transition-colors text-white text-sm font-medium flex items-center gap-2"
                  >
                    <CheckCircle size={16} />
                    Solved
                  </button>
                  <button className="p-2.5 hover:bg-zinc-900 rounded-lg transition-colors">
                    <MoreVertical size={18} className="text-zinc-400" />
                  </button>
                </div>
              </div>

              <div
                ref={messagesContainerRef}
                className="flex-1 overflow-y-auto p-5 space-y-4 bg-[#000]"
              >
                {loading ? (
                  <div className="flex items-center justify-center h-full">
                    <div className="text-center">
                      <Loader2 className="w-10 h-10 text-white animate-spin mx-auto mb-3" />
                      <p className="text-zinc-500 text-sm">
                        Loading messages...
                      </p>
                    </div>
                  </div>
                ) : messages.length === 0 ? (
                  <div className="flex items-center justify-center h-full">
                    <p className="text-zinc-500 text-sm">No messages yet</p>
                  </div>
                ) : (
                  <>
                    <div className="flex justify-center mb-6">
                      <span className="text-xs text-zinc-600 bg-zinc-950 px-3 py-1.5 rounded-full">
                        Conversation Started
                      </span>
                    </div>

                    {messages.map((msg) => (
                      <div
                        key={msg.id}
                        className={`flex items-end gap-2 ${
                          msg.sender === "admin"
                            ? "justify-end"
                            : "justify-start"
                        }`}
                      >
                        {msg.sender === "client" && (
                          <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                            {selectedChatName.charAt(0).toUpperCase()}
                          </div>
                        )}
                        <div
                          className={`flex flex-col ${
                            msg.sender === "admin" ? "items-end" : "items-start"
                          } max-w-[75%] sm:max-w-[60%]`}
                        >
                          <div
                            className={`rounded-2xl px-4 py-2.5 ${
                              msg.sender === "admin"
                                ? "bg-white text-black rounded-br-sm"
                                : "bg-zinc-950 text-white rounded-bl-sm border border-zinc-900"
                            }`}
                          >
                            {msg.image && (
                              <img
                                src={msg.image}
                                alt="Attachment"
                                className="rounded-lg mb-2 max-w-full h-auto"
                                loading="lazy"
                              />
                            )}
                            {msg.text && (
                              <p className="text-[14px] leading-relaxed">
                                {msg.text}
                              </p>
                            )}
                          </div>
                          <span className="text-[11px] text-zinc-600 mt-1 px-1">
                            {msg.time}
                          </span>
                        </div>
                      </div>
                    ))}

                    {customerTyping && (
                      <div className="flex items-end gap-2 justify-start">
                        <div className="w-8 h-8 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-sm flex-shrink-0">
                          {selectedChatName.charAt(0).toUpperCase()}
                        </div>
                        <div className="bg-zinc-950 text-white rounded-2xl rounded-bl-sm border border-zinc-900 px-4 py-2.5">
                          <div className="flex gap-1">
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "0ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "150ms" }}
                            ></div>
                            <div
                              className="w-2 h-2 bg-white rounded-full animate-bounce"
                              style={{ animationDelay: "300ms" }}
                            ></div>
                          </div>
                        </div>
                      </div>
                    )}

                    <div ref={messagesEndRef} />
                  </>
                )}
              </div>

              {previewImages.length > 0 && (
                <div className="px-5 py-3 border-t border-zinc-900 bg-[#000]">
                  <div className="flex gap-2 overflow-x-auto">
                    {previewImages.map((img, index) => (
                      <div key={index} className="relative flex-shrink-0">
                        <img
                          src={img}
                          alt={`Preview ${index + 1}`}
                          className="w-20 h-20 object-cover rounded-lg border border-zinc-800"
                        />
                        <button
                          onClick={() => removePreviewImage(index)}
                          className="absolute -top-2 -right-2 p-1 bg-red-600 hover:bg-red-700 rounded-full transition-colors"
                        >
                          <X size={14} className="text-white" />
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              <div className="bg-[#000] border-t border-zinc-900 p-4">
                <div className="flex items-end gap-2">
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handleImageSelect}
                    className="hidden"
                  />
                  <button
                    onClick={() => fileInputRef.current?.click()}
                    disabled={sending}
                    className="p-3 hover:bg-zinc-900 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50"
                  >
                    <Image size={20} className="text-zinc-500" />
                  </button>
                  <div className="flex-1 bg-zinc-950 border border-zinc-900 rounded-2xl overflow-hidden focus-within:border-zinc-800 transition-colors">
                    <textarea
                      value={message}
                      onChange={(e) => {
                        setMessage(e.target.value);
                        handleTyping();
                      }}
                      onKeyDown={handleKeyPress}
                      placeholder="Type a message..."
                      rows="1"
                      disabled={sending}
                      className="w-full bg-transparent text-white px-4 py-3 resize-none focus:outline-none placeholder:text-zinc-600 text-[14px] disabled:opacity-50"
                    />
                  </div>
                  <button
                    onClick={handleSendMessage}
                    disabled={
                      sending || (!message.trim() && previewImages.length === 0)
                    }
                    className="p-3 bg-white hover:bg-zinc-200 rounded-xl transition-colors flex-shrink-0 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {sending ? (
                      <Loader2 size={20} className="text-black animate-spin" />
                    ) : (
                      <Send size={20} className="text-black" />
                    )}
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex items-center justify-center bg-[#000]">
              <div className="text-center">
                <div className="w-24 h-24 bg-zinc-950 rounded-full flex items-center justify-center mx-auto mb-4 border border-zinc-900">
                  <svg
                    className="w-12 h-12 text-zinc-700"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={1.5}
                      d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z"
                    />
                  </svg>
                </div>
                <h3 className="text-lg font-semibold mb-2 text-white">
                  Select a conversation
                </h3>
                <p className="text-zinc-500 text-sm">
                  Choose a conversation from the list to start messaging
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
