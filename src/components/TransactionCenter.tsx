
import { useState } from "react";
import { Shield, Bot, DollarSign, MessageSquare, CheckCircle, AlertTriangle } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";

const TransactionCenter = () => {
  const [activeTransaction, setActiveTransaction] = useState("negotiation");

  const mockTransactions = [
    {
      id: "TXN-001",
      product: "Vintage Nike Air Jordan 1",
      buyer: "Alex Chen",
      seller: "RetroSneakerStore",
      originalPrice: "$1,200",
      offerPrice: "$950",
      currentPrice: "$1,050",
      status: "negotiation",
      aiActivity: "AI agents are negotiating price based on market data",
      progress: 60
    },
    {
      id: "TXN-002",
      product: "MacBook Pro 2019",
      buyer: "Sarah Wilson",
      seller: "TechDeals Pro",
      originalPrice: "$800",
      finalPrice: "$720",
      status: "escrow",
      aiActivity: "Payment secured in AI escrow, authenticity verified",
      progress: 85
    },
    {
      id: "TXN-003",
      product: "Vintage Rolex Watch",
      buyer: "Mike Johnson",
      seller: "LuxuryTimepieces",
      originalPrice: "$3,500",
      status: "verification",
      aiActivity: "AI detecting potential authenticity issues",
      progress: 25,
      alert: true
    }
  ];

  const currentTransaction = mockTransactions.find(t => t.id === "TXN-001");

  return (
    <div className="grid lg:grid-cols-2 gap-8">
      {/* Transaction List */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Shield className="w-5 h-5 text-green-600" />
            Active AI Transactions
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {mockTransactions.map((transaction) => (
              <div
                key={transaction.id}
                className={`p-4 border rounded-lg cursor-pointer transition-all ${
                  activeTransaction === transaction.status
                    ? "border-blue-500 bg-blue-50"
                    : "border-gray-200 hover:border-gray-300"
                }`}
                onClick={() => setActiveTransaction(transaction.status)}
              >
                <div className="flex justify-between items-start mb-2">
                  <div>
                    <h3 className="font-medium text-gray-900 text-sm">{transaction.product}</h3>
                    <p className="text-xs text-gray-600">{transaction.id}</p>
                  </div>
                  <Badge
                    variant={transaction.alert ? "destructive" : "secondary"}
                    className={
                      transaction.status === "negotiation"
                        ? "bg-yellow-100 text-yellow-700"
                        : transaction.status === "escrow"
                        ? "bg-blue-100 text-blue-700"
                        : "bg-orange-100 text-orange-700"
                    }
                  >
                    {transaction.status === "negotiation" ? "Negotiating" : 
                     transaction.status === "escrow" ? "In Escrow" : "Verifying"}
                  </Badge>
                </div>
                
                <div className="mb-3">
                  <div className="flex justify-between text-xs text-gray-600 mb-1">
                    <span>Progress</span>
                    <span>{transaction.progress}%</span>
                  </div>
                  <Progress value={transaction.progress} className="h-2" />
                </div>
                
                <div className="flex items-center gap-2 text-xs">
                  <Bot className="w-3 h-3 text-blue-600" />
                  <span className="text-gray-600">{transaction.aiActivity}</span>
                </div>
                
                {transaction.alert && (
                  <div className="mt-2 flex items-center gap-2 text-xs text-red-600">
                    <AlertTriangle className="w-3 h-3" />
                    <span>Requires attention</span>
                  </div>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Detailed Transaction View */}
      <Card className="border-0 shadow-lg bg-white/80 backdrop-blur-sm">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <Bot className="w-5 h-5 text-purple-600" />
            AI Transaction Details
          </CardTitle>
        </CardHeader>
        <CardContent>
          {activeTransaction === "negotiation" && (
            <div className="space-y-6">
              <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-200">
                <div className="flex items-center gap-2 mb-2">
                  <MessageSquare className="w-4 h-4 text-yellow-600" />
                  <span className="font-medium text-yellow-800">AI Negotiation in Progress</span>
                </div>
                <p className="text-sm text-yellow-700">
                  Our AI agents are negotiating on your behalf using real-time market data and psychological pricing strategies.
                </p>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="p-3 bg-gray-50 rounded-lg">
                  <p className="text-xs text-gray-600">Original Price</p>
                  <p className="font-bold text-gray-900">$1,200</p>
                </div>
                <div className="p-3 bg-blue-50 rounded-lg">
                  <p className="text-xs text-blue-600">Current Offer</p>
                  <p className="font-bold text-blue-700">$1,050</p>
                </div>
                <div className="p-3 bg-green-50 rounded-lg">
                  <p className="text-xs text-green-600">Target Price</p>
                  <p className="font-bold text-green-700">$975</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">AI Negotiation Log</h4>
                <div className="space-y-2 text-sm">
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-blue-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-gray-600">AI analyzed 47 similar listings</p>
                      <p className="text-xs text-gray-400">2 minutes ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full mt-2"></div>
                    <div>
                      <p className="text-gray-600">Counter-offer sent: $1,050</p>
                      <p className="text-xs text-gray-400">1 minute ago</p>
                    </div>
                  </div>
                  <div className="flex items-start gap-2">
                    <div className="w-2 h-2 bg-yellow-500 rounded-full mt-2 animate-pulse"></div>
                    <div>
                      <p className="text-gray-600">Waiting for seller response...</p>
                      <p className="text-xs text-gray-400">Now</p>
                    </div>
                  </div>
                </div>
              </div>

              <Button className="w-full bg-green-600 hover:bg-green-700">
                <CheckCircle className="w-4 h-4 mr-2" />
                Accept Current Offer ($1,050)
              </Button>
            </div>
          )}

          {activeTransaction === "escrow" && (
            <div className="space-y-6">
              <div className="bg-blue-50 p-4 rounded-lg border border-blue-200">
                <div className="flex items-center gap-2 mb-2">
                  <Shield className="w-4 h-4 text-blue-600" />
                  <span className="font-medium text-blue-800">Secure AI Escrow Active</span>
                </div>
                <p className="text-sm text-blue-700">
                  Payment is safely held by our AI escrow system. Funds will be released automatically once delivery is confirmed.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-800">Payment Secured</p>
                  <p className="text-xs text-green-600">$720.00 in escrow</p>
                </div>
                <div className="text-center p-4 bg-green-50 rounded-lg">
                  <CheckCircle className="w-8 h-8 text-green-600 mx-auto mb-2" />
                  <p className="text-sm font-medium text-green-800">Item Verified</p>
                  <p className="text-xs text-green-600">Authenticity confirmed</p>
                </div>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">Shipping Status</h4>
                <div className="bg-gray-50 p-3 rounded-lg">
                  <p className="text-sm text-gray-700">Package in transit</p>
                  <p className="text-xs text-gray-500">Tracking: 1Z999AA1234567890</p>
                  <p className="text-xs text-gray-500">Expected delivery: Tomorrow</p>
                </div>
              </div>
            </div>
          )}

          {activeTransaction === "verification" && (
            <div className="space-y-6">
              <div className="bg-red-50 p-4 rounded-lg border border-red-200">
                <div className="flex items-center gap-2 mb-2">
                  <AlertTriangle className="w-4 h-4 text-red-600" />
                  <span className="font-medium text-red-800">AI Security Alert</span>
                </div>
                <p className="text-sm text-red-700">
                  Our AI has detected potential authenticity concerns. Transaction paused for manual review.
                </p>
              </div>

              <div className="space-y-3">
                <h4 className="font-medium text-gray-900">AI Analysis Results</h4>
                <div className="space-y-2">
                  <div className="flex justify-between items-center p-2 bg-yellow-50 rounded">
                    <span className="text-sm text-gray-700">Image authenticity</span>
                    <Badge variant="secondary" className="bg-yellow-100 text-yellow-700">Under Review</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-red-50 rounded">
                    <span className="text-sm text-gray-700">Price anomaly detected</span>
                    <Badge variant="destructive">⚠️ Flagged</Badge>
                  </div>
                  <div className="flex justify-between items-center p-2 bg-green-50 rounded">
                    <span className="text-sm text-gray-700">Seller reputation</span>
                    <Badge className="bg-green-100 text-green-700">✓ Verified</Badge>
                  </div>
                </div>
              </div>

              <div className="flex gap-2">
                <Button variant="outline" className="flex-1">
                  Request Expert Review
                </Button>
                <Button variant="destructive" className="flex-1">
                  Cancel Transaction
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default TransactionCenter;
