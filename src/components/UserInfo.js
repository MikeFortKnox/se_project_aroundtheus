export default class UserInfo {
  constructor(userInfo) {
    // this._profileInfo = document.querySelector(userInfo);
    this._nameInfo = document.querySelector(userInfo.nameSelector);
    this._descriptionInfo = document.querySelector(
      userInfo.descriptionSelector
    );
  }

  // use when opening profile edit modal
  getUserInfo() {
    const userInfo = {};
    userInfo.name = this._nameInfo.textContent;
    userInfo.description = this._descriptionInfo.textContent;
    return userInfo;
  }

  // use when submitting the submitting edit modal
  setUserInfo(userInfo) {
    this._nameInfo.textContent = userInfo.name;
    this._descriptionInfo.textContent = userInfo.description;
  }
}
