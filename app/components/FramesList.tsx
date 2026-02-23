"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { fetchFrames } from "@/lib/api";
import { Frame } from "@/lib/types";

interface FramesListProps {
  highlightId: number;
}

export default function FramesList({ highlightId }: FramesListProps) {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Pagination state
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [totalItems, setTotalItems] = useState(0);
  const [pageSize] = useState(10);

  useEffect(() => {
    loadFrames();
  }, [highlightId, currentPage]);

  const loadFrames = async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await fetchFrames(highlightId, {
        page: currentPage,
        size: pageSize,
        order_by: "frame_num",
        order_direction: "asc",
      });

      if (response.status === "success") {
        setFrames(response.data.items);
        setTotalPages(response.data.totalPages);
        setTotalItems(response.data.totalItems);
      } else {
        setError(response.message);
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to fetch frames");
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="p-6 flex justify-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-6">
        <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
          {error}
        </div>
      </div>
    );
  }

  if (frames.length === 0) {
    return (
      <div className="p-6 text-center text-gray-500">
        No frames have VMAF score below threshold. All frames are of high
        quality!
      </div>
    );
  }

  return (
    <div className="p-6 bg-gray-50">
      <div className="mb-4 text-sm text-gray-600">
        Total Frames: {totalItems} | Showing {frames.length} frames on page{" "}
        {currentPage} of {totalPages}
      </div>

      {/* Frames Grid */}
      <div className="space-y-6">
        {frames.map((frame) => (
          <div
            key={frame.id}
            className="bg-white rounded-lg border border-gray-200 p-4"
          >
            {/* Frame Info Header */}
            <div className="mb-4 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <span className="font-semibold text-gray-900">
                  Frame #{frame.frame_num}
                </span>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm font-medium">
                  VMAF: {frame.vmaf.toFixed(2)}
                </span>
              </div>
            </div>

            {/* Side by Side Images */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Original Frame */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Original Frame
                </h4>
                <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                  {frame.origin_url ? (
                    <Image
                      src={frame.origin_url}
                      alt={`Original Frame ${frame.frame_num}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No image available
                    </div>
                  )}
                </div>
              </div>

              {/* Highlight Frame */}
              <div>
                <h4 className="text-sm font-medium text-gray-700 mb-2">
                  Highlight Frame
                </h4>
                <div className="relative aspect-video bg-gray-100 rounded overflow-hidden">
                  {frame.highlight_url ? (
                    <Image
                      src={frame.highlight_url}
                      alt={`Highlight Frame ${frame.frame_num}`}
                      fill
                      className="object-contain"
                      sizes="(max-width: 768px) 100vw, 50vw"
                      unoptimized
                    />
                  ) : (
                    <div className="flex items-center justify-center h-full text-gray-400 text-sm">
                      No image available
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* VMAF Score Indicator */}
            <div className="mt-3">
              <div className="flex items-center gap-2 text-xs text-gray-600">
                <span>VMAF Score:</span>
                <div className="flex-1 bg-gray-200 rounded-full h-2 max-w-xs">
                  <div
                    className={`h-2 rounded-full ${
                      frame.vmaf >= 90
                        ? "bg-green-500"
                        : frame.vmaf >= 75
                          ? "bg-yellow-500"
                          : frame.vmaf >= 50
                            ? "bg-orange-500"
                            : "bg-red-500"
                    }`}
                    style={{ width: `${Math.min(frame.vmaf, 100)}%` }}
                  ></div>
                </div>
                <span className="font-medium">{frame.vmaf.toFixed(2)}/100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="mt-6 flex items-center justify-center gap-2">
          <button
            onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
            disabled={currentPage === 1}
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Previous
          </button>

          <span className="px-4 py-1 text-sm text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
            disabled={currentPage === totalPages}
            className="px-3 py-1 border border-gray-300 rounded text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
}
