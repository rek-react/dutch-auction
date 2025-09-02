import { pinataClient } from "@/lib/pinata";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as Blob;
    const name = formData.get("name") as string;
    const description = formData.get("description") as string;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    const cid = await pinataClient.uploadNFT({
      file,
      name,
      description,
    });

    if (!cid) {
      return NextResponse.json(
        { error: "Failed to upload NFT to pinata" },
        { status: 500 }
      );
    }

    return NextResponse.json({ cid });
  } catch (err) {
    console.error("NFT upload failed:", err);
    return NextResponse.json(
      { error: "Unexpected error while uploading NFT" },
      { status: 500 }
    );
  }
}
