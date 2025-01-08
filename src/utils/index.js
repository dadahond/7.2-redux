export function getFirebaseErrorMessage(errorCode) {
  switch (errorCode) {
    case "auth/invalid-email":
      return "The email address is invalid.";
    case "auth/user-disabled":
      return "This user account has been disabled.";
    case "auth/user-not-found":
      return "No user found with this email address.";
    case "auth/invalid-credential":
      return "No user found with this email address.";
    case "auth/wrong-password":
      return "The password is incorrect.";
    case "auth/email-already-in-use":
      return "This email address is already in use.";
    case "auth/operation-not-allowed":
      return "This operation is not allowed. Please contact support.";
    case "auth/weak-password":
      return "The password must be stronger. Consider using more characters and a mix of letters, numbers, and symbols.";
    case "auth/network-request-failed":
      return "A network error occurred. Please check your connection and try again.";
    case "auth/too-many-requests":
      return "Too many requests. Please wait a moment and try again.";
    case "auth/requires-recent-login":
      return "Please log in again to perform this action.";
    default:
      return "An unknown error occurred. Please try again later.";
  }
}
