import {
  ApiResponse,
  PaginatedResponse,
  Video,
  Highlight,
  Frame,
  VideosQueryParams,
  HighlightsQueryParams,
  FramesQueryParams,
  CreateVideoRequest,
  CreateVideoResponse,
} from "./types";

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_BASE_URL || "https://audio3.tivi360.vn/api/v1";

// Helper function to build query string
function buildQueryString(params: Record<string, any>): string {
  const searchParams = new URLSearchParams();
  Object.keys(params).forEach((key) => {
    if (
      params[key] !== undefined &&
      params[key] !== null &&
      params[key] !== ""
    ) {
      searchParams.append(key, params[key].toString());
    }
  });
  return searchParams.toString();
}

// Fetch videos list
export async function fetchVideos(
  params: VideosQueryParams = {},
): Promise<ApiResponse<PaginatedResponse<Video>>> {
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}/videos${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch videos: ${response.statusText}`);
  }

  return response.json();
}

// Fetch video by ID
export async function fetchVideoById(videoId: number): Promise<Video | null> {
  try {
    // The API doesn't have a dedicated endpoint for single video
    // So we'll search for it in the list
    const response = await fetchVideos({ page: 1, size: 100 });
    if (response.status === "success") {
      const video = response.data.items.find((v) => v.id === videoId);
      return video || null;
    }
    return null;
  } catch (error) {
    console.error("Error fetching video:", error);
    return null;
  }
}

// Fetch highlights for a video
export async function fetchHighlights(
  videoId: number,
  params: HighlightsQueryParams = {},
): Promise<ApiResponse<PaginatedResponse<Highlight>>> {
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}/videos/${videoId}/highlights${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch highlights: ${response.statusText}`);
  }

  return response.json();
}

// Fetch frames for a highlight
export async function fetchFrames(
  highlightId: number,
  params: FramesQueryParams = {},
): Promise<ApiResponse<PaginatedResponse<Frame>>> {
  const queryString = buildQueryString(params);
  const url = `${API_BASE_URL}/highlights/${highlightId}/frames${queryString ? `?${queryString}` : ""}`;

  const response = await fetch(url, {
    cache: "no-store",
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch frames: ${response.statusText}`);
  }

  return response.json();
}

// Create a new video job
export async function createVideo(
  data: CreateVideoRequest,
): Promise<ApiResponse<CreateVideoResponse>> {
  const url = `${API_BASE_URL}/videos`;

  const response = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  if (!response.ok) {
    throw new Error(`Failed to create video: ${response.statusText}`);
  }

  return response.json();
}
