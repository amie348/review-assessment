import { db, collection, onSnapshot, getDocs } from "../firebase/config";
import { Product } from "../types";

export const getProducts = async (
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>
) => {
  const productsCollection = collection(db, "products");

  // Fetch existing products initially
  try {
    const snapshot = await getDocs(productsCollection);
    const initialProducts = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
    console.log({ initialProducts });
    setProducts(initialProducts);
  } catch (error) {
    console.error("Error fetching initial products:", error);
  }

  // Set up real-time listener for updates
  const unsubscribe = onSnapshot(productsCollection, (snapshot) => {
    const fetchedProducts = snapshot.docs.map(
      (doc) =>
        ({
          id: doc.id,
          ...doc.data(),
        } as Product)
    );
    setProducts(fetchedProducts);
  });

  return unsubscribe; // Cleanup function for the listener
};
