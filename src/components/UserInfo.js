export default class UserInfo {
  constructor(profileName, profileDescription, profileAvatar) {
    this._name = document.querySelector(profileName);
    this._description = document.querySelector(profileDescription);
    this._avatar = document.querySelector(profileAvatar);
  }

  getUserInfo() {
    this._userInfo = {
      name: this._name.textContent,
      description: this._description.textContent,
    };
    return this._userInfo;
  }

  setUserInfo({ name, about }) {
    this._newTitle = name;
    this._newDescription = about;
    this._name.textContent = this._newTitle;
    this._description.textContent = this._newDescription;
  }

  setAvatar(url) {
    this._avatar.src = url;
  }
}