# Product Review Application

This is a **Product Review Application** where users can browse products, view detailed information, and leave reviews. It uses React for the frontend and Firebase for backend services like Firestore, Authentication, and Hosting.

---

## Features

1. View a list of products.
2. View detailed product information with reviews and ratings.
3. Authenticated users can leave reviews.
4. Firebase Firestore for data storage.
5. Secure data with Firestore Security Rules.

---

## Technologies Used

- **Frontend**: React, TypeScript, Tailwind CSS
- **Backend**: Firebase (Firestore, Authentication, Hosting)
- **State Management**: React Context

---

## Setup Instructions

### 1. Prerequisites

Before you start, ensure you have the following tools installed:

1. **Node.js** (v16 or above):  
   You can download and install it from [here](https://nodejs.org/).
2. **Firebase CLI**:  
   Install the Firebase CLI globally on your machine:

   ```bash
   npm install -g firebase-tools
   ```

3. **Firebase Project**:  
   Create a Firebase project in the [Firebase Console](https://console.firebase.google.com).

---

### 2. Clone the Repository

Clone the repository to your local machine:

```bash
git clone https://github.com/repo/product-review-app.git
cd product-review-app
```

---

### 3. Install Dependencies

Run the following command to install all required dependencies:

```bash
npm install
```

---

### 4. Set Up Firebase

To use Firebase, you'll need to configure a Firebase project:

#### 4.1. Enable Firestore

1. Go to the **Firestore Database** section in the Firebase Console.
2. Click **Create Database** and select **Start in Production Mode**.
3. Create a **"products"** collection where you will store product details and reviews.

#### 4.2. Enable Authentication

1. Go to **Authentication** > **Sign-in Methods**.
2. Enable **Email/Password** or **Google Authentication** (or both).

#### 4.3. Enable Firebase Hosting

1. Go to **Hosting** in the Firebase Console and click **Get Started**.
2. This will guide you to set up Firebase Hosting for the project.

---

### 5. Configure Firebase in the App

1. In the Firebase Console, go to **Project Settings** > **General** > "Your Apps" > **Firebase SDK snippet** > **Config**.
2. Copy the Firebase configuration values and create a `.env` file in the root of your project with the following content:

```env
REACT_APP_FIREBASE_API_KEY=your-api-key
REACT_APP_FIREBASE_AUTH_DOMAIN=your-auth-domain
REACT_APP_FIREBASE_PROJECT_ID=your-project-id
REACT_APP_FIREBASE_STORAGE_BUCKET=your-storage-bucket
REACT_APP_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
REACT_APP_FIREBASE_APP_ID=your-app-id
```

---

### 6. Set Up Firestore Security Rules

Set up Firestore security rules to protect your data:

1. Go to **Firestore Database** > **Rules** in the Firebase Console.
2. Replace the default rules with the following security rules:

```firestore
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /{document=**} {
      allow read: if true; // Allow read access to everyone
    }
    match /products/{productId}/reviews/{reviewId} {
      allow write: if request.auth != null &&
                   request.resource.data.userId == request.auth.uid &&
                   request.resource.data.rating >= 1 &&
                   request.resource.data.rating <= 5 &&
                   request.resource.data.comment is string &&
                   request.resource.data.comment.size() <= 500 &&
                   request.resource.data.createdAt == request.time;
    }
  }
}
```

---

### 7. Run the Application Locally

Once everything is set up, you can run the app locally by starting the development server:

```bash
npm start
```

Your application will be available at `http://localhost:3000`.

---

### 8. Deployment to Firebase Hosting

Once you're happy with the local development, you can deploy the app to Firebase Hosting:

#### 8.1. Build the App

First, create a production build of your application:

```bash
npm run build
```

#### 8.2. Log in to Firebase

If you haven't already logged in to Firebase, run:

```bash
firebase login
```

#### 8.3. Initialize Firebase Hosting

To initialize Firebase Hosting for your project, run:

```bash
firebase init hosting
```

Follow the instructions and select the appropriate Firebase project. Choose to configure the project with the `build/` directory when prompted.

#### 8.4. Deploy the App

Finally, deploy the app to Firebase Hosting:

```bash
firebase deploy
```

After the deployment is complete, Firebase will provide a live URL for your app.

---

## Folder Structure

The folder structure for the project is as follows:

```
product-review-app/
├── src/
│   ├── components/          # UI components (ProductDetails, ReviewForm, ReviewList, etc.)
│   ├── contexts/            # React Context for Authentication
│   ├── services/            # Firebase services for Firestore and Authentication
│   ├── types/               # TypeScript types
│   ├── App.tsx              # Main App component
│   ├── index.tsx            # Entry point
├── public/                  # Static assets (favicon, index.html, etc.)
├── .env                     # Firebase configuration file
├── package.json             # Dependencies and scripts
├── README.md                # Documentation for the project
```

---

## Notes

- **Authentication**: Make sure to properly set up Firebase Authentication before testing user authentication and reviews.
- **Firestore Security**: Firestore security rules should be carefully defined to protect sensitive data.
- **Firebase Hosting**: Firebase Hosting allows you to deploy your app easily with a single command.
- **Firebase Firestore**: Firestore allows you to securely store data and integrate real-time updates for reviews and product data.

---

## License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
