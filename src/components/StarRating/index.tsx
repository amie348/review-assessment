import React from "react";

interface StarRatingProps {
  rating: number;
  max?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, max = 5 }) => {
  return (
    <div
      className="flex items-center"
      aria-label={`Rating: ${rating} out of ${max} stars`}
    >
      {[...Array(max)].map((_, index) => (
        <span
          key={index}
          className={`text-2xl ${
            index < rating ? "text-yellow-400" : "text-gray-300"
          }`}
          aria-hidden="true"
        >
          ★
        </span>
      ))}
    </div>
  );
};

export default StarRating;
