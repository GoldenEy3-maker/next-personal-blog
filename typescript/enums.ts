export enum RoutePaths {
  HomePage = '/',
  ProfilePage = '/profile',
  SearchPage = '/search',
  AuthPage = '/auth',
}

export enum WindowResolutions {
  LaptopSize = 991.98
}

export enum ResponseMessageType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export enum GlobalVariablesErrorMessages {
  DatabaseURI = 'Отсутствует подключение к базе данных',
  JwtSecret = 'jwt secret key is not define',
}

export enum ValidationFormWarnings {
  EmptyValues = 'Заполните все поля!',
  NotValid = 'Данные заполнены некоректно!',
  EmailIsNotCorrect = 'Введен некоректный email',
  ConfirmPasswordIsNotValid = 'Пароли не совпадают',
}

export enum EndpointMessages {
  AlreadyExistUser = 'Такой пользователь уже существует!',
  ValidationFailed = 'Данные заполнены некоректно!',
  SuccessfulCreateUser = 'Пальзователь создан успешно',
  RegistrationFailed = 'При регистрации произошла ошибка, попробуйте позже',
  InvalidValues = 'Введен неверный email или пароль!',
  UserIsNotExist = 'Пользователь не найден!',
  AuthorizationSuccess = 'Авторизация прошла успешно!',
  AuthorizationFailed = 'При попытке авторизации произошла ошибка, попробуй позже',
}

export enum CookieType {
  Authorization = 'authorization-token-key',
  AlreadyLogged = '_already-logged',
}
