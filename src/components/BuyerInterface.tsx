
import { useState } from "react";
import { MessageCircle, Search, Heart, Star, Filter, Bot } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";

const BuyerInterface = () => {
  const [chatMessages, setChatMessages] = useState([
    {
      type: "ai",
      message: "Hi! I'm your AI shopping assistant. What are you looking for today?",
      timestamp: "Just now"
    }
  ]);
  const [inputMessage, setInputMessage] = useState("");
  const [showResults, setShowResults] = useState(false);

  const handleSendMessage = () => {
    if (!inputMessage.trim()) return;

    setChatMessages(prev => [
      ...prev,
      { type: "user", message: inputMessage, timestamp: "Just now" }
    ]);

    // Simulate AI response
    setTimeout(() => {
      setChatMessages(prev => [
        ...prev,
        {
          type: "ai",
          message: "Perfect! I found several vintage sneakers under $100 that match your style. Based on your preferences and browsing history, here are my top recommendations:",
          timestamp: "Just now"
        }
      ]);
      setShowResults(true);
    }, 1000);

    setInputMessage("");
  };

  const mockProducts = [
    {
      id: 1,
      title: "Vintage Adidas Gazelle - Blue",
      price: "$85",
      originalPrice: "$120",
      condition: "Very Good",
      seller: "RetroKicks",
      rating: 4.8,
      image: "/api/placeholder/200/200",
      match: "95% match",
      aiNote: "Perfect size match, loved by buyers with similar taste"
    },
    {
      id: 2,
      title: "Classic Vans Old Skool - Black",
      price: "$65",
      originalPrice: "$95",
      condition: "Good",
      seller: "SneakerVault",
      rating: 4.6,
      image: "/api/placeholder/200/200",
      match: "89% match",
      aiNote: "Great condition, trending in your area"
    },
    {
      id: 3,
      title: "Retro Converse Chuck 70",
      price: "$78",
      originalPrice: "$110",
      condition: "Excellent",
      seller: "VintageFinds",
      rating: 4.9,
      image: "/api/placeholder/200/200",
      match: "92% match",
      aiNote: "Authenticated vintage, rare colorway"
    }
  ];

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Chat Interface */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-blue-600" />
            AI Shopping Assistant
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="h-80 overflow-y-auto mb-4 space-y-4 p-4 bg-gray-50 rounded-lg">
            {chatMessages.map((msg, index) => (
              <div
                key={index}
                className={`flex ${msg.type === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-xs px-4 py-2 rounded-lg ${
                    msg.type === "user"
                      ? "bg-blue-600 text-white"
                      : "bg-white border shadow-sm"
                  }`}
                >
                  <p className="text-sm">{msg.message}</p>
                  <p className={`text-xs mt-1 ${msg.type === "user" ? "text-blue-100" : "text-gray-500"}`}>
                    {msg.timestamp}
                  </p>
                </div>
              </div>
            ))}
          </div>

          <div className="flex gap-2">
            <Input
              placeholder="Try: 'I'm looking for vintage sneakers under $100'"
              value={inputMessage}
              onChange={(e) => setInputMessage(e.target.value)}
              onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
              className="flex-1"
            />
            <Button onClick={handleSendMessage} className="bg-blue-600 hover:bg-blue-700">
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>

          <div className="mt-4 flex flex-wrap gap-2">
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Vintage sneakers under $100
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Winter jackets size M
            </Badge>
            <Badge variant="outline" className="cursor-pointer hover:bg-gray-100">
              Vintage cameras
            </Badge>
          </div>
        </CardContent>
      </Card>

      {/* AI Search Results */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Search className="w-5 h-5 text-purple-600" />
            AI-Curated Results
            {showResults && (
              <Badge className="bg-purple-100 text-purple-700 border-purple-200">
                3 perfect matches found
              </Badge>
            )}
          </CardTitle>
        </CardHeader>
        <CardContent>
          {!showResults ? (
            <div className="text-center py-8 text-gray-500">
              <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
              <p>Start chatting to see personalized recommendations!</p>
            </div>
          ) : (
            <div className="space-y-4 max-h-96 overflow-y-auto">
              {mockProducts.map((product) => (
                <div key={product.id} className="border rounded-lg p-4 hover:shadow-md transition-all bg-white">
                  <div className="flex gap-4">
                    <div className="w-16 h-16 bg-gray-200 rounded-lg flex items-center justify-center">
                      <Search className="w-6 h-6 text-gray-400" />
                    </div>
                    
                    <div className="flex-1">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-medium text-gray-900 text-sm">{product.title}</h3>
                        <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs">
                          {product.match}
                        </Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="font-bold text-green-600">{product.price}</span>
                        <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                        <Badge variant="outline" className="text-xs">{product.condition}</Badge>
                      </div>
                      
                      <div className="flex items-center gap-2 mb-2">
                        <span className="text-sm text-gray-600">by {product.seller}</span>
                        <div className="flex items-center">
                          <Star className="w-3 h-3 text-yellow-400 fill-current" />
                          <span className="text-xs text-gray-600">{product.rating}</span>
                        </div>
                      </div>
                      
                      <p className="text-xs text-blue-600 bg-blue-50 p-2 rounded">
                        🤖 {product.aiNote}
                      </p>
                      
                      <div className="flex gap-2 mt-3">
                        <Button size="sm" className="flex-1 bg-purple-600 hover:bg-purple-700">
                          View Details
                        </Button>
                        <Button size="sm" variant="outline">
                          <Heart className="w-3 h-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default BuyerInterface;
