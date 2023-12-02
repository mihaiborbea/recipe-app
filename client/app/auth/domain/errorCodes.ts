export enum AuthErrorCodes {
  EmailAlreadyUsed = 'auth/email-already-in-use',
  UserNotFound = 'auth/user-not-found',
  WrongPassword = 'auth/wrong-password',
  NotLoggedIn = 'custom/user-not-logged-in',
}

export enum AuthErrorCodesMessages {
  EmailAlreadyUsed = 'This email already exists!',
  UserNotFound = 'User not found!',
  WrongPassword = 'Password invalid!',
  NotLoggedIn = 'User not logged in!',
}
