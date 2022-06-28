const elements = document.querySelector('.elements');
const elementUser = document.querySelector('.element__user');
const elementSong = document.querySelector('.element__song');
const Template = document.querySelector('.template');
const inputElement = document.querySelector('.input__text');
const formElement = document.querySelector('.input');

let editedElement = null;

const getByEvent = e => e.currentTarget.closest('.element');
const getTextElement = element => element.querySelector('.element__song');
const deleteElement = e => {
    const element = getByEvent(e);
    element.remove();
}

const editElement = e => {
    const element = getByEvent(e);
    editedElement = element;
    inputElement.value = getTextElement(editedElement).textContent;
    // todoSubmitButtonElement.textContent = 'Сохранить';
};

const addElementListeners = element => {
    element.querySelector('.button-delete').addEventListener('click', deleteElement);
};
const duplicateElement = e => {
    const element = getByEvent(e);
    const duplicatedElement = element.cloneNode(true);
    addElementListeners(duplicatedElement);
    element.after(duplicatedElement);
};

const createElement = text => {
    const element = Template.content.querySelector('.element').cloneNode(true);
    getTextElement(element).textContent = text;
    addElementListeners(element);
    return element;
};

const addElement = text => {
    const element = createElement(text);
    elements.append(element);
};

const handleElementSubmit = e => {
    e.preventDefault();
    const text = inputElement.value;
    if (editedElement) {
        getTextElement(editedElement).textContent = text;
        //   todoSubmitButtonElement.textContent = 'Добавить';
        editedElement = null;
    } else {
        addElement(text);
    }
    formElement.reset();
};

initialMessage.forEach(addElement);
formElement.addEventListener('submit', handleElementSubmit);