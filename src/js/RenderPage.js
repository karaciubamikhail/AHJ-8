import iconBack from '../assets/img/back-arrow.png';
import iconNext from '../assets/img/right-arrow.png';
import arrImg from './userIcon';

export default class RenderPage {
  constructor() {
    this.conteiner = null;
    this.modalWindow = null;
    this.chat = null;
    this.chatUsersZero = null;
    this.chatUsers = null;
    this.userIcon = arrImg;
  }

  createNickname() {
    this.connteiner = document.querySelector('.conteiner');
    this.modalWindow = document.createElement('div');
    this.modalWindow.classList.add('nickname');
    this.modalWindow.insertAdjacentHTML('beforeend', `
      <div class="nickname__title">Выберите псевдоним</div>
      <form class="nickname__form" id="nickname__form">
         <input name="name" type="text" class="nickname__input">
         <button class="nickname__button">Продолжить</button>
      </form>`);
    this.connteiner.insertAdjacentElement('beforeend', this.modalWindow);
  }

  deletModal() {
    this.connteiner.removeChild(this.modalWindow);
    this.modalWindow = null;
  }

  nameError(text) {
    const err = document.createElement('div');
    err.classList.add('error-message');
    err.innerText = text;
    this.modalWindow.insertAdjacentElement('beforeend', err);
    setTimeout(() => {
      this.modalWindow.removeChild(err);
    }, 2000);
  }

  createChat() {
    this.chat = document.createElement('div');
    this.chat.classList.add('chat');
    this.chat.insertAdjacentHTML('beforeend', `
    <div class="chat__users">
      <img src="${iconBack}" class="chat__btn chat__btn--close"></img>
      <div class="chat__user-conteiner"></div>            
    </div> 
    <div class="chat__main">
    <img src="${iconNext}" class="chat__btn chat__btn--open chat__btn--active"></img>
    <div class="chat__messages"></div>
    <form id="chat__form" class="chat__form">
       <input name="message" type="text" class="chat__text-send">
       <button class="chat__btn-send">Отправить</button>
    </form>
    </div>`);
    this.connteiner.insertAdjacentElement('beforeend', this.chat);
    this.chatUsers = document.querySelector('.chat__user-conteiner');
    this.chatMessages = document.querySelector('.chat__messages');
  }

  renderUsers(users, id) {
    this.chatUsers.innerHTML = '';
    users.forEach((item) => {
      let youname = '';
      let nameyou = item.name;
      if (id === item.id) {
        youname = 'chat__users--you';
        nameyou = 'You';
      }
      const user = document.createElement('div');
      user.classList.add('chat__user');
      user.insertAdjacentHTML('beforeend', `
      <img class="chat__img" src="${this.userIcon[item.idIcon]}" alt="">
      <div class="chat__name ${youname}">${nameyou}</div>
      `);
      this.chatUsers.insertAdjacentElement('beforeend', user);
    });
  }

  renderMesgStatus(messages) {
    const msg = document.createElement('div');
    msg.classList.add('msgStatus');
    msg.innerText = messages;
    this.chatMessages.insertAdjacentElement('beforeend', msg);
  }

  renderMessage(users, id) {
    console.log(users);
    let nameUser = users.name;
    let userClass = 'message';
    if (id === users.id) {
      nameUser = 'You';
      userClass = 'message--you';
    }
    const message = document.createElement('div');
    message.classList.add('message');
    if (userClass === 'message--you') {
      message.classList.add(userClass);
    }
    message.insertAdjacentHTML('beforeend', `
    <div class="message__title">
    <div class="message__name">${nameUser}</div>
    <div class="message__date">${users.time}</div>
 </div>
 <div class="message__main">${users.message}</div>
    `);
    this.chatMessages.insertAdjacentElement('beforeend', message);
  }
}
