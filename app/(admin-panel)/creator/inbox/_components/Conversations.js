"use client";

import { Search, Trash2, X } from "lucide-react";
import { useEffect, useState, useRef } from "react";
import {
  getChats,
  deleteConversation as deleteConv,
  deleteAllConversations as deleteAll,
} from "../actions/chat.action";
import { useRouter } from "next/navigation";

// Confirmation Modal Component
function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  isDeleteAll = false,
}) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/70 flex items-center justify-center z-50 p-4">
      <div className="bg-zinc-900 rounded-2xl max-w-md w-full p-6 border border-zinc-800">
        <div className="flex items-start justify-between mb-4">
          <h3 className="text-lg font-semibold text-white">{title}</h3>
          <button
            onClick={onClose}
            className="p-1 hover:bg-zinc-800 rounded-lg transition-colors"
          >
            <X size={20} className="text-zinc-400" />
          </button>
        </div>
        <p className="text-zinc-400 text-sm mb-6">{message}</p>
        <div className="flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-zinc-800 hover:bg-zinc-700 text-white rounded-lg transition-colors text-sm font-medium"
          >
            Cancel
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className={`px-4 py-2 ${
              isDeleteAll
                ? "bg-red-700 hover:bg-red-800"
                : "bg-red-600 hover:bg-red-700"
            } text-white rounded-lg transition-colors text-sm font-medium`}
          >
            Delete
          </button>
        </div>
      </div>
    </div>
  );
}

