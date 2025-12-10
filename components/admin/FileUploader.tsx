"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

interface FileUploaderProps {
  onUploadComplete: (url: string) => void;
  accept?: string;
  bucket?: string;
  label?: string;
  currentFile?: string;
}

export default function FileUploader({
  onUploadComplete,
  accept = "image/*,application/pdf",
  bucket = "publications",
  label = "Upload File",
  currentFile,
}: FileUploaderProps) {
  const [uploading, setUploading] = useState(false);
  const [preview, setPreview] = useState<string | null>(currentFile || null);
  const [error, setError] = useState("");

  const handleUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setError("");

    // Show preview for images
    if (file.type.startsWith("image/")) {
      const reader = new FileReader();
      reader.onloadend = () => setPreview(reader.result as string);
      reader.readAsDataURL(file);
    }

    setUploading(true);

    const formData = new FormData();
    formData.append("file", file);
    formData.append("bucket", bucket);

    try {
      const response = await fetch("/api/upload", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      const data = await response.json();
      onUploadComplete(data.url);
    } catch (err) {
      setError("Upload failed. Please try again.");
      console.error("Upload error:", err);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div>
      <label className="block text-sm font-medium text-gray-700 mb-2">
        {label}
      </label>
      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-blue-500 transition">
        {preview && (
          <div className="mb-4">
            {preview.endsWith(".pdf") ? (
              <div className="flex items-center justify-center gap-2 text-red-600">
                <i className="ri-file-pdf-line text-4xl"></i>
                <span className="text-sm">PDF uploaded</span>
              </div>
            ) : (
              <img
                src={preview}
                alt="Preview"
                className="w-32 h-32 object-cover mx-auto rounded-lg"
              />
            )}
          </div>
        )}
        
        {error && (
          <div className="mb-4 text-red-600 text-sm flex items-center justify-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

        <input
          type="file"
          accept={accept}
          onChange={handleUpload}
          disabled={uploading}
          className="hidden"
          id={`file-upload-${bucket}`}
        />
        <label
          htmlFor={`file-upload-${bucket}`}
          className="cursor-pointer inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50"
        >
          {uploading ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              Uploading...
            </>
          ) : (
            <>
              <i className="ri-upload-cloud-line text-xl"></i>
              {preview ? "Change File" : "Choose File"}
            </>
          )}
        </label>
        <p className="text-xs text-gray-500 mt-2">
          {accept.includes("image") && "Images, "}
          {accept.includes("pdf") && "PDFs "}
          accepted
        </p>
      </div>
    </div>
  );
}
