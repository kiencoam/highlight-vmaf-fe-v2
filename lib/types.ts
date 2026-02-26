// API Response Types
export interface ApiResponse<T> {
  code: number;
  status: "success" | "failed";
  message: string;
  data: T;
}

// Video Types
export interface Video {
  id: number;
  original_url: string;
  highlight_url: string;
  title: string;
  status: number;
}

export interface PaginatedResponse<T> {
  totalItems: number;
  totalPages: number;
  currentPage: number;
  items: T[];
}

// Highlight Types
export interface Highlight {
  id: number;
  video_id: number;
  vmaf_mean: number;
  vmaf_min: number;
  vmaf_max: number;
  duration: number;
}

// Frame Types
export interface Frame {
  id: number;
  highlight_id: number;
  frame_num: number;
  vmaf: number;
  origin_url: string;
  highlight_url: string;
}

// Query Parameters
export interface VideosQueryParams {
  page?: number;
  size?: number;
  order_by?: "id" | "title" | "status";
  order_direction?: "asc" | "desc";
  status_filter?: number;
  query?: string;
}

export interface HighlightsQueryParams {
  page?: number;
  size?: number;
  order_by?: string;
  order_direction?: "asc" | "desc";
}

export interface FramesQueryParams {
  page?: number;
  size?: number;
  order_by?: string;
  order_direction?: "asc" | "desc";
}

// Create Video Types
export interface CreateVideoRequest {
  original_url: string;
  highlight_url: string;
  title: string;
}

export interface CreateVideoResponse {
  id: number;
  original_url: string;
  highlight_url: string;
  title: string;
  status: number;
}

// Status mapping
export const VIDEO_STATUS: Record<number, string> = {
  0: "Downloading",
  1: "Processing",
  2: "Completed",
  "-1": "Failed",
};

export const STATUS_COLORS: Record<number, string> = {
  0: "bg-yellow-100 text-yellow-800",
  1: "bg-blue-100 text-blue-800",
  2: "bg-green-100 text-green-800",
  "-1": "bg-red-100 text-red-800",
};
