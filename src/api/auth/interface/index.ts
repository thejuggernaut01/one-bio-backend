interface ICreateUser {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

interface IResendVerifyEmail {
  email: string;
}

interface IUpdateUser {
  name: string;
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
  email: string;
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
