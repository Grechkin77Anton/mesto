export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.profileNameSelector);
        this._profileJob = document.querySelector(configInfo.profileJobSelector);
        this._profileAvatar = document.querySelector(configInfo.profileAvatarSelector);
    }

    getUserInfo() {
        return {username: this._profileName.textContent, description: this._profileJob.textContent, }
    }

    findId(id) {
        this._id = id;
    }

    getId() {
        return this._id
      }

    setUserInfo({username, description, avatar}) {
        this._profileName.textContent = username;
        this._profileJob.textContent = description;
        this._profileAvatar.src = avatar; 
    }
}