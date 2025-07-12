
import { Users, ShoppingBag, Shield, TrendingUp } from "lucide-react";

const StatsSection = () => {
  const stats = [
    {
      icon: Users,
      value: "50K+",
      label: "Active Users",
      description: "Trust our AI marketplace"
    },
    {
      icon: ShoppingBag,
      value: "200K+",
      label: "AI-Generated Listings",
      description: "Created automatically"
    },
    {
      icon: Shield,
      value: "99.9%",
      label: "Transaction Safety",
      description: "AI-powered security"
    },
    {
      icon: TrendingUp,
      value: "$2M+",
      label: "Total Sales Volume",
      description: "Facilitated by AI agents"
    }
  ];

  return (
    <section className="py-16 px-4 bg-card/10 backdrop-blur-sm relative">
      <div className="max-w-7xl mx-auto">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {stats.map((stat, index) => (
            <div key={index} className="text-center">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-gradient-to-r from-purple-600 to-blue-600 rounded-xl mb-4 shadow-lg">
                <stat.icon className="w-6 h-6 text-white" />
              </div>
              <div className="text-3xl font-bold text-foreground mb-1">{stat.value}</div>
              <div className="text-lg font-semibold text-foreground mb-1">{stat.label}</div>
              <div className="text-sm text-muted-foreground">{stat.description}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default StatsSection;
