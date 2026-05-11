"use client";

import { CldImage, CldUploadButton } from "next-cloudinary";
import { useState } from "react";
import type { CloudinaryUploadWidgetInfo } from "next-cloudinary";

const cloudName = process.env.NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME;
const uploadPreset = process.env.NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET;

export default function CloudinaryDemoPage() {
  const [uploadedImage, setUploadedImage] =
    useState<CloudinaryUploadWidgetInfo | null>(null);

  const configured = Boolean(cloudName && uploadPreset);

  return (
    <main style={{ padding: "2rem", maxWidth: 720, margin: "0 auto" }}>
      <h1 style={{ marginBottom: "0.5rem" }}>Cloudinary — prueba rápida</h1>
      <p style={{ color: "#555", marginBottom: "1.5rem" }}>
        Basado en el{" "}
        <a
          href="https://cloudinary.com/documentation/nextjs_quick_start"
          target="_blank"
          rel="noopener noreferrer"
        >
          Next.js quick start
        </a>
        . Configura{" "}
        <code>NEXT_PUBLIC_CLOUDINARY_CLOUD_NAME</code> y{" "}
        <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code> en{" "}
        <code>.env.local</code>.
      </p>

      {!configured && (
        <div
          style={{
            padding: "1rem",
            background: "#fff3cd",
            borderRadius: 8,
            marginBottom: "1.5rem",
            fontSize: 14,
          }}
        >
          <strong>Falta configuración:</strong> en Cloudinary Console crea un
          preset de subida <em>Unsigned</em> (Settings → Upload → Upload
          presets) y copia su nombre a{" "}
          <code>NEXT_PUBLIC_CLOUDINARY_UPLOAD_PRESET</code>. El cloud name está
          en el dashboard.
        </div>
      )}

      {configured && uploadPreset ? (
        <div
          style={{
            backgroundColor: "#0070f3",
            color: "white",
            padding: "12px 24px",
            border: "none",
            borderRadius: "6px",
            fontSize: "16px",
            fontWeight: "500",
            cursor: "pointer",
            display: "inline-block",
          }}
        >
          <CldUploadButton
            uploadPreset={uploadPreset}
            onSuccess={(result) => {
              if (result.info && typeof result.info !== "string") {
                setUploadedImage(result.info);
              }
            }}
            onQueuesEnd={(_result, { widget }) => {
              widget.close();
            }}
          >
            Subir imagen
          </CldUploadButton>
        </div>
      ) : null}

      {uploadedImage && (
        <div style={{ marginTop: "2rem" }}>
          <p>Subida correcta.</p>
          <p>
            <strong>Public ID:</strong> {uploadedImage.public_id}
          </p>

          <h2 style={{ marginTop: "2rem" }}>Imagen transformada</h2>
          <CldImage
            src={uploadedImage.public_id}
            width="250"
            height="250"
            crop="fill"
            alt="Imagen subida y transformada"
          />
        </div>
      )}
    </main>
  );
}
