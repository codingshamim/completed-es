/* eslint-disable react/no-unescaped-entities */
"use client";
import { doSignOut } from "@/app/backend/actions";
import {
  getNotifications,
  markNotificationAsRead,
  markAllNotificationsAsRead,
} from "@/app/backend/actions/notification.action";
import Link from "next/link";
import { useState, useRef, useEffect, useCallback } from "react";

export default function UserIcon({
  icon,
  user = {
    name: "John Doe",
    role: "Administrator",
  },
}) {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isNotificationOpen, setIsNotificationOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [markingAllAsRead, setMarkingAllAsRead] = useState(false);

  const userDropdownRef = useRef(null);
  const notificationRef = useRef(null);
  const notificationListRef = useRef(null);

  const unreadCount = notifications.filter((n) => !n.isRead).length;

  // Format time ago
  const formatTimeAgo = (date) => {
    const now = new Date();
    const notificationDate = new Date(date);
    const diffInSeconds = Math.floor((now - notificationDate) / 1000);

    if (diffInSeconds < 60) return "Just now";
    if (diffInSeconds < 3600) return `${Math.floor(diffInSeconds / 60)}m ago`;
    if (diffInSeconds < 86400)
      return `${Math.floor(diffInSeconds / 3600)}h ago`;
    if (diffInSeconds < 604800)
      return `${Math.floor(diffInSeconds / 86400)}d ago`;

    return notificationDate.toLocaleDateString();
  };

  // Load notifications
  const loadNotifications = useCallback(async (pageNum = 1, reset = false) => {
    try {
      if (pageNum === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      const result = await getNotifications(pageNum, 10);

      if (result.ok) {
        if (reset || pageNum === 1) {
          setNotifications(result.data);
          setPage(1);
        } else {
          setNotifications((prev) => [...prev, ...result.data]);
        }
        setHasMore(result.pagination?.hasMore || false);
      } else {
        console.error("Error loading notifications:", result.message);
      }
    } catch (error) {
      console.error("Error loading notifications:", error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  }, []);

  // Load notifications when dropdown opens
  useEffect(() => {
    if (isNotificationOpen && notifications.length === 0) {
      setPage(1);
      loadNotifications(1, true);
    }
  }, [isNotificationOpen, loadNotifications, notifications.length]);

  // Infinite scroll handler for notification dropdown
  const handleNotificationScroll = useCallback(
    (e) => {
      const element = e.target;
      if (element && !loadingMore && hasMore) {
        const { scrollTop, scrollHeight, clientHeight } = element;
        if (scrollTop + clientHeight >= scrollHeight - 20) {
          const nextPage = page + 1;
          setPage(nextPage);
          loadNotifications(nextPage, false);
        }
      }
    },
    [loadingMore, hasMore, page, loadNotifications]
  );

  // Mark single notification as read
  const handleMarkAsRead = async (notificationId, e) => {
    e.stopPropagation();
    try {
      const result = await markNotificationAsRead(notificationId);
      if (result.ok) {
        setNotifications((prev) =>
          prev.map((notification) =>
            notification._id === notificationId
              ? { ...notification, isRead: true }
              : notification
          )
        );
      }
    } catch (error) {
      console.error("Error marking notification as read:", error);
    }
  };

  // Mark all notifications as read
  const handleMarkAllAsRead = async () => {
    try {
      setMarkingAllAsRead(true);
      const result = await markAllNotificationsAsRead();
      if (result.ok) {
        setNotifications((prev) =>
          prev.map((notification) => ({ ...notification, isRead: true }))
        );
      }
    } catch (error) {
      console.error("Error marking all notifications as read:", error);
    } finally {
      setMarkingAllAsRead(false);
    }
  };

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (
        userDropdownRef.current &&
        !userDropdownRef.current.contains(event.target)
      ) {
        setIsUserMenuOpen(false);
      }
      if (
        notificationRef.current &&
        !notificationRef.current.contains(event.target)
      ) {
        setIsNotificationOpen(false);
      }
    }

    if (isUserMenuOpen || isNotificationOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () =>
        document.removeEventListener("mousedown", handleClickOutside);
    }
  }, [isUserMenuOpen, isNotificationOpen]);

  const handleLogout = async () => {
    await doSignOut();
  };

  const getNotificationIcon = (type) => {
    switch (type) {
      case "welcome":
        return (
          <div className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="m12 3-1.912 5.813a2 2 0 0 1-1.275 1.275L3 12l5.813 1.912a2 2 0 0 1 1.275 1.275L12 21l1.912-5.813a2 2 0 0 1 1.275-1.275L21 12l-5.813-1.912a2 2 0 0 1-1.275-1.275L12 3Z" />
            </svg>
          </div>
        );
      case "order":
        return (
          <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M3 3h2l.4 2M7 13h10l4-8H5.4m0 0L7 13m0 0l-2.5 5M7 13l2.5 5M17 13v6a2 2 0 0 1-2 2H9a2 2 0 0 1-2-2v-6" />
            </svg>
          </div>
        );
      case "promotion":
        return (
          <div className="w-8 h-8 bg-purple-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="m3 11 18-5v12L3 14v-3z" />
              <path d="M11.6 16.8a3 3 0 1 1-5.8-1.6" />
            </svg>
          </div>
        );
      case "reminder":
        return (
          <div className="w-8 h-8 bg-yellow-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <circle cx="12" cy="12" r="10" />
              <polyline points="12,6 12,12 16,14" />
            </svg>
          </div>
        );
      case "system":
        return (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z" />
              <circle cx="12" cy="12" r="3" />
            </svg>
          </div>
        );
      default:
        return (
          <div className="w-8 h-8 bg-gray-600 rounded-full flex items-center justify-center">
            <svg
              width={14}
              height={14}
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth={2}
              className="text-white"
            >
              <path d="M6 8a6 6 0 0 1 12 0c0 7 3 9 3 9H3s3-2 3-9" />
              <path d="M10.3 21a1.94 1.94 0 0 0 3.4 0" />
            </svg>
          </div>
        );
    }
  };

  return (
    <div className="flex items-center gap-3 ml-auto relative">
      {/* Notification Bell */}
      <div className="relative" ref={notificationRef}>
        <button
          onClick={() => setIsNotificationOpen(!isNotificationOpen)}
          className="text-gray-400 hover:text-white relative transition-colors p-2 rounded-lg hover:bg-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width={20}
            height={20}
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="lucide lucide-bell"
          >
            <path d="M10.268 21a2 2 0 0 0 3.464 0" />
            <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
          </svg>
          {unreadCount > 0 && (
            <span className="absolute -top-1 -right-1 w-5 h-5 bg-red-500 rounded-full text-xs text-white flex items-center justify-center font-medium">
              {unreadCount > 9 ? "9+" : unreadCount}
            </span>
          )}
        </button>

        {/* Notification Dropdown */}
        {isNotificationOpen && (
          <div className="absolute right-0 top-full mt-2 w-80 bg-black rounded-lg shadow-2xl border border-gray-800 z-50 animate-in slide-in-from-top-2 duration-200">
            {/* Header */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center justify-between">
                <h3 className="text-lg font-semibold text-white">
                  Notifications
                </h3>
                {unreadCount > 0 && (
                  <span className="text-xs text-gray-400">
                    {unreadCount} unread
                  </span>
                )}
              </div>
            </div>

            {/* Notification List */}
            <div
              ref={notificationListRef}
              className="max-h-80 overflow-y-auto"
              onScroll={handleNotificationScroll}
            >
              {loading ? (
                // Loading skeleton
                <div className="space-y-0">
                  {[...Array(3)].map((_, i) => (
                    <div
                      key={i}
                      className="p-4 border-b border-gray-800 animate-pulse"
                    >
                      <div className="flex gap-3">
                        <div className="w-8 h-8 bg-gray-700 rounded-full"></div>
                        <div className="flex-1 space-y-2">
                          <div className="h-4 bg-gray-700 rounded w-3/4"></div>
                          <div className="h-3 bg-gray-700 rounded w-1/2"></div>
                          <div className="h-2 bg-gray-700 rounded w-1/4"></div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ) : notifications.length > 0 ? (
                <>
                  {notifications.map((notification) => (
                    <div
                      key={notification._id}
                      className={`p-4 border-b border-gray-800 hover:bg-gray-900 transition-colors cursor-pointer relative group ${
                        !notification.isRead ? "bg-gray-900/50" : ""
                      }`}
                      onClick={() =>
                        !notification.isRead &&
                        handleMarkAsRead(notification._id, {
                          stopPropagation: () => {},
                        })
                      }
                    >
                      <div className="flex gap-3">
                        {getNotificationIcon(notification.type)}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-2">
                            <h4
                              className={`text-sm font-medium ${
                                notification.isRead
                                  ? "text-gray-300"
                                  : "text-white"
                              }`}
                            >
                              {notification.title}
                            </h4>
                            {!notification.isRead && (
                              <div className="w-2 h-2 bg-blue-500 rounded-full flex-shrink-0 mt-2"></div>
                            )}
                          </div>
                          <p className="text-xs text-gray-400 mt-1 line-clamp-2">
                            {notification.message}
                          </p>
                          <span className="text-xs text-gray-500 mt-2 block">
                            {formatTimeAgo(notification.createdAt)}
                          </span>
                        </div>
                        {!notification.isRead && (
                          <button
                            onClick={(e) =>
                              handleMarkAsRead(notification._id, e)
                            }
                            className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 p-1 text-gray-400 hover:text-white hover:bg-gray-700 rounded transition-all"
                            title="Mark as read"
                          >
                            <svg
                              width={12}
                              height={12}
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth={2}
                            >
                              <polyline points="20,6 9,17 4,12" />
                            </svg>
                          </button>
                        )}
                      </div>
                    </div>
                  ))}

                  {/* Loading More Indicator */}
                  {loadingMore && (
                    <div className="p-4 text-center">
                      <div className="inline-flex items-center space-x-2 text-gray-400">
                        <div className="w-4 h-4 border-2 border-gray-400 border-t-transparent rounded-full animate-spin"></div>
                        <span className="text-xs">Loading more...</span>
                      </div>
                    </div>
                  )}

                  {/* End of List Indicator */}
                  {!hasMore && notifications.length > 5 && (
                    <div className="p-4 text-center">
                      <p className="text-gray-500 text-xs">
                        You've seen all notifications
                      </p>
                    </div>
                  )}
                </>
              ) : (
                <div className="p-6 text-center">
                  <div className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center mx-auto mb-3">
                    <svg
                      width={20}
                      height={20}
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                      className="text-gray-400"
                    >
                      <path d="M10.268 21a2 2 0 0 0 3.464 0" />
                      <path d="M3.262 15.326A1 1 0 0 0 4 17h16a1 1 0 0 0 .74-1.673C19.41 13.956 18 12.499 18 8A6 6 0 0 0 6 8c0 4.499-1.411 5.956-2.738 7.326" />
                    </svg>
                  </div>
                  <p className="text-gray-400 text-sm">No notifications</p>
                  <p className="text-gray-500 text-xs mt-1">
                    You're all caught up!
                  </p>
                </div>
              )}
            </div>

            {/* Footer */}
            {notifications.length > 0 && unreadCount > 0 && (
              <div className="p-3 border-t border-gray-800">
                <div className="flex gap-2">
                  <button
                    onClick={handleMarkAllAsRead}
                    disabled={markingAllAsRead}
                    className="flex-1 text-xs text-gray-400 hover:text-white transition-colors py-2 hover:bg-gray-800 rounded disabled:opacity-50"
                  >
                    {markingAllAsRead ? "Marking..." : "Mark all as read"}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}
      </div>

      {/* User Avatar Button */}
      <div className="relative" ref={userDropdownRef}>
        <button
          onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
          className="w-8 h-8 bg-black rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-1 focus:ring-offset-gray-800"
        >
          <span className="text-sm font-semibold text-white">{icon}</span>
        </button>

        {/* User Dropdown Modal */}
        {isUserMenuOpen && (
          <div className="absolute right-0 top-full mt-2 w-72 bg-black rounded-lg shadow-2xl border border-gray-800 z-50 animate-in slide-in-from-top-2 duration-200">
            {/* User Info Section */}
            <div className="p-4 border-b border-gray-800">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-secondary rounded-full flex items-center justify-center">
                  <span className="text-lg font-semibold text-white">
                    {icon}
                  </span>
                </div>
                <div className="flex-1 min-w-0">
                  <h3 className="text-sm font-semibold text-white truncate">
                    {user.name}
                  </h3>
                  <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-green-700 capitalize text-white mt-1">
                    {user.role}
                  </span>
                </div>
              </div>
            </div>

            {/* Menu Items */}
            <div className="py-2">
              <Link
                href="/creator/inbox"
                className="w-full px-4 py-2 text-left text-sm text-white hover:bg-secondary flex items-center gap-3 transition-colors"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width={16}
                  height={16}
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth={2}
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                  <polyline points="22,6 12,13 2,6" />
                </svg>
                Inbox
              </Link>

              <div className="border-t border-gray-800 mt-2 pt-2">
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2 text-left text-sm text-red-400 hover:bg-secondary flex items-center gap-3 transition-colors"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width={16}
                    height={16}
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    className="text-red-500"
                  >
                    <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4" />
                    <polyline points="16,17 21,12 16,7" />
                    <line x1="21" y1="12" x2="9" y2="12" />
                  </svg>
                  Sign Out
                </button>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Backdrop for mobile */}
      {(isUserMenuOpen || isNotificationOpen) && (
        <div
          className="fixed inset-0 z-40 bg-black bg-opacity-25 lg:hidden"
          onClick={() => {
            setIsUserMenuOpen(false);
            setIsNotificationOpen(false);
          }}
        />
      )}
    </div>
  );
}
