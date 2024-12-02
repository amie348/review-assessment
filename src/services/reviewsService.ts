import {
  db,
  collection,
  query,
  getDocs,
  addDoc,
  onSnapshot,
  updateDoc,
  doc,
} from "../firebase/config";
import { Review } from "../types";

export const reviewsCollection = collection(db, "reviews");

export const getProductReviews = (
  productId: string,
  setReviews: React.Dispatch<React.SetStateAction<Review[]>>
) => {
  const reviewsSubcollection = collection(db, `products/${productId}/reviews`);

  // Set up real-time listener for reviews
  const unsubscribe = onSnapshot(reviewsSubcollection, (querySnapshot) => {
    const fetchedReviews = querySnapshot.docs.map(
      (doc) => ({ id: doc.id, ...doc.data() } as Review)
    );
    setReviews(fetchedReviews); // Update state with new reviews
  });

  return unsubscribe; // Return cleanup function
};

export const addReview = async (
  productId: string,
  userId: string,
  userName: string,
  rating: number,
  comment: string
) => {
  try {
    const reviewsSubcollection = collection(
      db,
      `products/${productId}/reviews`
    );
    await addDoc(reviewsSubcollection, {
      userId,
      userName,
      rating,
      comment,
      createdAt: new Date().toISOString(),
    });
    console.log("Review added");
  } catch (error) {
    console.error("Error adding review:", error);
    throw error;
  }
};

export const updateProductRating = async (productId: string) => {
  try {
    // Get all reviews for this product
    const reviewsQuery = query(collection(db, `products/${productId}/reviews`));
    const querySnapshot = await getDocs(reviewsQuery);
    const reviews = querySnapshot.docs.map((doc) => doc.data() as Review);

    // Calculate the new average rating
    const averageRating =
      reviews.length > 0
        ? reviews.reduce((sum, review) => sum + review.rating, 0) /
          reviews.length
        : 0;

    // Update the product's rating and review count
    const productRef = doc(db, "products", productId);
    await updateDoc(productRef, {
      averageRating,
      reviewCount: reviews.length,
    });
  } catch (error) {
    console.error("Error updating product rating:", error);
    throw error;
  }
};
