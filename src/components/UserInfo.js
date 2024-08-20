export default class UserInfo {
  constructor(userInfo) {
    this._profileInfo = document.querySelector(userInfo);
    this._nameInfo = this._profileInfo.querySelector(".profile__title");
    this._descriptionInfo = this._profileInfo.querySelector(
      ".profile__description"
    );
  }

  // use when opening profile edit modal
  getUserInfo() {
    const userInfo = {};
    userInfo.name =
      this._profileInfo.querySelector(".profile__title").textContent;
    userInfo.description = this._profileInfo.querySelector(
      ".profile__description"
    ).textContent;
    return userInfo;
  }

  // use when submitting the submitting edit modal
  setUserInfo(userInfo) {
    this._nameInfo.textContent = userInfo.name;
    this._descriptionInfo.textContent = userInfo.description;
  }
}
