
import { ArrowRight, Sparkles, Bot, Zap } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();
  return (
    <section className="relative py-20 px-4 overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0">
        <div className="absolute top-20 left-10 w-20 h-20 bg-purple-500/10 rounded-full opacity-60 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-blue-500/10 rounded-full opacity-60 animate-pulse" style={{animationDelay: '1s'}}></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-cyan-500/10 rounded-full opacity-60 animate-pulse" style={{animationDelay: '2s'}}></div>
      </div>

      <div className="max-w-7xl mx-auto relative">
        <div className="text-center">
          <Badge variant="secondary" className="mb-6 bg-gradient-to-r from-purple-500/10 to-blue-500/10 text-primary border-border px-4 py-2 backdrop-blur-sm">
            <Sparkles className="w-4 h-4 mr-2" />
            Powered by Advanced AI Agents
          </Badge>
          
          <h1 className="text-5xl md:text-7xl font-bold text-foreground mb-6 leading-tight">
            The Future of
            <span className="bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent block">
              Marketplace Trading
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-4xl mx-auto leading-relaxed">
            Where AI agents handle everything from creating perfect listings to negotiating deals and ensuring safe transactions. 
            Buy and sell smarter, not harder.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-16">
            <Button 
              size="lg" 
              className="bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 px-8 py-4 text-lg shadow-lg"
              onClick={() => navigate("/sell")}
            >
              Start Selling with AI
              <ArrowRight className="ml-2 w-5 h-5" />
            </Button>
            <Button 
              size="lg" 
              variant="outline"
              className="border-border bg-card/50 backdrop-blur-sm px-8 py-4 text-lg hover:bg-card"
              onClick={() => navigate("/buy")}
            >
              <Bot className="mr-2 w-5 h-5" />
              Try AI Shopping
            </Button>
          </div>

          {/* Feature Pills */}
          <div className="flex flex-wrap justify-center gap-4 mb-12 text-sm">
            <div className="bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border flex items-center">
              <Zap className="w-4 h-4 mr-2 text-yellow-400" />
              One-click AI listings
            </div>
            <div className="bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border flex items-center">
              <Bot className="w-4 h-4 mr-2 text-blue-400" />
              Smart price negotiation
            </div>
            <div className="bg-card/60 backdrop-blur-sm px-4 py-2 rounded-full border border-border flex items-center">
              <Sparkles className="w-4 h-4 mr-2 text-purple-400" />
              Scam-free transactions
            </div>
          </div>

          {/* Demo Video Placeholder
          <div className="bg-card/80 backdrop-blur-sm rounded-2xl border border-border shadow-2xl p-8 max-w-4xl mx-auto">
            <div className="aspect-video bg-gradient-to-br from-muted/50 to-muted/30 rounded-xl flex items-center justify-center relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-purple-500/5 to-blue-500/5"></div>
              <div className="text-center z-10">
                <div className="w-20 h-20 bg-gradient-to-r from-purple-600 to-blue-600 rounded-full flex items-center justify-center shadow-lg mb-4 mx-auto">
                  <div className="w-0 h-0 border-l-[12px] border-l-white border-t-[8px] border-t-transparent border-b-[8px] border-b-transparent ml-1"></div>
                </div>
                <p className="text-foreground font-medium">Watch AI Agents in Action</p>
                <p className="text-sm text-muted-foreground mt-1">See how our AI creates listings and finds deals automatically</p>
              </div>
            </div>
          </div> */}
        </div>
      </div>
    </section>
  );
};

export default Hero;
