import { NextResponse } from "next/server";
import { writeFile } from "fs/promises";
import path from "path";

export async function POST(request) {
  try {
    const data = await request.formData();
    const file = data.get("file");

    if (!file) {
      return NextResponse.json(
        { success: false, error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Create unique filename
    const timestamp = Date.now();
    const randomString = Math.random().toString(36).substring(2);
    const fileExtension = path.extname(file.name);
    const fileName = `chat_${timestamp}_${randomString}${fileExtension}`;

    // Save file to public/uploads/chat directory
    const uploadDir = path.join(process.cwd(), "public/uploads/chat");
    const filePath = path.join(uploadDir, fileName);

    try {
      await writeFile(filePath, buffer);
    } catch (error) {
      // Create directory if it doesn't exist
      const fs = require("fs");
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
        await writeFile(filePath, buffer);
      } else {
        throw error;
      }
    }

    const fileUrl = `/uploads/chat/${fileName}`;

    return NextResponse.json({
      success: true,
      file: {
        fileName,
        originalName: file.name,
        fileUrl,
        fileSize: file.size,
        mimeType: file.type,
      },
    });
  } catch (error) {
    console.error("Error uploading file:", error);
    return NextResponse.json(
      { success: false, error: "Failed to upload file" },
      { status: 500 }
    );
  }
}
