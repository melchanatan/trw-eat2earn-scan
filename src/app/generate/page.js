"use client";
import Image from "next/image";
import { useQRCode } from "next-qrcode";

export default function Home() {
  const { Canvas } = useQRCode();

  return (
    <main className="flex flex-col items-center justify-center p-24">
      <h1>QR code generator</h1>
      <input type="text" placeholder="Enter text" />
      <Canvas
        text={"https://github.com/bunlong/next-qrcode"}
        options={{
          errorCorrectionLevel: "M",
          margin: 3,
          scale: 4,
          width: 200,
          color: {
            dark: "#000000",
            light: "#ffffff",
          },
        }}
      />
    </main>
  );
}
