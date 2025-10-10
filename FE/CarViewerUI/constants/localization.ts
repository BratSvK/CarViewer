
const LOCALIZATION = {
  common: {
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
    // Add other common terms here
  },
  forms: {
    email: 'email_placeholder',
    password: 'password_placeholder',
    submit: 'submit',
    cancel: 'cancel',
  },
  validation: {
    invalidEmail: 'validation_invalid_email',
    emailRequired: 'validation_email_required',
    passwordMin: 'validation_password_min',
    passwordRequired: 'validation_password_required',
  },
  loginScreen: {
    welcome: 'welcome',
    forgotPassword: 'forgot_password',
    loginButton: 'login_button',
    signUpPrompt: 'sign_up_prompt',
    forgotPasswordPrompt: 'forgot_password_prompt',
  },
  registerScreen: {
    createAccount: 'register',
    registerButton: 'register_button',
    loginPrompt: 'login_prompt',
    registerSuccess: 'registration_success',
  },
  httpErrors: {
    networkError: 'network_error',
    unauthorized: 'unauthorized',
    unknownError: 'unknown_error',
  },
  homeScreen: {
    logoutAlert: 'logout_alert',
    logoutInnerAlert: 'logout_inner_alert',
    logoutConfirm: 'logout_confirm',
    logoutCancel: 'logout_cancel',
    homeTab: 'home_tab',
    carTab: 'car_tab',
  }
};

export const SUPPORTED_LNG_NAMES = {
  default: 'sk',
  en: 'en',
};

export const SUPPORTED_LNG_FLAGS = {
  default: 'sk',
  en: 'gb',
};

export default LOCALIZATION;