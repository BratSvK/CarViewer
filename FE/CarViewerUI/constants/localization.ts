
const LOCALIZATION = {
  common: {
    ok: 'OK',
    yes: 'Yes',
    no: 'No',
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
    loginSuccess: 'login_successful',
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
    garageCreatedSuccess: 'garage_created_success',
    garageRemovedSuccess: 'garage_removed_success',
    homeTitle: 'home_title',
    garageCreateLabel: 'garage_create_label',
    garageEmptyList: 'garage_empty_list',
    garageEmptyListDesc: 'garage_empty_list_description',
    garageEmptyListBtnLabel: 'garage_empty_list_button_label',
  },
  createGarageModal: {
    title: 'create_garage_modal_title',
    subtitle: 'create_garage_modal_subtitle',
    inputLabel: 'create_garage_modal_input_label',
    placeholder: 'create_garage_modal_placeholder',
    cancelButton: 'create_garage_modal_cancel',
    createButton: 'create_garage_modal_create',
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