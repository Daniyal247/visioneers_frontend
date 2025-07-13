import { useState, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { apiClient, WebSocketClient } from '@/lib/api';
import type { 
  ChatMessage, 
  Product, 
  Category, 
  User, 
  Conversation, 
  ImageAnalysisResult 
} from '@/lib/api';

// Custom hook for WebSocket chat
export const useWebSocketChat = (sessionId: string) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isConnected, setIsConnected] = useState(false);
  const [wsClient, setWsClient] = useState<WebSocketClient | null>(null);

  const connect = useCallback(() => {
    const client = new WebSocketClient(sessionId);
    
    client.connect(
      (data) => {
        setMessages(prev => [...prev, data]);
      },
      (error) => {
        console.error('WebSocket error:', error);
        setIsConnected(false);
      }
    );

    setIsConnected(true);
    setWsClient(client);
  }, [sessionId]);

  const sendMessage = useCallback((message: string) => {
    if (wsClient) {
      wsClient.sendMessage(message);
    }
  }, [wsClient]);

  const disconnect = useCallback(() => {
    if (wsClient) {
      wsClient.disconnect();
      setIsConnected(false);
      setWsClient(null);
    }
  }, [wsClient]);

  return {
    messages,
    isConnected,
    connect,
    sendMessage,
    disconnect,
  };
};

// Authentication hooks
export const useLogin = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ email, password }: { email: string; password: string }) =>
      apiClient.login(email, password),
    onSuccess: (data) => {
      // Store token in localStorage
      localStorage.setItem('access_token', data.access_token);
      localStorage.setItem('user', JSON.stringify(data.user));
      
      // Invalidate and refetch user data
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

export const useRegister = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (userData: {
      email: string;
      username: string;
      password: string;
      full_name: string;
      role: 'buyer' | 'seller';
    }) => apiClient.register(userData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['user'] });
    },
  });
};

// Product hooks
export const useProducts = (params?: {
  search?: string;
  category?: number;
  min_price?: number;
  max_price?: number;
  brand?: string;
  condition?: string;
  page?: number;
  limit?: number;
}) => {
  return useQuery({
    queryKey: ['products', params],
    queryFn: () => apiClient.getProducts(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

export const useProduct = (id: number) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => apiClient.getProduct(id),
    enabled: !!id,
  });
};

export const useFeaturedProducts = () => {
  return useQuery({
    queryKey: ['featured-products'],
    queryFn: () => apiClient.getFeaturedProducts(),
    staleTime: 10 * 60 * 1000, // 10 minutes
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: () => apiClient.getCategories(),
    staleTime: 30 * 60 * 1000, // 30 minutes
  });
};

// AI Agent hooks
export const useChatMessage = () => {
  return useMutation({
    mutationFn: (message: ChatMessage) => apiClient.sendChatMessage(message),
  });
};

export const useVoiceMessage = () => {
  return useMutation({
    mutationFn: ({ audioFile, sessionId }: { audioFile: File; sessionId: string }) =>
      apiClient.sendVoiceMessage(audioFile, sessionId),
  });
};

export const useIntentAnalysis = () => {
  return useMutation({
    mutationFn: (message: string) => apiClient.analyzeIntent(message),
  });
};

export const useProductSuggestions = () => {
  return useMutation({
    mutationFn: (criteria: {
      search_query?: string;
      category?: number;
      price_range?: { min: number; max: number };
      user_preferences?: string[];
    }) => apiClient.getProductSuggestions(criteria),
  });
};

// Seller hooks
export const useImageAnalysis = () => {
  return useMutation({
    mutationFn: (imageFile: File) => apiClient.analyzeImage(imageFile),
  });
};

export const useCreateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (productData: Partial<Product>) => apiClient.createProduct(productData),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useUpdateProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ id, data }: { id: number; data: Partial<Product> }) =>
      apiClient.updateProduct(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: ['product', id] });
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useDeleteProduct = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (id: number) => apiClient.deleteProduct(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
      queryClient.invalidateQueries({ queryKey: ['products'] });
    },
  });
};

export const useSellerProducts = () => {
  return useQuery({
    queryKey: ['seller-products'],
    queryFn: () => apiClient.getSellerProducts(),
  });
};

export const useVoicePriceUpdate = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: ({ audioFile, productId }: { audioFile: File; productId: number }) =>
      apiClient.updatePriceWithVoice(audioFile, productId),
    onSuccess: (_, { productId }) => {
      queryClient.invalidateQueries({ queryKey: ['product', productId] });
      queryClient.invalidateQueries({ queryKey: ['seller-products'] });
    },
  });
};

export const useSellerAnalytics = () => {
  return useQuery({
    queryKey: ['seller-analytics'],
    queryFn: () => apiClient.getSellerAnalytics(),
    staleTime: 5 * 60 * 1000, // 5 minutes
  });
};

// Conversation hooks
export const useConversationHistory = (userId: number) => {
  return useQuery({
    queryKey: ['conversations', userId],
    queryFn: () => apiClient.getConversationHistory(userId),
    enabled: !!userId,
  });
};

export const useConversation = (sessionId: string) => {
  return useQuery({
    queryKey: ['conversation', sessionId],
    queryFn: () => apiClient.getConversation(sessionId),
    enabled: !!sessionId,
  });
};

// Health check hook
export const useHealthCheck = () => {
  return useQuery({
    queryKey: ['health'],
    queryFn: () => apiClient.healthCheck(),
    refetchInterval: 30 * 1000, // Check every 30 seconds
    retry: 3,
  });
};

// Custom hook for managing authentication state
export const useAuth = () => {
  const [user, setUser] = useState<User | null>(() => {
    const storedUser = localStorage.getItem('user');
    return storedUser ? JSON.parse(storedUser) : null;
  });

  const login = useCallback((userData: User) => {
    setUser(userData);
    localStorage.setItem('user', JSON.stringify(userData));
  }, []);

  const logout = useCallback(() => {
    setUser(null);
    localStorage.removeItem('user');
    localStorage.removeItem('access_token');
  }, []);

  const isAuthenticated = !!user;

  return {
    user,
    login,
    logout,
    isAuthenticated,
  };
};

// Custom hook for managing session
export const useSession = () => {
  const [sessionId, setSessionId] = useState<string>(() => {
    const stored = localStorage.getItem('session_id');
    return stored || `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
  });

  const updateSessionId = useCallback((newSessionId: string) => {
    setSessionId(newSessionId);
    localStorage.setItem('session_id', newSessionId);
  }, []);

  return {
    sessionId,
    updateSessionId,
  };
}; 