export default class UserInfo {
  constructor({ nameSelector, descriptionSelector }) {
    // this._profileInfo = document.querySelector(userInfo);
    this._nameInfo = document.querySelector(nameSelector);
    this._descriptionInfo = document.querySelector(descriptionSelector);
  }

  // use when opening profile edit modal
  getUserInfo() {
    // const userInfo = {};
    // userInfo.name = this._nameInfo.textContent;
    // userInfo.description = this._descriptionInfo.textContent;
    // return userInfo;
    return {
      name: this._nameInfo.textContent,
      description: this._descriptionInfo.textContent,
    };
  }

  // use when submitting the submitting edit modal
  setUserInfo({ name, description }) {
    this._nameInfo.textContent = name;
    this._descriptionInfo.textContent = description;
  }
}
