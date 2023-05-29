export default class Section {
    constructor(renderer, containerSelector) {
        this._container = document.querySelector(containerSelector);
        this._renderer = renderer;
    }

    addCardFromArray(dataCard) {
        dataCard.forEach(element => {
           this._renderer(element);
        });
    }

    addItem(domElement) {
        this._container.prepend(domElement);
    }
}