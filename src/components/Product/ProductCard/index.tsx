import React from "react";
import { Product } from "../../../types";
import StarRating from "../../StarRating";

interface ProductCardProps {
  product: Product;
  onSelect: (product: Product) => void;
}

const ProductCard: React.FC<ProductCardProps> = ({ product, onSelect }) => {
  return (
    <div
      className="bg-white rounded-lg shadow-md p-4 cursor-pointer hover:shadow-lg transition-shadow duration-200"
      onClick={() => onSelect(product)}
    >
      <img
        src={product.imageUrl}
        alt={product.name}
        className="w-full h-48 object-cover mb-4 rounded"
      />
      <h2 className="text-xl font-semibold mb-2">{product.name}</h2>
      <p className="text-gray-600 mb-2">{product.description}</p>
      <div className="flex justify-between items-center mb-2">
        <span className="text-lg font-bold">${product.price.toFixed(2)}</span>
        <StarRating rating={product.averageRating} />
      </div>
    </div>
  );
};

export default ProductCard;
