export default class UserInfo {
    constructor(configInfo) {
        this._profileName = document.querySelector(configInfo.profileNameSelector);
        this._profileJob = document.querySelector(configInfo.profileJobSelector);
    }

    getUserInfo() {
        return {username: this._profileName.textContent, description: this._profileJob.textContent}
    }

    setUserInfo(inputData) {
        this._profileName.textContent = inputData.username;
        this._profileJob.textContent = inputData.description;
    }
}