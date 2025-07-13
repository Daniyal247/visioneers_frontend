
import { Heart, Star, TrendingUp } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useFeaturedProducts } from "@/hooks/useApi";
import type { Product } from "@/lib/api";

const FeaturedProducts = () => {
  const { data: featuredProducts, isLoading, error } = useFeaturedProducts();

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
          {isLoading ? (
            // Loading skeleton
            Array.from({ length: 4 }).map((_, index) => (
              <Card key={index} className="border-0 shadow-lg bg-white">
                <CardContent className="p-0">
                  <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 animate-pulse rounded-t-lg"></div>
                  <div className="p-4 space-y-3">
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-6 bg-gray-200 rounded animate-pulse"></div>
                    <div className="h-4 bg-gray-200 rounded animate-pulse"></div>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : error ? (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">Failed to load featured products</p>
            </div>
          ) : featuredProducts && featuredProducts.length > 0 ? (
            featuredProducts.map((product: Product) => (
              <Card key={product.id} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 hover:-translate-y-1 bg-white group">
                <CardContent className="p-0">
                  <div className="relative">
                    <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 flex items-center justify-center text-6xl rounded-t-lg">
                      {product.brand ? "📦" : "🛍️"}
                    </div>
                    
                    {product.is_featured && (
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white border-0">
                        <TrendingUp className="w-3 h-3 mr-1" />
                        Featured
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
                        {product.name}
                      </h3>
                      <Badge variant="outline" className="text-xs">
                        {product.condition}
                      </Badge>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-bold text-lg text-green-600">${product.price}</span>
                      {product.brand && (
                        <span className="text-xs text-gray-500">• {product.brand}</span>
                      )}
                    </div>

                    <div className="flex items-center justify-between text-xs text-gray-600">
                      <div className="flex items-center gap-1">
                        <Star className="w-3 h-3 text-yellow-400 fill-current" />
                        <span>4.5</span>
                        <span>(12)</span>
                      </div>
                      <span>by Seller #{product.seller_id}</span>
                    </div>

                    <div className="bg-blue-50 p-2 rounded text-xs text-blue-700">
                      🤖 AI: {product.description.substring(0, 50)}...
                    </div>

                    <Button className="w-full bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-sm">
                      View Details
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))
          ) : (
            <div className="col-span-full text-center py-8">
              <p className="text-gray-500">No featured products available</p>
            </div>
          )}
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
