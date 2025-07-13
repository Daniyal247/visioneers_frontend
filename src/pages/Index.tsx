
import { useState, useEffect } from "react";
import { Upload, MessageCircle, Shield, Zap, Star, TrendingUp, Users, Bot, LogOut } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { toast } from "sonner";
import Hero from "@/components/Hero";
import SellerDashboard from "@/components/SellerDashboard";
import BuyerInterface from "@/components/BuyerInterface";
import TransactionCenter from "@/components/TransactionCenter";
import FeaturedProducts from "@/components/FeaturedProducts";
import StatsSection from "@/components/StatsSection";
import LoginModal from "@/components/LoginModal";
import { useAuth } from "@/hooks/useApi";

const Index = () => {
  const [activeTab, setActiveTab] = useState("seller");
  const [showLoginModal, setShowLoginModal] = useState(false);
  const { user, logout, isAuthenticated } = useAuth();

  // Auto-switch to appropriate tab based on user role
  useEffect(() => {
    console.log('Index Debug:', { isAuthenticated, user, userRole: user?.role, activeTab });
    if (isAuthenticated && user) {
      if (user.role === 'seller') {
        console.log('Switching to seller tab');
        setActiveTab('seller');
      } else if (user.role === 'buyer') {
        console.log('Switching to buyer tab');
        setActiveTab('buyer');
      }
    }
  }, [isAuthenticated, user]);

  const features = [
    {
      icon: Upload,
      title: "AI-Powered Listings",
      description: "Upload photos and let AI create perfect titles, descriptions, and pricing automatically",
      color: "bg-gradient-to-br from-purple-500 to-blue-600"
    },
    {
      icon: MessageCircle,
      title: "Smart Search Chat",
      description: "Natural language search - just tell our AI what you're looking for",
      color: "bg-gradient-to-br from-blue-500 to-cyan-600"
    },
    {
      icon: Shield,
      title: "AI Transaction Safety",
      description: "AI agents detect scams, manage escrow, and ensure secure transactions",
      color: "bg-gradient-to-br from-green-500 to-emerald-600"
    },
    {
      icon: Bot,
      title: "Automated Negotiation",
      description: "AI agents negotiate the best deals on your behalf automatically",
      color: "bg-gradient-to-br from-orange-500 to-red-500"
    }
  ];

  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-1/3 w-72 h-72 bg-gradient-to-r from-green-600/10 to-purple-600/10 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AgentMarket
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-8">
              <a href="#features" className="text-muted-foreground hover:text-foreground transition-colors">Features</a>
              <a href="#how-it-works" className="text-muted-foreground hover:text-foreground transition-colors">How it Works</a>
              <a href="#pricing" className="text-muted-foreground hover:text-foreground transition-colors">Pricing</a>
              
              {isAuthenticated ? (
                <div className="flex items-center space-x-4">
                  <div className="flex items-center space-x-2">
                    <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-medium">
                        {user?.username?.charAt(0).toUpperCase() || "U"}
                      </span>
                    </div>
                    <span className="text-sm font-medium text-foreground">
                      {user?.username || "User"}
                    </span>
                    <Badge variant="secondary" className="text-xs">
                      {user?.role}
                    </Badge>
                  </div>
                  <Button 
                    variant="outline" 
                    size="sm"
                    onClick={logout}
                    className="border-border bg-card/50 hover:bg-card"
                  >
                    <LogOut className="w-4 h-4 mr-2" />
                    Sign Out
                  </Button>
                </div>
              ) : (
                <>
                  <Button 
                    variant="outline" 
                    className="border-border bg-card/50 hover:bg-card"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Sign In
                  </Button>
                  <Button 
                    className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700"
                    onClick={() => setShowLoginModal(true)}
                  >
                    Get Started
                  </Button>
                </>
              )}
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10">
        {/* Hero Section */}
        <Hero />

        {/* Stats Section */}
        <StatsSection />

        {/* Features Section */}
        <section id="features" className="py-20 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-card/50 text-primary border-border">
                AI-Powered Features
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                Intelligent Marketplace Technology
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Our AI agents handle everything from creating listings to completing transactions, 
                making buying and selling effortless for everyone.
              </p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
              {features.map((feature, index) => (
                <Card key={index} className="border-border shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-card/50 backdrop-blur-sm">
                  <CardHeader className="text-center pb-4">
                    <div className={`w-12 h-12 ${feature.color} rounded-xl flex items-center justify-center mx-auto mb-4 shadow-lg`}>
                      <feature.icon className="w-6 h-6 text-white" />
                    </div>
                    <CardTitle className="text-lg text-foreground">{feature.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground text-center">{feature.description}</p>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 px-4 bg-card/20 relative">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <Badge variant="secondary" className="mb-4 bg-card/50 text-primary border-border">
                Experience the Future
              </Badge>
              <h2 className="text-4xl font-bold text-foreground mb-4">
                See AI Agents in Action
              </h2>
              <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
                Choose your perspective and explore how our AI makes the marketplace experience seamless
              </p>
            </div>

            {/* Tab Navigation */}
            <div className="flex justify-center mb-8">
              <div className="bg-card/50 backdrop-blur-sm p-1 rounded-xl border border-border">
                <button
                  onClick={() => setActiveTab("seller")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === "seller"
                      ? "bg-card shadow-md text-foreground border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  For Sellers
                </button>
                <button
                  onClick={() => setActiveTab("buyer")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === "buyer"
                      ? "bg-card shadow-md text-foreground border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  For Buyers
                </button>
                <button
                  onClick={() => setActiveTab("transactions")}
                  className={`px-6 py-3 rounded-lg transition-all ${
                    activeTab === "transactions"
                      ? "bg-card shadow-md text-foreground border border-border"
                      : "text-muted-foreground hover:text-foreground"
                  }`}
                >
                  AI Transactions
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="animate-fade-in">
              {activeTab === "seller" && <SellerDashboard />}
              {activeTab === "buyer" && <BuyerInterface />}
              {activeTab === "transactions" && <TransactionCenter />}
            </div>
          </div>
        </section>

        {/* Featured Products */}
        <FeaturedProducts />

        {/* CTA Section */}
        <section className="py-20 px-4 bg-gradient-to-r from-purple-600/20 via-blue-600/20 to-cyan-600/20 relative">
          <div className="absolute inset-0 bg-dot-pattern"></div>
          <div className="max-w-4xl mx-auto text-center relative z-10">
            <h2 className="text-4xl font-bold mb-6 text-foreground">
              Ready to Experience the Future of Commerce?
            </h2>
            <p className="text-xl mb-8 text-muted-foreground">
              Join thousands of users who are already using AI to buy and sell smarter
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button size="lg" className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-3" onClick={() => window.location.href = '/sell'}>
                Start Selling with AI
              </Button>
              <Button size="lg" variant="outline" className="border-border bg-card/50 hover:bg-card px-8 py-3" onClick={() => window.location.href = '/buy'}>
                Explore as Buyer
              </Button>
            </div>
          </div>
        </section>

        {/* Footer */}
        <footer className="bg-card/30 backdrop-blur-sm border-t border-border py-12 px-4 relative">
          <div className="max-w-7xl mx-auto">
            <div className="grid md:grid-cols-4 gap-8">
              <div>
                <div className="flex items-center space-x-2 mb-4">
                  <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                    <Bot className="w-5 h-5 text-white" />
                  </div>
                  <span className="text-xl font-bold text-foreground">AgentMarket</span>
                </div>
                <p className="text-muted-foreground">
                  The world's first AI-powered marketplace where intelligent agents handle everything.
                </p>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Platform</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">How it Works</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">AI Features</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Safety & Security</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">API</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Support</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">Help Center</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Contact Us</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Community</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Status</a></li>
                </ul>
              </div>
              
              <div>
                <h3 className="font-semibold mb-4 text-foreground">Company</h3>
                <ul className="space-y-2 text-muted-foreground">
                  <li><a href="#" className="hover:text-foreground transition-colors">About</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Blog</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Careers</a></li>
                  <li><a href="#" className="hover:text-foreground transition-colors">Press</a></li>
                </ul>
              </div>
            </div>
            
            <div className="border-t border-border mt-12 pt-8 text-center text-muted-foreground">
              <p>&copy; 2024 AgentMarket. All rights reserved. Built with AI, designed for the future.</p>
            </div>
          </div>
        </footer>
      </div>
      
      {/* Login Modal */}
      <LoginModal 
        isOpen={showLoginModal} 
        onClose={() => setShowLoginModal(false)} 
      />
    </div>
  );
};

export default Index;
