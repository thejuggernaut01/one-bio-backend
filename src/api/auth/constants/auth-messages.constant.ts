const AUTH_VALIDATION_MSG = {
  FIRST_NAME: {
    IS_STRING: 'First name must be a string',
    IS_NOT_EMPTY: 'First name is required',
    MIN_LENGTH: 'First name must be at least 2 characters long',
    MAX_LENGTH: 'First name must be at most 20 characters long',
  },
  LAST_NAME: {
    IS_STRING: 'Last name must be a string',
    IS_NOT_EMPTY: 'Last name is required',
    MIN_LENGTH: 'Last name must be at least 2 characters long',
    MAX_LENGTH: 'Last name must be at most 20 characters long',
  },
  EMAIL: {
    IS_STRING: 'User name must be a string',
    IS_EMAIL: 'Invalid email address',
    IS_NOT_EMPTY: 'Email address is required',
  },
  PASSWORD: {
    IS_STRING: 'Password must be a string',
    IS_NOT_EMPTY: 'Password is required',
    MIN_LENGTH: 'Password must be at least 6 characters long',
    MAX_LENGTH: 'Password must be at most 20 characters long',
    IS_STRONG_PASSWORD: 'Password is not strong enough',
  },
  CODE: {
    IS_NOT_EMPTY: 'Code is required',
    IS_INT: 'Code must be a number',
    LENGTH: 'Code must be 6-digits long',
  },
};

export { AUTH_VALIDATION_MSG };
