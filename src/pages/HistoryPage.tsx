import { useState } from "react";
import { Search, Filter, Clock, Heart, Zap, Layers, FolderOpen } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

const tabs = [
  { id: "all", label: "All Generations", icon: Layers },
  { id: "favorites", label: "Favorites", icon: Heart },
  { id: "upscaled", label: "Upscaled", icon: Zap },
  { id: "variations", label: "Variations", icon: Layers },
  { id: "collections", label: "Collections", icon: FolderOpen },
];

// Demo images for the history gallery
const demoImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "2", url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "3", url: "https://images.unsplash.com/photo-1518173946687-a4c036bc0a5c?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "4", url: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "5", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "6", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "7", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
  { id: "8", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=400&fit=crop", dimensions: "1024 × 1024" },
];

export default function HistoryPage() {
  const [activeTab, setActiveTab] = useState("all");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold font-display">Generation History</h1>
          <p className="text-muted-foreground mt-2">
            Manage, re-use, and refine your past AI masterpieces.
          </p>
        </div>

        {/* Search & Filters */}
        <div className="flex items-center gap-4">
          <div className="flex-1 relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search prompts, keywords or tags..."
              className="genpix-input w-full pl-12"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-lg text-sm hover:bg-secondary/80 transition-colors">
            <Clock className="w-4 h-4" />
            All Time
          </button>
          <button className="flex items-center gap-2 px-4 py-3 bg-secondary rounded-lg text-sm hover:bg-secondary/80 transition-colors">
            <Filter className="w-4 h-4" />
            Filters
          </button>
        </div>

        {/* Tabs */}
        <div className="flex items-center gap-2">
          {tabs.map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeTab === tab.id
                  ? "bg-genpix-cyan text-genpix-dark"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-4 gap-4">
          {demoImages.map((image) => (
            <div
              key={image.id}
              className="group relative aspect-square rounded-xl overflow-hidden cursor-pointer genpix-card"
            >
              <img
                src={image.url}
                alt=""
                className="w-full h-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute top-3 left-3 px-2 py-1 bg-black/50 backdrop-blur-sm rounded text-xs">
                {image.dimensions}
              </div>
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Load More */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors">
            Load More Generations
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
