export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

export interface CartItem extends Product {
  quantity: number;
}

// وصف المراجعات بدقة
export interface DummyReview {
  rating: number;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

// وصف المنتج كما يأتي من DummyJSON
export interface DummyProductDTO {
  id: number;
  title: string;
  description: string;
  category: string;
  price: number;
  rating: number; // هنا يأتي كرقم
  stock: number;
  brand: string;
  thumbnail: string;
  reviews: DummyReview[]; // مصفوفة مراجعات حقيقية
}

// وصف استجابة القائمة كاملة
export interface DummyResponse {
  products: DummyProductDTO[];
  total: number;
  skip: number;
  limit: number;
}
