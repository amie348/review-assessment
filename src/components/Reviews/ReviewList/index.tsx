import React from "react";
import { Review } from "../../../types";
import StarRating from "../../StarRating";

interface ReviewListProps {
  reviews: Review[];
}

const ReviewList: React.FC<ReviewListProps> = ({ reviews }) => {
  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div key={review.id} className="bg-white rounded-lg shadow p-4">
          <div className="flex justify-between items-center mb-2">
            <span className="font-semibold">{review.userName}</span>
            <StarRating rating={review.rating} />
          </div>
          <p className="text-gray-600">{review.comment}</p>
          <span className="text-sm text-gray-400">
            {new Date(review.createdAt).toLocaleDateString()}
          </span>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
