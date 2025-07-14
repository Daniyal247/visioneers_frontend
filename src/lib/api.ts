// API Configuration
const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:8000';

// Types
export interface ChatMessage {
  id?: string;
  message: string;
  session_id: string;
  timestamp?: string;
  type?: 'user' | 'ai';
}

export interface Product {
  id: number;
  name: string;
  description: string;
  price: number;
  stock_quantity: number;
  category_id: number;
  seller_id: number;
  brand?: string;
  model?: string;
  condition: string;
  specifications?: Record<string, any>;
  tags?: string[];
  images?: string[];
  is_active: boolean;
  is_featured: boolean;
  created_at?: string;
  updated_at?: string;
}

export interface Category {
  id: number;
  name: string;
  description?: string;
}

export interface User {
  id: number;
  email: string;
  username: string;
  full_name: string;
  role: 'buyer' | 'seller' | 'admin';
  is_active: boolean;
  is_verified: boolean;
}

export interface Conversation {
  id: string;
  user_id: number;
  session_id: string;
  title: string;
  created_at: string;
  updated_at: string;
  messages: ChatMessage[];
}

export interface ImageAnalysisResult {
  title: string;
  description: string;
  condition: string;
  suggested_price: number;
  category: string;
  estimated_value: string;
  specifications: Record<string, any>;
  tags: string[];
}

export interface BackendImageAnalysisResponse {
  success: boolean;
  suggested_product: {
    name: string;
    description: string;
    suggested_price: number;
    brand: string;
    model: string;
    specifications: Record<string, any>;
    suggested_category: string;
    confidence_score: number;
  };
  message: string;
}

export interface VoiceMessage {
  audio_file: File;
  session_id: string;
}

