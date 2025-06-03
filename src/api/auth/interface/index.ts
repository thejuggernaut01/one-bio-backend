interface ICreateUser {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
}

interface IResendVerifyEmail {
  email: string;
}

interface IUpdateUser {
  firstName: string;
  lastName: string;
  userName: string;
  email: string;
  password: string;
}

interface ILogin {
  email: string;
  password: string;
}

interface IForgotPassword {
  email: string;
}

interface IResetPassword {
  token: string;
  password: string;
}

export {
  ICreateUser,
  IResendVerifyEmail,
  IUpdateUser,
  ILogin,
  IForgotPassword,
  IResetPassword,
};
