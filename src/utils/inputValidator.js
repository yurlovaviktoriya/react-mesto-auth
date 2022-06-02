export default class InputValidator {
  /**
  * Создаёт экземпляр InputValidation для проверки ввода в инпутах
  * @param {object} options - Инпут формы
  */
  constructor(inputElement) {
    this._inputElement = inputElement;
  }


  /**
   * Метод проверяет валидность инпута, в случае ошибки возвращает сообщение об ошибке
   * @returns {{isValid: boolean, errorMessage: string}|{isValid: boolean}}
   * @private
   */
  _isValid() {
    if (!this._inputElement.validity.valid) {
       return {isValid: false, errorMessage: this._inputElement.validationMessage};
     } else {
       return {isValid: true};
     }
  }


  /**
   * Метод запускает валидацию инпута
   * @returns {{isValid: boolean, errorMessage: *}|{isValid: boolean}}
   */
  enableValidation() {
    return this._isValid();
  }
}
