export enum ResponseMessageType {
  Success = 'success',
  Warning = 'warning',
  Danger = 'danger',
}

export enum GlobalVariablesErrorMessages {
  DatabaseURI = 'Отсутствует строка подключения к базе данных',
  JwtSecret = 'jwt secret key is not define',
}

export enum ValidationFormWarnings {
  EmptyValues = 'Заполните все поля!',
  NotValid = 'Данные заполнены некоректно!',
  EmailIsNotCorrect = 'Введен некоректный email',
  ConfirmPasswodIsNotValid = 'Пароли не совпадают',
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
}
