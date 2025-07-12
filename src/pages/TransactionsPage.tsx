import TransactionCenter from "@/components/TransactionCenter";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Bot } from "lucide-react";
import { Link } from "react-router-dom";

const TransactionsPage = () => {
  return (
    <div className="min-h-screen bg-background relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-grid-pattern"></div>
      <div className="absolute inset-0 bg-gradient-radial"></div>
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-gradient-to-r from-purple-600/10 to-blue-600/10 rounded-full blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-80 h-80 bg-gradient-to-r from-blue-600/10 to-cyan-600/10 rounded-full blur-3xl"></div>

      {/* Navigation */}
      <nav className="bg-card/80 backdrop-blur-md border-b border-border sticky top-0 z-50 relative">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <Link to="/" className="flex items-center space-x-2 text-muted-foreground hover:text-foreground transition-colors">
                <ArrowLeft className="w-4 h-4" />
                <span>Back to Home</span>
              </Link>
              <div className="w-8 h-8 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg flex items-center justify-center">
                <Bot className="w-5 h-5 text-white" />
              </div>
              <span className="text-xl font-bold bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
                AgentMarket - Transactions
              </span>
            </div>
            
            <div className="hidden md:flex items-center space-x-4">
              <Link to="/sell">
                <Button variant="outline" className="border-border bg-card/50 hover:bg-card">
                  Sell
                </Button>
              </Link>
              <Link to="/buy">
                <Button variant="outline" className="border-border bg-card/50 hover:bg-card">
                  Buy
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </nav>

      <div className="relative z-10 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl font-bold text-foreground mb-4">
              AI Transaction Management
            </h1>
            <p className="text-xl text-muted-foreground max-w-3xl mx-auto">
              Secure, automated transactions powered by intelligent AI agents
            </p>
          </div>
          
          <TransactionCenter />
        </div>
      </div>
    </div>
  );
};

export default TransactionsPage;