// API Client
class ApiClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseURL}${endpoint}`;
    
    // Get auth token from localStorage
    const token = localStorage.getItem('access_token');
    
    const config: RequestInit = {
      headers: {
        'Content-Type': 'application/json',
        ...(token && { 'Authorization': `Bearer ${token}` }),
        ...options.headers,
      },
      ...options,
    };

    try {
      const response = await fetch(url, config);
      
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
      
      return await response.json();
    } catch (error) {
      console.error('API request failed:', error);
      throw error;
    }
  }

  // Authentication
  async login(email: string, password: string) {
    const formData = new FormData();
    formData.append('username', email);
    formData.append('password', password);

    const response = await fetch(`${this.baseURL}/api/v1/auth/login`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Login failed');
    }

    return await response.json();
  }

  async register(userData: {
    email: string;
    username: string;
    password: string;
    full_name: string;
    role: 'buyer' | 'seller';
  }) {
    return this.request('/api/v1/auth/register', {
      method: 'POST',
      body: JSON.stringify(userData),
    });
  }

  // AI Agent Chat
  async sendChatMessage(message: ChatMessage) {
    return this.request<{ response: string; intent: string; suggestions?: string[] }>('/api/v1/agent/chat', {
      method: 'POST',
      body: JSON.stringify(message),
    });
  }

  async sendVoiceMessage(audioFile: File, sessionId: string) {
    const formData = new FormData();
    formData.append('audio_file', audioFile);
    formData.append('session_id', sessionId);

    const response = await fetch(`${this.baseURL}/api/v1/agent/voice`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Voice message failed');
    }

    return await response.json();
  }

  // Products
  async getProducts(params?: {
    search?: string;
    category?: number;
    min_price?: number;
    max_price?: number;
    brand?: string;
    condition?: string;
    page?: number;
    limit?: number;
  }) {
    const searchParams = new URLSearchParams();
    if (params) {
      Object.entries(params).forEach(([key, value]) => {
        if (value !== undefined) {
          searchParams.append(key, value.toString());
        }
      });
    }

    const response = await this.request<{ success: boolean; products: Product[]; total_found: number }>(`/api/v1/products?${searchParams.toString()}`);
    return response.products;
  }

  async getProduct(id: number) {
    const response = await this.request<{ success: boolean; product: Product }>(`/api/v1/products/${id}`);
    return response.product;
  }

  async getFeaturedProducts() {
    const response = await this.request<{ success: boolean; products: Product[]; total_found: number }>('/api/v1/products/featured');
    return response.products;
  }

  async getCategories() {
    const response = await this.request<{ success: boolean; categories: Category[] }>('/api/v1/products/categories');
    return response.categories;
  }

  // Seller APIs
  async analyzeImage(imageFile: File) {
    // Get user from localStorage to get seller_id
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user || user.role !== 'seller') {
      throw new Error('Only sellers can analyze images');
    }
    
    const formData = new FormData();
    formData.append('image', imageFile);
    formData.append('seller_id', user.id.toString());

    const response = await fetch(`${this.baseURL}/api/v1/seller/analyze-image`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Image analysis failed');
    }

    return await response.json() as ImageAnalysisResult;
  }

  async createProduct(productData: Partial<Product>) {
    // Get user from localStorage to get seller_id
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user || user.role !== 'seller') {
      throw new Error('Only sellers can create products');
    }
    
    // Remove seller_id from productData if it exists, as it's passed as query parameter
    const { seller_id, ...cleanProductData } = productData;
    
    console.log("API Client - Creating product:", {
      url: `/api/v1/seller/products?seller_id=${user.id}`,
      user: user,
      productData: cleanProductData
    });
    
    return this.request<Product>(`/api/v1/seller/products?seller_id=${user.id}`, {
      method: 'POST',
      body: JSON.stringify(cleanProductData),
    });
  }

  async updateProduct(id: number, productData: Partial<Product>) {
    return this.request<Product>(`/api/v1/seller/products/${id}`, {
      method: 'PUT',
      body: JSON.stringify(productData),
    });
  }

  async deleteProduct(id: number) {
    return this.request<void>(`/api/v1/seller/products/${id}`, {
      method: 'DELETE',
    });
  }

  async getSellerProducts() {
    const response = await this.request<{ success: boolean; products: Product[]; total_found: number }>('/api/v1/seller/products');
    return response.products;
  }

  async updateProductWithVoice(audioFile: File, productId: number) {
    // Get user from localStorage to get seller_id
    const userStr = localStorage.getItem('user');
    const user = userStr ? JSON.parse(userStr) : null;
    
    if (!user || user.role !== 'seller') {
      throw new Error('Only sellers can update products');
    }
    
    const formData = new FormData();
    formData.append('audio_data', audioFile);
    formData.append('session_id', 'seller-session-123');
    formData.append('message_type', 'product_management');

    const response = await fetch(`${this.baseURL}/api/v1/seller/products/${productId}/voice-update?seller_id=${user.id}`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Voice product update failed');
    }

    return await response.json();
  }

  async updatePriceWithVoice(audioFile: File, productId: number) {
    const formData = new FormData();
    formData.append('audio_file', audioFile);
    formData.append('product_id', productId.toString());

    const response = await fetch(`${this.baseURL}/api/v1/seller/voice-price-update`, {
      method: 'POST',
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Voice price update failed');
    }

    return await response.json();
  }

  async getSellerAnalytics() {
    return this.request('/api/v1/seller/analytics');
  }

  // Conversations
  async getConversationHistory(userId: number) {
    return this.request<Conversation[]>(`/api/v1/agent/conversations/${userId}`);
  }

  async getConversation(sessionId: string) {
    return this.request<Conversation>(`/api/v1/agent/conversation/${sessionId}`);
  }

  // Intent Analysis
  async analyzeIntent(message: string) {
    return this.request<{ intent: string; confidence: number; entities: any[] }>('/api/v1/agent/intent', {
      method: 'POST',
      body: JSON.stringify({ message }),
    });
  }

  // Product Suggestions
  async getProductSuggestions(criteria: {
    search_query?: string;
    category?: number;
    price_range?: { min: number; max: number };
    user_preferences?: string[];
  }) {
    return this.request<Product[]>('/api/v1/agent/suggestions', {
      method: 'POST',
      body: JSON.stringify(criteria),
    });
  }

  // Health Check
  async healthCheck() {
    return this.request<{ status: string; timestamp: string }>('/health');
  }
}

// Create and export API client instance
export const apiClient = new ApiClient(API_BASE_URL);

// WebSocket connection for real-time chat
export class WebSocketClient {
  private ws: WebSocket | null = null;
  private sessionId: string;

  constructor(sessionId: string) {
    this.sessionId = sessionId;
  }

  connect(onMessage: (data: any) => void, onError?: (error: any) => void) {
    const wsUrl = `${API_BASE_URL.replace('http', 'ws')}/api/v1/agent/ws/${this.sessionId}`;
    
    this.ws = new WebSocket(wsUrl);

    this.ws.onopen = () => {
      console.log('WebSocket connected');
    };

    this.ws.onmessage = (event) => {
      try {
        const data = JSON.parse(event.data);
        onMessage(data);
      } catch (error) {
        console.error('Failed to parse WebSocket message:', error);
      }
    };

    this.ws.onerror = (error) => {
      console.error('WebSocket error:', error);
      onError?.(error);
    };

    this.ws.onclose = () => {
      console.log('WebSocket disconnected');
    };
  }

  sendMessage(message: string) {
    if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify({
        message,
        session_id: this.sessionId,
        timestamp: new Date().toISOString()
      }));
    }
  }

  disconnect() {
    if (this.ws) {
      this.ws.close();
      this.ws = null;
    }
  }
}

export default apiClient; 