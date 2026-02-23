import { Suspense } from "react";
import VideosList from "./components/VideosList";

export default function Home() {
  return (
    <div className="min-h-screen bg-gray-50">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            Highlight VMAF Evaluation
          </h1>
        </div>
      </header>
      <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
        <Suspense fallback={<div className="text-center py-8">Loading...</div>}>
          <VideosList />
        </Suspense>
      </main>
    </div>
  );
}
