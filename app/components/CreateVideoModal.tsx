"use client";

import { useState } from "react";
import { createVideo } from "@/lib/api";
import { CreateVideoRequest } from "@/lib/types";

interface CreateVideoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function CreateVideoModal({
  isOpen,
  onClose,
  onSuccess,
}: CreateVideoModalProps) {
  const [formData, setFormData] = useState<CreateVideoRequest>({
    title: "",
    original_url: "",
    highlight_url: "",
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validation
    if (!formData.title.trim()) {
      setError("Title is required");
      return;
    }
    if (!formData.original_url.trim()) {
      setError("Original video URL is required");
      return;
    }
    if (!formData.highlight_url.trim()) {
      setError("Highlight video URL is required");
      return;
    }

    try {
      setLoading(true);
      setError(null);

      const response = await createVideo(formData);

      if (response.status === "success") {
        // Reset form
        setFormData({
          title: "",
          original_url: "",
          highlight_url: "",
        });
        onSuccess();
        onClose();
      } else {
        setError(response.message || "Failed to create video");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to create video");
    } finally {
      setLoading(false);
    }
  };

  const handleClose = () => {
    if (!loading) {
      setFormData({
        title: "",
        original_url: "",
        highlight_url: "",
      });
      setError(null);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b border-gray-200">
          <h2 className="text-xl font-semibold text-gray-900">
            Import New Job
          </h2>
          <button
            onClick={handleClose}
            disabled={loading}
            className="text-gray-400 hover:text-gray-600 disabled:opacity-50"
          >
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Error Message */}
          {error && (
            <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
              {error}
            </div>
          )}

          {/* Title Field */}
          <div className="mb-4">
            <label
              htmlFor="title"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Video Title <span className="text-red-500">*</span>
            </label>
            <input
              type="text"
              id="title"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              placeholder="Enter video title"
              disabled={loading}
              className="w-full rounded-md border border-gray-300 text-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
          </div>

          {/* Original URL Field */}
          <div className="mb-4">
            <label
              htmlFor="original_url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Original Video URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="original_url"
              value={formData.original_url}
              onChange={(e) =>
                setFormData({ ...formData, original_url: e.target.value })
              }
              placeholder="https://example.com/original.mp4"
              disabled={loading}
              className="w-full rounded-md border border-gray-300 text-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">
              Full URL to the original video file
            </p>
          </div>

          {/* Highlight URL Field */}
          <div className="mb-6">
            <label
              htmlFor="highlight_url"
              className="block text-sm font-medium text-gray-700 mb-1"
            >
              Highlight Video URL <span className="text-red-500">*</span>
            </label>
            <input
              type="url"
              id="highlight_url"
              value={formData.highlight_url}
              onChange={(e) =>
                setFormData({ ...formData, highlight_url: e.target.value })
              }
              placeholder="https://example.com/highlight.mp4"
              disabled={loading}
              className="w-full rounded-md border border-gray-300 text-black px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:bg-gray-100 disabled:cursor-not-allowed"
            />
            <p className="mt-1 text-xs text-gray-500">
              Full URL to the highlight video file
            </p>
          </div>

          {/* Action Buttons */}
          <div className="flex gap-3">
            <button
              type="button"
              onClick={handleClose}
              disabled={loading}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={loading}
              className="flex-1 px-4 py-2 border border-transparent rounded-md text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              {loading ? (
                <>
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  Creating...
                </>
              ) : (
                "Create Video"
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
