import React, { useState, useEffect } from "react";
import Header from "./components/Header/index";
import ProductList from "./components/Product/ProductList";
import ProductDetails from "./components/Product/ProductDetails";
import { Product } from "./types";
import { AuthProvider } from "./contexts/AuthContext";
import { getProducts } from "./services/productsService";

const App: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      const unsubscribe = await getProducts(setProducts);
      return () => unsubscribe(); // Cleanup listener on unmount
    };

    fetchProducts();
  }, []);

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
  };

  return (
    <AuthProvider>
      <div className="min-h-screen bg-gray-100">
        <Header />
        <main className="container mx-auto py-8">
          {selectedProduct ? (
            <ProductDetails
              product={selectedProduct}
              onBack={() => setSelectedProduct(null)}
            />
          ) : (
            <ProductList
              products={products}
              onSelectProduct={handleSelectProduct}
            />
          )}
        </main>
      </div>
    </AuthProvider>
  );
};

export default App;
