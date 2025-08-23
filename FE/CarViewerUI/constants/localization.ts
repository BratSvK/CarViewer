
const LOCALIZATION = {
  common: {
    ok: 'OK',
    cancel: 'Cancel',
    yes: 'Yes',
    no: 'No',
    // Add other common terms here
  },
  forms: {
    email: 'email_placeholder',
    password: 'password_placeholder',
    requiredField: 'This field is required',
    invalidEmail: 'Please enter a valid email address',
    minLength: 'This field must be at least {min} characters long',
    maxLength: 'This field must be at most {max} characters long', 
    passwordsMustMatch: 'Passwords must match',
    submit: 'Submit'
    // Add other form-related terms here
  },
  loginScreen: {
    welcome: 'welcome',
    forgotPassword: 'forgot_password',
    loginButton: 'login_button',
    signUpPrompt: 'sign_up_prompt',
  },
  registerScreen: {
    createAccount: 'register',
    username: 'username',
    registerButton: 'register_button',
    loginPrompt: 'login_prompt',
  },
  // Add other screens here
};

export const SUPPORTED_LNG_NAMES = {
  default: 'sk',
  en: 'us',
};

export default LOCALIZATION;