const tasks = [
  {
      id: "1138465078061",
      completed: false,
      text: "Посмотреть новый урок по JavaScript",
  },
  {
      id: "1138465078062",
      completed: false,
      text: "Выполнить тест после урока",
  },
  {
      id: "1138465078063",
      completed: false,
      text: "Выполнить ДЗ после урока",
   },
];
const createNewElements = (taskId, taskText) => {
  const mainDivElement = document.createElement ('div');
  mainDivElement.className = 'task-item';
  mainDivElement.dataset.taskId = taskId;

  const mainContainer = document.createElement ('div');
  mainContainer.className = 'task-item__main-container';

  const mainContent = document.createElement('div');
  mainContent.className = 'task-item__main-content';
  
  const formContainer = document.createElement('form');
  formContainer.className = 'checkbox-form';

  const inputContainer = document.createElement('input');
  inputContainer.className = 'checkbox-form__checkbox';
  inputContainer.type = 'checkbox';
  inputContainer.id = taskId;

  const labelContainer = document.createElement('label');
  labelContainer.htmlFor = taskId;

  const spanContainer = document.createElement('span');
  spanContainer.className = 'task-item__text';
  spanContainer.textContent = taskText;

  const deleteButton = document.createElement('button');
  deleteButton.className = 'task-item__delete-button default-button delete-button';
  deleteButton.dataset.deleteTaskId = taskId;
  deleteButton.textContent = 'Удалить';

  formContainer.append(inputContainer, labelContainer);
  mainContainer.append(mainContent, deleteButton);
  mainContent.prepend(formContainer, spanContainer);
  mainDivElement.prepend(mainContainer);
  console.log(mainDivElement);

  return mainDivElement;
};


const bodyContent = document.querySelector('.tasks-list');
tasks.forEach((task) => {
  const newElement = createNewElements(task.id, task.text);
  bodyContent.append(newElement);
});

const createTaskBlock = document.querySelector('.create-task-block');
createTaskBlock.addEventListener('submit', (event) => {
  event.preventDefault();
  const { target } = event;
  const taskNameInput = target.taskName;
  const inputValue = taskNameInput.value;
  if (inputValue) {
      tasks.push ({
          id: String(Date.now()),
          completed: false,
          text: inputValue, 
      });
      const newTask = createNewElements (String(Date.now()), inputValue);
      const bodyContent = document.querySelector('.tasks-list');
      bodyContent.append(newTask);
  };
});

const checkNewTaskOnValidation= (value) => {   
      if (!value ) {
          return false;
      }  
      return true;
  };

const checkNewTaskOnValidationTwin = (value) => {
  const checkingText = document.querySelectorAll('.task-item__text');
  let result = true;
  checkingText.forEach((text) => {
      if (value === text.innerText) {
          result = false;
      };
  }); 
  return result;
};

const errorContainer = document.querySelector('.create-task-block');
const taskNameInput = document.querySelector('.create-task-block__input');
taskNameInput.addEventListener('change', (event) => {
  const { target } = event;
  const { value } = target;
  const isValid = checkNewTaskOnValidation(value);
  const isValidTwin = checkNewTaskOnValidationTwin(value);
  const newErrorMessageBlockFromDOM = document.querySelector('.error-message-block');
  if (!isValid) {
      if (newErrorMessageBlockFromDOM) {
          newErrorMessageBlockFromDOM.remove();
      };
      const newErrorMessageBlock = document.createElement('span');
      newErrorMessageBlock.className = 'error-message-block';
      newErrorMessageBlock.textContent = 'Название задачи не должно быть пустым';
      errorContainer.append(newErrorMessageBlock);
  } else if (!isValidTwin) {
      if (newErrorMessageBlockFromDOM) {
          newErrorMessageBlockFromDOM.remove();
      };
      const newErrorMessageBlock = document.createElement('span');
      newErrorMessageBlock.className = 'error-message-block';
      newErrorMessageBlock.textContent = 'Задача с таким названием уже существует';
      errorContainer.append(newErrorMessageBlock);
  } else if (isValid && newErrorMessageBlockFromDOM) {
      newErrorMessageBlockFromDOM.remove();
  };
});

const modalWindow = document.createElement('div');
modalWindow.className = 'modal-overlay modal-overlay_hidden';

const modalWindowContainer = document.createElement('div');
modalWindowContainer.className = 'delete-modal';

const modalWindowQuestion = document.createElement('h3');
modalWindowQuestion.className = 'delete-modal__question';
modalWindowQuestion.textContent = 'Вы действительно хотите удалить эту задачу?';

const buttonContainer = document.createElement('div');
buttonContainer.className = 'delete-modal__button';

const buttonCancel = document.createElement('button');
buttonCancel.className = 'delete-modal__button delete-modal__cancel-button';
buttonCancel.textContent = 'Отмена';

const buttonConfirm = document.createElement('button');
buttonConfirm.className = 'delete-modal__button delete-modal__confirm-button';
buttonConfirm.textContent = 'Удалить';

buttonContainer.append(buttonCancel, buttonConfirm);
modalWindowContainer.append(modalWindowQuestion, buttonContainer);
modalWindow.append(modalWindowContainer);

const modalInBody = document.querySelector('.tasks-list');
modalInBody.append(modalWindow);

const deleteButton = document.querySelector('.tasks-list');
let clickedButton

deleteButton.addEventListener('click', (event) => {
  const isDeleteButton = event.target.closest('.task-item__delete-button');
  if (isDeleteButton) {
      modalWindow.classList.remove('modal-overlay_hidden');
      clickedButton = isDeleteButton
  };
});

buttonCancel.addEventListener('click', (event) => {
          const {target} = event;
          modalWindow.classList.add('modal-overlay_hidden');
      });

buttonConfirm.addEventListener('click', (event) => {
          const {target} = event;
          console.log(target);
          const task = document.querySelectorAll('.task-item');
          task.forEach((element) =>{
              if (element.dataset.taskId === clickedButton.dataset.deleteTaskId) {
                  element.remove();
                  modalWindow.classList.add('modal-overlay_hidden');
                  const index = tasks.findIndex((task)=>{
                      return (task['id'] === element.dataset.taskId);
                  });
                  tasks.splice(index, 1);
                  console.log(tasks);
              };
          });
      });      