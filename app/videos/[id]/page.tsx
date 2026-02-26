"use client";

import { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { fetchHighlights, fetchVideoById } from "@/lib/api";
import { Highlight, Video } from "@/lib/types";
import FramesList from "../../components/FramesList";

export default function VideoDetailPage() {
  const params = useParams();
  const router = useRouter();
  const videoId = parseInt(params.id as string);

  const [video, setVideo] = useState<Video | null>(null);
  const [highlights, setHighlights] = useState<Highlight[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize, setPageSize] = useState(20);

  // Expanded highlight state
  const [expandedHighlight, setExpandedHighlight] = useState<number | null>(
    null,
  );

  useEffect(() => {
    loadVideoData();
  }, [videoId]);

  useEffect(() => {
    if (video) {
      loadHighlights();
    }
  }, [videoId, currentPage, pageSize, video]);

  const loadVideoData = async () => {
    try {
      const videoData = await fetchVideoById(videoId);
      if (videoData) {
        setVideo(videoData);
      } else {
        setError("Video not found");
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch video");
    }
  };

  const loadHighlights = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchHighlights(videoId, {
        page: currentPage,
        size: pageSize,
        order_by: "id",
        order_direction: "asc",
      });

      if (response.status === "success") {
        setHighlights(response.data.items);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(
        err instanceof Error ? err.message : "Failed to fetch highlights",
      );
    } finally {
      setLoading(false);
    }
  };

  const toggleHighlight = (highlightId: number) => {
    setExpandedHighlight(
      expandedHighlight === highlightId ? null : highlightId,
    );
  };

  if (loading && currentPage === 1) {
    return (
      <div className="min-h-screen bg-gray-50">
        <div className="flex justify-center items-center py-12">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <Link
              href="/"
              className="text-blue-600 hover:text-blue-800 font-medium"
            >
              ← Back to Videos
            </Link>
            <h1 className="text-2xl font-bold text-gray-900">
              {video?.title || `Video #${videoId}`}
            </h1>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        {/* Video Players */}
        <div className="mb-8 grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Original Video */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              Original Video
            </h2>
            <div className="aspect-video bg-gray-900 rounded flex items-center justify-center">
              {video?.original_url ? (
                <video
                  controls
                  className="w-full h-full"
                  src={video.original_url}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p className="text-gray-400 text-sm">No video URL available</p>
              )}
            </div>
          </div>

          {/* Highlight Video */}
          <div className="bg-white rounded-lg shadow p-4">
            <h2 className="text-lg font-semibold mb-3 text-gray-900">
              Highlight Video
            </h2>
            <div className="aspect-video bg-gray-900 rounded flex items-center justify-center">
              {video?.highlight_url ? (
                <video
                  controls
                  className="w-full h-full"
                  src={video.highlight_url}
                >
                  Your browser does not support the video tag.
                </video>
              ) : (
                <p className="text-gray-400 text-sm">No video URL available</p>
              )}
            </div>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-4 bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
            {error}
          </div>
        )}

        {/* Highlights Section */}
        <div className="bg-white rounded-lg shadow">
          <div className="px-6 py-4 border-b border-gray-200">
            <h2 className="text-xl font-semibold text-gray-900">
              Highlights ({totalItems})
            </h2>
            <p className="mt-1 text-sm text-gray-500">
              Click on any highlight to view its frame scores
            </p>
          </div>

          <div className="p-6">
            {highlights.length === 0 ? (
              <p className="text-center text-gray-500 py-8">
                No highlights found for this video
              </p>
            ) : (
              <div className="space-y-2">
                {highlights.map((highlight) => (
                  <div
                    key={highlight.id}
                    className="border border-gray-200 rounded-lg overflow-hidden"
                  >
                    {/* Highlight Header */}
                    <button
                      onClick={() => toggleHighlight(highlight.id)}
                      className="w-full px-4 py-3 bg-gray-50 hover:bg-gray-100 text-left flex items-center justify-between transition-colors"
                    >
                      <div className="flex items-center gap-6">
                        <span className="font-medium text-gray-900">
                          Highlight #{highlight.id}
                        </span>
                        {highlight.duration !== null &&
                        highlight.vmaf_mean !== null ? (
                          <div className="flex gap-4 text-sm text-gray-600">
                            <span>
                              Duration: {highlight.duration.toFixed(2)}s
                            </span>
                            <span>
                              VMAF Mean: {highlight.vmaf_mean.toFixed(2)}
                            </span>
                            <span>Min: {highlight.vmaf_min!.toFixed(2)}</span>
                            <span>Max: {highlight.vmaf_max!.toFixed(2)}</span>
                          </div>
                        ) : (
                          <span className="text-sm text-yellow-600 font-medium">
                            ⏳ Processing...
                          </span>
                        )}
                      </div>
                      <svg
                        className={`w-5 h-5 text-gray-500 transition-transform ${
                          expandedHighlight === highlight.id
                            ? "transform rotate-180"
                            : ""
                        }`}
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M19 9l-7 7-7-7"
                        />
                      </svg>
                    </button>

                    {/* Frames Dropdown */}
                    {expandedHighlight === highlight.id && (
                      <div className="border-t border-gray-200">
                        <FramesList highlightId={highlight.id} />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            )}

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="mt-6 flex items-center justify-between">
                <button
                  onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                  disabled={currentPage === 1}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Previous
                </button>

                <span className="text-sm text-gray-700">
                  Page {currentPage} of {totalPages}
                </span>

                <button
                  onClick={() =>
                    setCurrentPage((p) => Math.min(totalPages, p + 1))
                  }
                  disabled={currentPage === totalPages}
                  className="px-4 py-2 border border-gray-300 rounded-md text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
