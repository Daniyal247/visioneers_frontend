
import { Heart, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

const FeaturedProducts = () => {
  const featuredProducts = [
    {
      id: 1,
      title: "Vintage Polaroid Camera",
      price: "$180",
      originalPrice: "$250",
      condition: "Excellent",
      seller: "VintageFinds",
      rating: 4.9,
      reviews: 127,
      aiScore: "98% authentic",
      trending: true,
      image: "📷"
    },
    {
      id: 2,
      title: "Designer Leather Jacket",
      price: "$320",
      originalPrice: "$450",
      condition: "Very Good",
      seller: "FashionHub",
      rating: 4.7,
      reviews: 89,
      aiScore: "Perfect fit prediction",
      trending: false,
      image: "🧥"
    },
    {
      id: 3,
      title: "Collectible Vinyl Records",
      price: "$125",
      originalPrice: "$180",
      condition: "Good",
      seller: "MusicCollector",
      rating: 4.8,
      reviews: 203,
      aiScore: "Rare edition verified",
      trending: true,
      image: "🎵"
    },
    {
      id: 4,
      title: "Gaming Mechanical Keyboard",
      price: "$95",
      originalPrice: "$140",
      condition: "Like New",
      seller: "TechGamer",
      rating: 4.6,
      reviews: 156,
      aiScore: "Performance optimized",
      trending: false,
      image: "⌨️"
    }
  ];

  return (
    <section className="py-20 px-4">
      <div className="max-w-7xl mx-auto">
        <div className="text-center mb-16">
          <Badge variant="secondary" className="mb-4 bg-green-100 text-green-700 border-green-200">
            AI-Curated Collection
          </Badge>
          <h2 className="text-4xl font-bold text-gray-900 mb-4">
            Trending Products
          </h2>
          <p className="text-xl text-gray-600 max-w-3xl mx-auto">
            Discover amazing deals on authenticated products, curated by AI based on quality, 
            authenticity, and market trends.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {featuredProducts.map((product) => (
            <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group">
              <CardContent className="p-0">
                <div className="relative">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl rounded-t-lg">
                    {product.image}
                  </div>
                  
                  {product.trending && (
                    <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
                      <TrendingUp className="w-3 h-3 mr-1" />
                      Trending
                    </Badge>
                  )}
                  
                  <Button
                    size="sm"
                    variant="outline"
                    className="absolute top-3 right-3 w-8 h-8 p-0 bg-white/80 backdrop-blur-sm border-white/40 opacity-0 group-hover:opacity-100 transition-opacity"
                  >
                    <Heart className="w-4 h-4" />
                  </Button>
                </div>

                <div className="p-4 space-y-3">
                  <div>
                    <h3 className="font-semibold text-gray-900 text-sm mb-1 line-clamp-2">
                      {product.title}
                    </h3>
                    <Badge variant="outline" className="text-xs">
                      {product.condition}
                    </Badge>
                  </div>

                  <div className="flex items-center gap-2">
                    <span className="font-bold text-lg text-green-600">{product.price}</span>
                    <span className="text-sm text-gray-500 line-through">{product.originalPrice}</span>
                  </div>

                  <div className="flex items-center justify-between text-xs text-gray-600">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 text-yellow-400 fill-current" />
                      <span>{product.rating}</span>
                      <span>({product.reviews})</span>
                    </div>
                    <span>by {product.seller}</span>
                  </div>

                  <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                    🤖 AI: {product.aiScore}
                  </div>

                  <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm">
                    View Details
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button size="lg" variant="outline" className="px-8">
            Explore All AI-Curated Products
          </Button>
        </div>
      </div>
    </section>
  );
};

export default FeaturedProducts;
