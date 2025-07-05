const AUTH_VALIDATION_MSG = {
  NAME: {
    IS_STRING: 'Name must be a string',
    IS_NOT_EMPTY: 'Name is required',
    MIN_LENGTH: 'Name must be at least 2 characters long',
    MAX_LENGTH: 'Name must be at most 20 characters long',
  },
  EMAIL: {
    IS_STRING: 'Email must be a string',
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
