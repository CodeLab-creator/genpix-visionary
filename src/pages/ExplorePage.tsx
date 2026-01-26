import { useState } from "react";
import { Filter, TrendingUp, Search } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

const categories = [
  "All Artwork",
  "Cyberpunk",
  "Portrait",
  "Architecture",
  "Abstract",
  "Sci-Fi",
  "Landscape",
  "3D Render",
  "Minimalist",
];

const exploreImages = [
  { id: "1", url: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=400&h=500&fit=crop" },
  { id: "2", url: "https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=400&h=400&fit=crop" },
  { id: "3", url: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=400&h=500&fit=crop" },
  { id: "4", url: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=400&h=300&fit=crop" },
  { id: "5", url: "https://images.unsplash.com/photo-1534447677768-be436bb09401?w=400&h=400&fit=crop" },
  { id: "6", url: "https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=400&h=500&fit=crop" },
  { id: "7", url: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=400&h=400&fit=crop" },
  { id: "8", url: "https://images.unsplash.com/photo-1614730321146-b6fa6a46bcb4?w=400&h=500&fit=crop" },
];

export default function ExplorePage() {
  const [activeCategory, setActiveCategory] = useState("All Artwork");
  const [searchQuery, setSearchQuery] = useState("");

  return (
    <MainLayout>
      <div className="p-8 max-w-6xl mx-auto space-y-8">
        {/* Header */}
        <div className="flex items-start justify-between">
          <div>
            <h1 className="text-4xl font-bold font-display italic">
              COMMUNITY <span className="genpix-gradient-text">EXPLORE</span>
            </h1>
            <p className="text-muted-foreground mt-2 max-w-md">
              Uncover the frontier of digital imagination. Every image below was crafted using the GenPix model ecosystem.
            </p>
          </div>
          <div className="flex items-center gap-3">
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
              <Filter className="w-4 h-4" />
              Filters
            </button>
            <button className="flex items-center gap-2 px-4 py-2 bg-secondary rounded-lg text-sm">
              <TrendingUp className="w-4 h-4" />
              Trending
            </button>
          </div>
        </div>

        {/* Search Bar */}
        <div className="relative">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-muted-foreground" />
          <input
            type="text"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            placeholder="Search prompts, styles, or artists..."
            className="genpix-input w-full pl-12"
          />
        </div>

        {/* Categories */}
        <div className="flex items-center gap-2 flex-wrap">
          {categories.map((category) => (
            <button
              key={category}
              onClick={() => setActiveCategory(category)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-colors ${
                activeCategory === category
                  ? "bg-genpix-cyan text-genpix-dark"
                  : "bg-secondary text-muted-foreground hover:text-foreground"
              }`}
            >
              {category}
            </button>
          ))}
        </div>

        {/* Masonry Gallery */}
        <div className="columns-4 gap-4 space-y-4">
          {exploreImages.map((image) => (
            <div
              key={image.id}
              className="break-inside-avoid group relative rounded-xl overflow-hidden cursor-pointer"
            >
              <img
                src={image.url}
                alt=""
                className="w-full object-cover transition-transform duration-300 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
            </div>
          ))}
        </div>

        {/* Discover More */}
        <div className="flex justify-center">
          <button className="px-6 py-3 bg-secondary rounded-full text-sm font-medium hover:bg-secondary/80 transition-colors">
            Discover More Masterpieces
          </button>
        </div>

        {/* Footer */}
        <footer className="pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>© 2024 GENPIX AI STUDIOS</p>
          <div className="flex items-center justify-center gap-4 mt-2">
            <a href="#" className="hover:text-foreground transition-colors">Terms of Service</a>
            <a href="#" className="hover:text-foreground transition-colors">Privacy Policy</a>
          </div>
        </footer>
      </div>
    </MainLayout>
  );
}
