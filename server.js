import { createServer } from "node:http";
import next from "next";
import { Server } from "socket.io";

const dev = process.env.NODE_ENV !== "production";
const hostname = "localhost";
const port = 4000;

const app = next({ dev, hostname, port });
const handler = app.getRequestHandler();

app.prepare().then(() => {
  const httpServer = createServer(handler);

  const io = new Server(httpServer, {
    cors: {
      origin: "*",
      methods: ["GET", "POST"],
    },
  });

  // Store active users and their socket IDs
  const activeUsers = new Map(); // phone -> socketId
  const adminSockets = new Set(); // Set of admin socket IDs

  io.on("connection", (socket) => {
    // Customer joins with their phone number
    socket.on("customer:join", (phone) => {
      activeUsers.set(phone, socket.id);
      socket.join(`customer:${phone}`);

      // Notify all admins that a customer is online
      socket.to("admin-room").emit("customer:online", { phone });
    });

    // Admin joins the admin room
    socket.on("admin:join", () => {
      adminSockets.add(socket.id);
      socket.join("admin-room");

      // Send list of online customers to admin
      const onlineCustomers = Array.from(activeUsers.keys());
      socket.emit("customers:online", onlineCustomers);
    });

    // Customer sends message
    socket.on("customer:message", (data) => {
      const { phone, message } = data;

      // Broadcast to all admins
      io.to("admin-room").emit("customer:new-message", {
        phone,
        message,
      });
    });

    // Admin sends message to specific customer
    socket.on("admin:message", (data) => {
      const { phone, message } = data;

      // Send to specific customer
      io.to(`customer:${phone}`).emit("admin:new-message", {
        message,
      });
    });

    // Admin views a conversation (mark as read)
    socket.on("admin:view-conversation", (phone) => {
      console.log(`Admin viewing conversation with ${phone}`);

      // Notify customer that admin is viewing (optional)
      io.to(`customer:${phone}`).emit("admin:viewing");
    });

    // Customer is typing
    socket.on("customer:typing", (phone) => {
      io.to("admin-room").emit("customer:typing", { phone });
    });

    // Admin is typing
    socket.on("admin:typing", (phone) => {
      io.to(`customer:${phone}`).emit("admin:typing");
    });

    // Handle disconnect
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);

      // Remove from active users if customer
      for (const [phone, socketId] of activeUsers.entries()) {
        if (socketId === socket.id) {
          activeUsers.delete(phone);
          // Notify admins that customer went offline
          io.to("admin-room").emit("customer:offline", { phone });
          console.log(`Customer ${phone} went offline`);
          break;
        }
      }

      // Remove from admin sockets if admin
      if (adminSockets.has(socket.id)) {
        adminSockets.delete(socket.id);
        console.log(`Admin ${socket.id} disconnected`);
      }
    });
  });

  httpServer
    .once("error", (err) => {
      console.error(err);
      process.exit(1);
    })
    .listen(port, () => {
      console.log(`> Ready on http://${hostname}:${port}`);
      console.log(`> Socket.IO server running`);
    });
});
