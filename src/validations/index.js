export const signUpValidation = data => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};

  // Validate email
  if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  // Validate password
  if (
    !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      data.password,
    )
  ) {
    errors.password =
      'Password must contain at least one letter, one number, one special character';
  }

  // Validate confirm password
  if (data.password !== data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  // Validate name
  if (!data.name.trim()) {
    errors.name = 'Name cannot be empty';
  }

  return errors;
};
export const forgetPasswordValidation = data => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};

  // Validate email
  if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  return errors;
};
export const signinValidation = data => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const errors = {};

  // Validate email
  if (!emailRegex.test(data.email)) {
    errors.email = 'Please enter a valid email';
  }

  if (
    !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      data.password,
    )
  ) {
    errors.password =
      'Password must contain at least one letter, one number, one special character';
  }

  return errors;
};
export const resetPasswordValidation = data => {
  let errors = {};
  if (
    !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      data.password,
    )
  ) {
    errors.password =
      'Password must contain at least one letter, one number, one special character';
  }
  if (data.password === data.confirmPassword) {
    errors.confirmPassword = 'Passwords do not match.';
  }
  console.log("errrorrrrrrs",errors)
  return errors;
};
