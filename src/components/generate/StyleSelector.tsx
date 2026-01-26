import { Check } from "lucide-react";

export type StyleType = "realistic" | "anime" | "3d-render" | "oil-painting" | "cinematic";

interface Style {
  id: StyleType;
  label: string;
  image: string;
}

const styles: Style[] = [
  {
    id: "realistic",
    label: "Realistic",
    image: "https://images.unsplash.com/photo-1472214103451-9374bd1c798e?w=200&h=150&fit=crop",
  },
  {
    id: "anime",
    label: "Anime",
    image: "https://images.unsplash.com/photo-1578632767115-351597cf2477?w=200&h=150&fit=crop",
  },
  {
    id: "3d-render",
    label: "3D Render",
    image: "https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=200&h=150&fit=crop",
  },
  {
    id: "oil-painting",
    label: "Oil Painting",
    image: "https://images.unsplash.com/photo-1579783902614-a3fb3927b6a5?w=200&h=150&fit=crop",
  },
  {
    id: "cinematic",
    label: "Cinematic",
    image: "https://images.unsplash.com/photo-1485846234645-a62644f84728?w=200&h=150&fit=crop",
  },
];

interface StyleSelectorProps {
  selected: StyleType;
  onSelect: (style: StyleType) => void;
}

export function StyleSelector({ selected, onSelect }: StyleSelectorProps) {
  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
          Art Style Selection
        </h3>
        <button className="text-xs text-genpix-cyan hover:underline">View All</button>
      </div>
      
      <div className="grid grid-cols-5 gap-3">
        {styles.map((style) => {
          const isSelected = selected === style.id;
          return (
            <button
              key={style.id}
              onClick={() => onSelect(style.id)}
              className={`style-card ${isSelected ? "selected" : ""}`}
            >
              <div className="aspect-[4/3] relative">
                <img
                  src={style.image}
                  alt={style.label}
                  className="w-full h-full object-cover rounded-lg"
                />
                {isSelected && (
                  <div className="absolute inset-0 bg-primary/20 rounded-lg flex items-center justify-center">
                    <div className="w-6 h-6 bg-primary rounded-full flex items-center justify-center">
                      <Check className="w-4 h-4 text-primary-foreground" />
                    </div>
                  </div>
                )}
              </div>
              <p className="text-xs text-center mt-2 text-foreground">{style.label}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
