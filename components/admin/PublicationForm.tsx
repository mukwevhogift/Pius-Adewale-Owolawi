"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import FileUploader from "@/components/admin/FileUploader";
import Toast from "@/components/admin/Toast";

interface PublicationFormProps {
  initialData?: any;
}

export default function PublicationForm({ initialData }: PublicationFormProps) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [toast, setToast] = useState<{ message: string; type: 'success' | 'error' | 'info' } | null>(null);
  
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    authors: initialData?.authors || "",
    journal: initialData?.journal || "",
    year: initialData?.year || "",
    doi: initialData?.doi || "",
    pdf_url: initialData?.pdf_url || "",
    type: initialData?.type || "journal",
    abstract: initialData?.abstract || "",
    keywords: initialData?.keywords?.join(", ") || "",
    citation_count: initialData?.citation_count || 0,
    is_published: initialData?.is_published ?? true,
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value, type } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "number" ? parseInt(value) || 0 : value,
    }));
  };

  const handleCheckbox = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.checked,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      // Convert keywords string to array
      const keywords = formData.keywords
        ? formData.keywords.split(",").map((k: string) => k.trim()).filter((k: string) => k)
        : [];

      // Prepare payload with correct types
      const payload = {
        title: formData.title,
        authors: formData.authors,
        journal: formData.journal,
        year: formData.year,
        doi: formData.doi || null,
        pdf_url: formData.pdf_url || null,
        type: formData.type,
        abstract: formData.abstract || null,
        keywords: keywords,
        citation_count: parseInt(String(formData.citation_count)) || 0,
        is_published: formData.is_published,
      };

      console.log("Submitting payload:", payload);

      const response = await fetch(
        initialData ? `/api/publications/${initialData.id}` : "/api/publications",
        {
          method: initialData ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        }
      );

      const responseData = await response.json();
      console.log("Response:", responseData);

      if (!response.ok) {
        throw new Error(responseData.error || "Failed to save publication");
      }

      setToast({
        message: `Publication ${initialData ? 'updated' : 'created'} successfully!`,
        type: 'success'
      });

      // Wait a moment to show the toast, then navigate
      setTimeout(() => {
        router.push("/admin/publications");
        router.refresh();
      }, 1000);
    } catch (err: any) {
      setError(err.message || "Failed to save publication. Please try again.");
      setToast({
        message: err.message || "Failed to save publication",
        type: 'error'
      });
      console.error("Save error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit} className="space-y-6">
        {error && (
          <div className="bg-red-50 border border-red-400 text-red-700 px-4 py-3 rounded-lg flex items-center gap-2">
            <i className="ri-error-warning-line"></i>
            {error}
          </div>
        )}

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Title *
        </label>
        <input
          type="text"
          name="title"
          value={formData.title}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Authors * (comma-separated)
        </label>
        <input
          type="text"
          name="authors"
          value={formData.authors}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="John Doe, Jane Smith, ..."
          required
        />
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Journal/Conference *
          </label>
          <input
            type="text"
            name="journal"
            value={formData.journal}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Year *
          </label>
          <input
            type="text"
            name="year"
            value={formData.year}
            onChange={handleChange}
            maxLength={4}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="2024"
            required
          />
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Type *
          </label>
          <select
            name="type"
            value={formData.type}
            onChange={handleChange}
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="journal">Journal</option>
            <option value="conference">Conference</option>
            <option value="book">Book</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Citation Count
          </label>
          <input
            type="number"
            name="citation_count"
            value={formData.citation_count}
            onChange={handleChange}
            min="0"
            className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          DOI
        </label>
        <input
          type="text"
          name="doi"
          value={formData.doi}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="10.1234/example"
        />
      </div>

      <div>
        <FileUploader
          label="PDF Document"
          bucket="publications"
          accept="application/pdf"
          currentFile={formData.pdf_url}
          onUploadComplete={(url) =>
            setFormData((prev) => ({ ...prev, pdf_url: url }))
          }
        />
        {formData.pdf_url && (
          <div className="mt-2">
            <a
              href={formData.pdf_url}
              target="_blank"
              rel="noopener noreferrer"
              className="text-sm text-blue-600 hover:text-blue-800 flex items-center gap-1"
            >
              <i className="ri-external-link-line"></i>
              View current PDF
            </a>
          </div>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Abstract
        </label>
        <textarea
          name="abstract"
          value={formData.abstract}
          onChange={handleChange}
          rows={4}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          Keywords (comma-separated)
        </label>
        <input
          type="text"
          name="keywords"
          value={formData.keywords}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          placeholder="AI, Machine Learning, Neural Networks"
        />
      </div>

      <div className="flex items-center gap-2">
        <input
          type="checkbox"
          name="is_published"
          checked={formData.is_published}
          onChange={handleCheckbox}
          className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
        />
        <label className="text-sm font-medium text-gray-700">
          Published (visible on website)
        </label>
      </div>

      <div className="flex gap-4 pt-4 border-t">
        <button
          type="submit"
          disabled={loading}
          className="bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition disabled:opacity-50 disabled:cursor-not-allowed font-medium flex items-center gap-2"
        >
          {loading ? (
            <>
              <i className="ri-loader-4-line animate-spin"></i>
              Saving...
            </>
          ) : (
            <>
              <i className="ri-save-line"></i>
              {initialData ? "Update" : "Create"} Publication
            </>
          )}
        </button>
        <button
          type="button"
          onClick={() => router.back()}
          className="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg hover:bg-gray-300 transition font-medium"
        >
          Cancel
        </button>
      </div>
    </form>

    {toast && (
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={true}
        onClose={() => setToast(null)}
      />
    )}
  </>
  );
}
