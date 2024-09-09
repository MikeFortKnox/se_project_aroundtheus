export default class UserInfo {
  constructor({ nameSelector, descriptionSelector, avatarSelector }) {
    // this._profileInfo = document.querySelector(userInfo);
    this._nameInfo = document.querySelector(nameSelector);
    this._descriptionInfo = document.querySelector(descriptionSelector);
    this._avatarElement = document.querySelector(avatarSelector);
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

  avatarUserInfo() {
    return {
      avatarLink: this._avatarElement.src,
    };
  }

  // use when submitting the submitting edit modal
  setUserInfo({ name, description }) {
    this._nameInfo.textContent = name;
    this._descriptionInfo.textContent = description;
  }

  setAvatarInfo({ avatarLink }) {
    this._avatarElement.src = avatarLink;
  }
}
