import React, { useState, useEffect } from "react";
import { Product, Review } from "../../../types";
import StarRating from "../../StarRating";
import ReviewList from "../../Reviews/ReviewList";
import ReviewForm from "../../Reviews/ReviewForm";
import {
  getProductReviews,
  addReview,
  updateProductRating,
} from "../../../services/reviewsService";
import { useAuth } from "../../../contexts/AuthContext";

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
}

const ProductDetails: React.FC<ProductDetailsProps> = ({ product, onBack }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const { user } = useAuth();

  // Fetch product reviews and set up real-time listener
  useEffect(() => {
    const unsubscribe = getProductReviews(product.id, setReviews);
    return () => unsubscribe(); // Cleanup on unmount
  }, [product.id]);

  // Handle adding review and update product rating
  const handleSubmitReview = async (rating: number, comment: string) => {
    if (!user) {
      console.error("User is not logged in.");
      return;
    }

    try {
      // Add the review
      await addReview(
        product.id,
        user.id,
        user.name || "Anonymous",
        rating,
        comment
      );
      console.log("Review added successfully");

      // Update the product's average rating
      await updateProductRating(product.id); // Call the function to update rating
    } catch (error) {
      console.error("Error submitting review:", error);
    }
  };

  return (
    <div className="space-y-8">
      <button
        onClick={onBack}
        className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
      >
        Back to Products
      </button>
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-3xl font-bold mb-4">{product.name}</h2>
        <img
          src={product.imageUrl}
          alt={product.name}
          className="w-full h-64 object-cover mb-4 rounded"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <div className="flex justify-between items-center mb-4">
          <span className="text-2xl font-bold">
            ${product.price.toFixed(2)}
          </span>
          <div className="flex items-center">
            <StarRating rating={product.averageRating} />
            <span className="ml-2 text-gray-600">
              ({reviews.length} reviews)
            </span>
          </div>
        </div>
      </div>
      <ReviewList reviews={reviews} />
      <ReviewForm productId={product.id} onSubmit={handleSubmitReview} />
    </div>
  );
};

export default ProductDetails;
