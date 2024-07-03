export const signUpValidation = (data, step) => {
  const steps = [
    [''],
    [''],
    [''],
    ['firstName', 'lastName'],
    ['country'],
    ['email', 'phone'],
    ['password', 'confirmPassword'],
  ];

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const phoneRegex = /^\+[1-9]\d{1,14}$/;
  const errors = {};

  // Step-based validation
  const currentFields = steps[step];

  console.log('currentFeidls', currentFields);

  if (
    currentFields.includes('email') &&
    !emailRegex.test(data.email) &&
    data.email !== ''
  ) {
    errors.email = 'Please enter a valid email';
  }

  if (
    currentFields.includes('phone') &&
    !phoneRegex.test(data.phone) &&
    data.phone !== ''
  ) {
    errors.email = 'Please enter valid phone number';
  }

  if (currentFields.includes('password')) {
    // Validate password
    if (
      !/^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
        data.password,
      )
    ) {
      errors.password =
        'Password must contain at least one letter, one number, one special character';
    }
  }

  if (
    currentFields.includes('confirmPassword') &&
    data.password !== data.confirmPassword
  ) {
    errors.confirmPassword = 'Passwords do not match.';
  }

  if (currentFields.includes('firstName') && !data.firstName.trim()) {
    errors.firstName = 'First Name cannot be empty';
  }

  if (currentFields.includes('lastName') && !data.lastName.trim()) {
    errors.lastName = 'Last Name cannot be empty';
  }

  if (currentFields.includes('country') && !data.country.trim()) {
    errors.country = 'Please Select the Country';
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
  console.log('errrorrrrrrs', errors);
  return errors;
};
