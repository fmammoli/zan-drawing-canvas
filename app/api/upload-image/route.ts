import { NextRequest, NextResponse } from "next/server";
import path from "path";
import fs from "fs/promises";

export async function POST(req: NextRequest) {
  try {
    const { dataUrl, createdAt } = await req.json();

    const base64Data = dataUrl.split(",")[1];
    if (!base64Data) {
      return NextResponse.json({ error: "Invalid Data URL" }, { status: 400 });
    }

    const buffer = Buffer.from(base64Data, "base64");

    const uploadDir = path.join(process.cwd(), "public", "uploads");
    await fs.mkdir(uploadDir, { recursive: true }); // Create directory if it doesn't exist

    const date = new Date(createdAt);
    const formattedDate = date.toISOString().replace(/[-:T]/g, "").slice(0, 15); // "20250926 153045"
    const fileName = `${formattedDate}.png`;
    const filePath = path.join(uploadDir, fileName);

    // Write the buffer to a file
    await fs.writeFile(filePath, buffer);

    return NextResponse.json({
      message: "File uploaded successfully",
      filePath,
    });
  } catch (error) {
    console.error("Error in upload route:", error);
    return NextResponse.json(
      { error: "Internal Server Error" },
      { status: 500 }
    );
  }
}
