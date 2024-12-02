import { Product, User } from "../types";

export const mockProducts: Product[] = [
  {
    id: "1",
    name: "Wireless Headphones",
    description: "High-quality wireless headphones with noise cancellation",
    price: 199.99,
    imageUrl: "https://example.com/headphones.jpg",
    averageRating: 4.5,
    reviews: [
      {
        id: "101",
        userId: "1",
        userName: "John Doe",
        productId: "1",
        rating: 5,
        comment: "Great sound quality and comfortable to wear!",
        createdAt: "2023-05-15T10:30:00Z",
      },
      {
        id: "102",
        userId: "2",
        userName: "Jane Smith",
        productId: "1",
        rating: 4,
        comment: "Good battery life, but a bit pricey.",
        createdAt: "2023-05-16T14:45:00Z",
      },
    ],
  },
  {
    id: "2",
    name: "Smartphone",
    description: "Latest model smartphone with advanced features",
    price: 799.99,
    imageUrl: "https://example.com/smartphone.jpg",
    averageRating: 4.2,
    reviews: [
      {
        id: "201",
        userId: "3",
        userName: "Alice Johnson",
        productId: "2",
        rating: 4,
        comment: "Great camera and fast performance!",
        createdAt: "2023-05-17T09:15:00Z",
      },
    ],
  },
];

export const mockUsers: User[] = [
  { id: "1", name: "John Doe", email: "john@example.com" },
  { id: "2", name: "Jane Smith", email: "jane@example.com" },
  { id: "3", name: "Alice Johnson", email: "alice@example.com" },
];
