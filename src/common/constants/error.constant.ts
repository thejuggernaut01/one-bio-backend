export const ERROR_CONSTANT = {
  AUTH: {
    REGISTER_FAILED: 'Registration failed, please try again',
    LOGIN_FAILED: 'Invalid credentials, please try again',
    EMAIL_VERIFICATION_FAILED: 'Email verification failed, please try again',
    PASSWORD_RESET_EMAIL_FAILED: 'Failed to send password reset email',
    PASSWORD_RESET_FAILED: 'Password reset failed, please try again',
    RESEND_VERIFICATION_EMAIL_FAILED:
      'Failed to resend verification email, please try again later',
    ACCOUNT_DEACTIVATION_FAILED:
      'Failed to deactivate account, please try again',
    LOGOUT_FAILED: 'Failed to log out, please try again',
    UNAUTHORIZED: 'Unauthorized access, please log in',
    USER_EXISTS: 'User already exists.',
    USER_DOES_NOT_EXIST: 'User does not exist.',
    EXPIRED_SESSION: 'Session expired. Please log in again.',
    PASSWORD_MISMATCH: 'Passwords do not match',
  },
  USER: {
    GET_CURRENT_USER_FAILED: 'Failed to retrieve user data',
    UPDATE_USER_PROFILE_FAILED: 'Failed to update profile, please try again',
    DELETE_USER_FAILED: 'Failed to delete user, please try again',
    NOT_FOUND: 'User not found',
    ALREADY_TAKEN: 'Username is already taken',
  },
  GENERAL: {
    SERVER_ERROR: 'Internal server error, please try again later',
    NOT_FOUND: 'Resource not found',
    VALIDATION_ERROR: 'Validation failed, check your input',
    FORBIDDEN: 'You do not have permission to perform this action',
    BAD_REQUEST: 'Bad request, please check your input',
    CONFLICT: 'Conflict, the request could not be completed',
    RATE_LIMIT: 'Too many requests, please try again later',
    TOKEN: 'Invalid or expired token',
    ERROR: 'An error occurred, please log in again',
  },
  EMAIL: {
    FAILED_TO_SEND: 'Failed to send the email. Please try again later.',
    INVALID_RECIPIENT: 'The recipient email is invalid.',
  },
};
