import { User, Bell, Palette, CreditCard, Shield, HelpCircle } from "lucide-react";
import { MainLayout } from "@/components/layout/MainLayout";

const settingsSections = [
  {
    icon: User,
    title: "Account",
    description: "Manage your account settings and preferences",
  },
  {
    icon: Bell,
    title: "Notifications",
    description: "Configure notification preferences",
  },
  {
    icon: Palette,
    title: "Appearance",
    description: "Customize the look and feel of GenPix",
  },
  {
    icon: CreditCard,
    title: "Billing",
    description: "Manage your subscription and credits",
  },
  {
    icon: Shield,
    title: "Privacy & Security",
    description: "Control your privacy and security settings",
  },
  {
    icon: HelpCircle,
    title: "Help & Support",
    description: "Get help and access documentation",
  },
];

export default function SettingsPage() {
  return (
    <MainLayout>
      <div className="p-8 max-w-4xl mx-auto space-y-8">
        {/* Header */}
        <div>
          <h1 className="text-4xl font-bold font-display">Settings</h1>
          <p className="text-muted-foreground mt-2">
            Manage your account and preferences
          </p>
        </div>

        {/* Settings Grid */}
        <div className="grid grid-cols-2 gap-4">
          {settingsSections.map((section) => (
            <button
              key={section.title}
              className="genpix-card p-6 text-left hover:border-primary transition-colors"
            >
              <div className="flex items-start gap-4">
                <div className="p-3 bg-secondary rounded-lg">
                  <section.icon className="w-5 h-5 text-genpix-cyan" />
                </div>
                <div>
                  <h3 className="font-semibold">{section.title}</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    {section.description}
                  </p>
                </div>
              </div>
            </button>
          ))}
        </div>

        {/* Credits Section */}
        <div className="genpix-card p-6">
          <h3 className="text-lg font-semibold mb-4">Your Credits</h3>
          <div className="flex items-center justify-between">
            <div>
              <p className="text-3xl font-bold genpix-gradient-text">1,240</p>
              <p className="text-sm text-muted-foreground">Credits remaining</p>
            </div>
            <button className="px-6 py-3 bg-primary rounded-lg font-medium hover:bg-primary/90 transition-colors">
              Buy More Credits
            </button>
          </div>
          <div className="mt-4 h-2 bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full rounded-full"
              style={{
                width: "24.8%",
                background: "linear-gradient(90deg, hsl(var(--genpix-purple)), hsl(var(--genpix-cyan)))",
              }}
            />
          </div>
          <p className="text-xs text-muted-foreground mt-2">1,240 / 5,000 credits used this month</p>
        </div>
      </div>
    </MainLayout>
  );
}
