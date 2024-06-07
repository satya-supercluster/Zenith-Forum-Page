import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { app } from "../config/firebase.config";
const firebaseAuth = getAuth(app);
const provider = new GoogleAuthProvider();
const userLoginWithGoogle = async () => {
  try {
    const result = await signInWithPopup(firebaseAuth, provider);
    if (result.user) {
      const token = await result.user.getIdToken();
      console.log(token);

      const res = await fetch("http://localhost:8080/api/auth/google", {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
        },
      });

      if (!res.ok) {
        throw new Error(`HTTP error! status: ${res.status}`);
      }

      const data = await res.json();
      console.log(data);

      // Store user data and auth state in localStorage
      localStorage.setItem("user", JSON.stringify(data.user));
      localStorage.setItem("token", token);
      localStorage.setItem("isAuthenticated", "true");

      setAuth(true);
    } else {
      setAuth(false);
      console.log("No user from Google Sign-In");
      clearLocalStorage();
    }
  } catch (error) {
    console.error("Failed to Authenticate:", error);
    setAuth(false);
    clearLocalStorage();
  }
};

// Helper function to clear localStorage
const clearLocalStorage = () => {
  localStorage.removeItem("user");
  localStorage.removeItem("token");
  localStorage.removeItem("isAuthenticated");
};

// Function to check authentication status on app load or component mount
const checkAuthStatus = () => {
  const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";
  const user = JSON.parse(localStorage.getItem("user"));
  const token = localStorage.getItem("token");

  if (isAuthenticated && user && token) {
    setAuth(true);
    // You can also set user data in your app state or context here
    console.log("User is authenticated:", user.name);
    return true;
  } else {
    setAuth(false);
    clearLocalStorage(); // Clear any leftover data
    console.log("User is not authenticated");
    return false;
  }
};
export { checkAuthStatus, clearLocalStorage, userLoginWithGoogle };

// const userLoginWithGoogle = async () => {
//   const response = await signInWithPopup(firebaseAuth, provider)
//     .then(async (userCred) => {
//       if (userCred) {
//         setAuth(true);
//         const token = await firebaseAuth.currentUser.getIdToken();
//         console.log(token);
//         const res = await fetch(
//           `http://localhost:8080/api/auth/google`,
//           {
//             method: "POST",
//             headers: { Authorization: `Bearer ${token}` },
//           }
//         );
//         const data = await res.json();
//         console.log(data);
//       } else {
//         setAuth(false);
//       }
//     })
//     .catch((error) => {
//       console.log("failed to Authenticate", error);
//     });
// };
// const userLoginWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(firebaseAuth, provider);
//     if (result.user) {
//       const token = await result.user.getIdToken();
//       console.log(token);

//       const res = await fetch("http://localhost:8080/api/auth/google", {
//         method: "POST",
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });

//       if (!res.ok) {
//         throw new Error(`HTTP error! status: ${res.status}`);
//       }

//       const data = await res.json();
//       console.log(data);

//       // Store user data in localStorage
//       localStorage.setItem("user", JSON.stringify(data.user));
//       localStorage.setItem("token", token); // Consider the security implications

//       setAuth(true);
//     } else {
//       setAuth(false);
//       console.log("No user from Google Sign-In");
//       // Clear localStorage on failed auth
//       localStorage.removeItem("user");
//       localStorage.removeItem("token");
//     }
//   } catch (error) {
//     console.error("Failed to Authenticate:", error);
//     setAuth(false);
//     // Clear localStorage on error
//     localStorage.removeItem("user");
//     localStorage.removeItem("token");
//   }
// };
