import { useState, useEffect } from "react";
import { X, Heart, Star, ShoppingCart, Share2, Eye, EyeOff } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { useProduct } from "@/hooks/useApi";
import type { Product } from "@/lib/api";

interface ProductDetailsModalProps {
  productId: number | null;
  isOpen: boolean;
  onClose: () => void;
}

const ProductDetailsModal = ({ productId, isOpen, onClose }: ProductDetailsModalProps) => {
  const { data: product, isLoading } = useProduct(productId || 0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);

  // Reset image index when product changes
  useEffect(() => {
    setCurrentImageIndex(0);
  }, [productId]);

  // Handle escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener("keydown", handleEscape);
      document.body.style.overflow = "hidden";
    }

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [isOpen, onClose]);

  if (!isOpen || !productId) return null;

  const images = product?.images || [];
  const hasImages = images.length > 0;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/50 backdrop-blur-sm"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="relative w-full max-w-4xl mx-4 max-h-[90vh] overflow-hidden">
        <Card className="border-0 shadow-2xl bg-white animate-in fade-in-0 zoom-in-95 duration-300">
          <CardContent className="p-0">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="lg:w-1/2 relative">
                <div className="aspect-square bg-gradient-to-br from-gray-100 to-gray-200 relative overflow-hidden">
                  {hasImages ? (
                    <img
                      src={images[currentImageIndex]}
                      alt={product?.name || "Product"}
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="w-full h-full flex items-center justify-center text-6xl">
                      {product?.brand ? "📦" : "🛍️"}
                    </div>
                  )}
                  
                  {/* Image Navigation */}
                  {images.length > 1 && (
                    <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                      {images.map((_, index) => (
                        <button
                          key={index}
                          onClick={() => setCurrentImageIndex(index)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            index === currentImageIndex 
                              ? "bg-white shadow-lg" 
                              : "bg-white/50 hover:bg-white/75"
                          }`}
                        />
                      ))}
                    </div>
                  )}
                  
                  {/* Featured Badge */}
                  {product?.is_featured && (
                    <Badge className="absolute top-4 left-4 bg-red-500 text-white border-0">
                      Featured
                    </Badge>
                  )}
                </div>
              </div>

              {/* Content Section */}
              <div className="lg:w-1/2 p-6 space-y-6">
                {/* Header */}
                <div className="flex justify-between items-start">
                  <div className="flex-1">
                    <h2 className="text-2xl font-bold text-gray-900 mb-2">
                      {product?.name || "Loading..."}
                    </h2>
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline" className="text-sm">
                        {product?.condition || "N/A"}
                      </Badge>
                      {product?.brand && (
                        <Badge variant="secondary" className="text-sm">
                          {product.brand}
                        </Badge>
                      )}
                    </div>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={onClose}
                    className="text-gray-500 hover:text-gray-700"
                  >
                    <X className="w-5 h-5" />
                  </Button>
                </div>

                {/* Price and Rating */}
                <div className="space-y-3">
                  <div className="flex items-center gap-3">
                    <span className="text-3xl font-bold text-green-600">
                      ${product?.price || 0}
                    </span>
                    <div className="flex items-center gap-1">
                      <Star className="w-4 h-4 text-yellow-400 fill-current" />
                      <span className="text-sm text-gray-600">4.5 (12 reviews)</span>
                    </div>
                  </div>
                  
                  <div className="text-sm text-gray-600">
                    <span className="font-medium">Seller:</span> Seller #{product?.seller_id}
                  </div>
                </div>

                {/* Description */}
                {product?.description && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Description</h3>
                    <p className="text-gray-600 text-sm leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                )}

                {/* Specifications */}
                {product?.specifications && Object.keys(product.specifications).length > 0 && (
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Specifications</h3>
                    <div className="grid grid-cols-2 gap-2 text-sm">
                      {Object.entries(product.specifications).map(([key, value]) => (
                        <div key={key} className="flex justify-between">
                          <span className="text-gray-600 capitalize">{key}:</span>
                          <span className="font-medium">{String(value)}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Stock Info */}
                <div className="bg-gray-50 p-3 rounded-lg">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-gray-600">Stock Available:</span>
                    <span className={`font-medium ${product?.stock_quantity && product.stock_quantity > 0 ? 'text-green-600' : 'text-red-600'}`}>
                      {product?.stock_quantity || 0} units
                    </span>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="flex gap-3">
                  <Button className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700">
                    <ShoppingCart className="w-4 h-4 mr-2" />
                    Add to Cart
                  </Button>
                  <Button
                    variant="outline"
                    onClick={() => setIsWishlisted(!isWishlisted)}
                    className={isWishlisted ? "text-red-600 border-red-300" : ""}
                  >
                    {isWishlisted ? <Heart className="w-4 h-4 fill-current" /> : <Heart className="w-4 h-4" />}
                  </Button>
                  <Button variant="outline">
                    <Share2 className="w-4 h-4" />
                  </Button>
                </div>

                {/* AI Recommendation */}
                {product?.description && (
                  <div className="bg-blue-50 p-3 rounded-lg">
                    <div className="flex items-start gap-2">
                      <span className="text-blue-600">🤖</span>
                      <div className="text-sm">
                        <span className="font-medium text-blue-800">AI Recommendation:</span>
                        <p className="text-blue-700 mt-1">
                          {product.description.length > 150 
                            ? `${product.description.substring(0, 150)}...` 
                            : product.description}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default ProductDetailsModal; 