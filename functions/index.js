const functions = require("firebase-functions");
const admin = require("firebase-admin");
admin.initializeApp();
const db = admin.firestore();

exports.updateProductRating = functions.firestore
  .document("products/{productId}/reviews/{reviewId}")
  .onWrite(async (change, context) => {
    const productId = context.params.productId;
    const reviewsRef = db.collection(`products/${productId}/reviews`);
    const productRef = db.doc(`products/${productId}`);

    try {
      // Fetch all reviews for the product
      const reviewsSnapshot = await reviewsRef.get();
      const reviews = reviewsSnapshot.docs.map((doc) => doc.data());

      // Calculate average rating
      const totalRating = reviews.reduce(
        (sum, review) => sum + review.rating,
        0
      );
      const averageRating =
        reviews.length > 0 ? totalRating / reviews.length : 0;

      // Update the product document with the new rating
      await productRef.update({
        averageRating: parseFloat(averageRating.toFixed(2)),
        reviewCount: reviews.length,
      });
    } catch (error) {
      console.error("Error updating product rating:", error);
    }
  });