export default function Conversations({
  isMobileChatOpen,
  selectedChat,
  openChat,
  onlineCustomers = [],
  refresh = 0,
}) {
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [conversations, setConversations] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredConversations, setFilteredConversations] = useState([]);
  const [deleteModal, setDeleteModal] = useState({
    isOpen: false,
    phone: null,
  });
  const [deleteAllModal, setDeleteAllModal] = useState(false);
  const router = useRouter();
  const isInitialMount = useRef(true);

  // Fetch chats on mount and when refresh changes
  useEffect(() => {
    if (isInitialMount.current) {
      // First load - show spinner
      isInitialMount.current = false;
      fetchChats(true);
    } else {
      // Subsequent refreshes - silent update
      fetchChats(false);
    }
  }, [refresh]);

  // Filter conversations based on search
  useEffect(() => {
    if (searchQuery.trim() === "") {
      setFilteredConversations(conversations);
    } else {
      const filtered = conversations.filter(
        (conv) =>
          conv.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          conv.phone.includes(searchQuery) ||
          conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredConversations(filtered);
    }
  }, [searchQuery, conversations]);

  // Update online status based on socket data
  useEffect(() => {
    if (conversations.length === 0) return;

    setConversations((prev) =>
      prev.map((conv) => {
        const isOnline = onlineCustomers.includes(conv.phone);
        // Only update if online status actually changed
        if (conv.online === isOnline) return conv;
        return {
          ...conv,
          online: isOnline,
        };
      })
    );
  }, [onlineCustomers]);

  const fetchChats = async (showLoader = false) => {
    try {
      if (showLoader) {
        setLoading(true);
      } else {
        setIsRefreshing(true);
      }
      setError(null);

      const result = await getChats();

      if (result.error) {
        setError(result.message);
        if (showLoader) {
          setConversations([]);
        }
      } else {
        // Map online status to conversations
        const chatsWithOnlineStatus = (result.data || []).map((conv) => ({
          ...conv,
          online: onlineCustomers.includes(conv.phone),
        }));
        setConversations(chatsWithOnlineStatus);
      }
    } catch (err) {
      console.error("Error fetching chats:", err);
      setError("Failed to load conversations");
      if (showLoader) {
        setConversations([]);
      }
    } finally {
      setLoading(false);
      setIsRefreshing(false);
    }
  };

  const handleDeleteConversation = async (phone) => {
    try {
      const result = await deleteConv(phone);

      if (result.success) {
        // Remove from local state
        setConversations((prev) => prev.filter((conv) => conv.phone !== phone));

        // If this was the selected chat, clear selection
        if (selectedChat === phone) {
          openChat(null);
          router.push(window.location.pathname, { scroll: false });
        }
      } else {
        alert(result.message || "Failed to delete conversation");
      }
    } catch (err) {
      console.error("Error deleting conversation:", err);
      alert("Failed to delete conversation");
    }
  };

  const handleDeleteAllConversations = async () => {
    try {
      const result = await deleteAll();

      if (result.success) {
        setConversations([]);
        openChat(null);
        router.push(window.location.pathname, { scroll: false });
      } else {
        alert(result.message || "Failed to delete all conversations");
      }
    } catch (err) {
      console.error("Error deleting all conversations:", err);
      alert("Failed to delete all conversations");
    }
  };

  return (
    <>
      <div
        className={`${
          isMobileChatOpen ? "hidden md:flex" : "flex"
        } w-full md:w-[360px] flex-col bg-[#000] border-r border-zinc-900`}
      >
        {/* Search Header */}
        <div className="p-5 border-b border-zinc-900">
          <div className="flex items-center justify-between mb-4">
            <h1 className="text-xl font-bold text-white">Messages</h1>
            <div className="flex items-center gap-2">
              {/* Silent refresh indicator */}
              {isRefreshing && (
                <div className="w-4 h-4 border-2 border-zinc-700 border-t-white rounded-full animate-spin"></div>
              )}
              {conversations.length > 0 && (
                <button
                  onClick={() => setDeleteAllModal(true)}
                  className="px-3 py-2 bg-red-600 hover:bg-red-700 rounded-lg transition-colors text-white text-sm font-medium flex items-center gap-2"
                >
                  <Trash2 size={16} />
                  Delete All
                </button>
              )}
            </div>
          </div>
          <div className="relative">
            <Search
              className="absolute left-3.5 top-1/2 transform -translate-y-1/2 text-zinc-500"
              size={18}
            />
            <input
              type="text"
              placeholder="Search conversations..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full bg-zinc-950 text-white pl-11 pr-4 py-3 rounded-xl border border-zinc-900 focus:outline-none focus:border-zinc-800 placeholder:text-zinc-600 transition-colors"
            />
          </div>
        </div>

        {/* Conversation List */}
        <div className="flex-1 overflow-y-auto">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <div className="text-center">
                <div className="w-10 h-10 border-4 border-zinc-800 border-t-white rounded-full animate-spin mx-auto mb-3"></div>
                <p className="text-zinc-500 text-sm">
                  Loading conversations...
                </p>
              </div>
            </div>
          ) : error ? (
            <div className="flex items-center justify-center h-full p-5">
              <div className="text-center">
                <p className="text-red-500 text-sm mb-3">{error}</p>
                <button
                  onClick={() => fetchChats(true)}
                  className="px-4 py-2 bg-white text-black rounded-lg hover:bg-zinc-200 transition-colors text-sm font-medium"
                >
                  Retry
                </button>
              </div>
            </div>
          ) : filteredConversations.length === 0 ? (
            <div className="flex items-center justify-center h-full p-5">
              <div className="text-center">
                <p className="text-zinc-500 text-sm">
                  {searchQuery
                    ? "No conversations found"
                    : "No conversations yet"}
                </p>
              </div>
            </div>
          ) : (
            filteredConversations.map((conv) => (
              <div
                key={conv.phone}
                onClick={() => openChat(conv.phone)}
                className={`relative group p-4 border-b border-zinc-950 cursor-pointer transition-all duration-200 ${
                  selectedChat === conv.phone
                    ? "bg-zinc-950 border-l-2 border-l-white"
                    : "hover:bg-zinc-950/50"
                }`}
              >
                <div className="flex items-center gap-3">
                  <div className="relative flex-shrink-0">
                    <div className="w-12 h-12 rounded-full bg-secondary flex items-center justify-center text-white font-bold text-lg">
                      {conv.name.charAt(0).toUpperCase()}
                    </div>
                    {conv.online && (
                      <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 rounded-full border-2 border-[#000]"></div>
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between mb-1">
                      <h3 className="font-semibold text-white text-[15px] truncate">
                        {conv.name}
                      </h3>
                      <span className="text-xs text-zinc-500 ml-2">
                        {conv.time}
                      </span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-[13px] text-zinc-500 truncate flex-1">
                        {conv.lastMessage}
                      </p>
                      {conv.unread > 0 && (
                        <span className="bg-white text-black text-[11px] font-bold rounded-full min-w-[20px] h-[20px] flex items-center justify-center px-1.5">
                          {conv.unread}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Delete Button */}
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setDeleteModal({ isOpen: true, phone: conv.phone });
                  }}
                  className="absolute right-4 top-1/2 -translate-y-1/2 p-2 bg-red-600 hover:bg-red-700 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                >
                  <Trash2 size={16} className="text-white" />
                </button>
              </div>
            ))
          )}
        </div>
      </div>

      {/* Delete Single Conversation Modal */}
      <ConfirmModal
        isOpen={deleteModal.isOpen}
        onClose={() => setDeleteModal({ isOpen: false, phone: null })}
        onConfirm={() => handleDeleteConversation(deleteModal.phone)}
        title="Delete Conversation"
        message="Are you sure you want to delete this conversation? This action cannot be undone."
      />

      {/* Delete All Conversations Modal */}
      <ConfirmModal
        isOpen={deleteAllModal}
        onClose={() => setDeleteAllModal(false)}
        onConfirm={handleDeleteAllConversations}
        title="Delete All Conversations"
        message="Are you sure you want to delete ALL conversations? This action cannot be undone and will permanently remove all message history."
        isDeleteAll={true}
      />
    </>
  );
}
