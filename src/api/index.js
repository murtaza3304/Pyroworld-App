import {
  signin,
  logout,
  register,
  forgetPassword,
  resetPassword,
  emailVerification,
  verifyEmail,
} from './routes/auth';
import {getToken} from './routes/kyc';

export {
  register,
  signin,
  logout,
  forgetPassword,
  resetPassword,
  emailVerification,
  verifyEmail,
  getToken,
};
