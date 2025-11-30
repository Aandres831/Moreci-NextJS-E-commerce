import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    console.log("FILE:", file);

    if (!file) {
      return NextResponse.json({ error: "No file uploaded" }, { status: 400 });
    }

    const arrayBuffer = await file.arrayBuffer();
    console.log("ARRAYBUFFER OK");

    const buffer = Buffer.from(arrayBuffer);

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const preset = process.env.CLOUDINARY_UPLOAD_PRESET;

    console.log("ENV:", { cloudName, preset });

    if (!cloudName || !preset) {
      return NextResponse.json(
        { error: "Missing Cloudinary env variables" },
        { status: 500 }
      );
    }

    const body = new FormData();
    body.append("file", new Blob([buffer]));
    body.append("upload_preset", preset);

    const res = await fetch(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      { method: "POST", body }
    );

    const data = await res.json();

    console.log("CLOUDINARY RESPONSE:", data);

    if (!data.secure_url) {
      return NextResponse.json(
        { error: "Cloudinary upload failed", details: data },
        { status: 500 }
      );
    }

    return NextResponse.json({ url: data.secure_url });
  } catch (err) {
    console.error("UPLOAD ERROR LOG >>>", err);
    return NextResponse.json({ error: "Server error", details: String(err) }, { status: 500 });
  }
}
