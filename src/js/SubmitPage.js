import RenderPage from './RenderPage';
import {
  changeWindow,
  animatedUsers,
} from './position';

export default class SubmitPage {
  constructor() {
    this.modal = new RenderPage();
    this.urlWS = 'wss://chat-vikkelas.herokuapp.com/';
    this.idUsers = null;
    this.chatModal = null;
  }

  init() {
    this.modal.createNickname();
    changeWindow();
    window.addEventListener('resize', () => {
      if (this.modal.modalWindow !== null) {
        changeWindow();
      }
    });
    this.eventWebSocket();
  }

  eventWebSocket() {
    const btn = this.modal.modalWindow.querySelector('.nickname__button');
    const ws = new WebSocket(this.urlWS);
    ws.addEventListener('open', () => {
      btn.addEventListener('click', (e) => {
        e.preventDefault();
        const userName = document.querySelector('.nickname__input').value;
        if (!/^\S.{1,15}\S$/.test(userName)) {
          this.modal.nameError('Не больше 15 без пробелов в конце и начале');
          return;
        }
        const data = {
          type: 'add',
          name: userName,
        };
        ws.send(JSON.stringify(data));
      });
    });
    ws.addEventListener('message', (msg) => {
      const data = JSON.parse(msg.data);
      if (data.type === 'err name use') {
        this.modal.nameError('Это имя уже занято');
      }
      if (data.type === 'create account') {
        this.idUsers = data.id;
        this.modal.deletModal();
        this.modal.createChat();
        animatedUsers();
        const sendBtn = document.querySelector('.chat__btn-send');
        sendBtn.addEventListener('click', (e) => {
          e.preventDefault();
          const sendMessage = document.querySelector('.chat__text-send');
          ws.send(JSON.stringify({
            type: 'new message',
            id: this.idUsers,
            message: sendMessage.value,
            time: new Date().toLocaleString().slice(-8),
          }));
          sendMessage.value = '';
        });
      }
      if (data.type === 'new conection') {
        this.modal.renderUsers(data.data, this.idUsers);
        this.modal.renderMesgStatus(`${data.newClient} присоединился к чату...`);
      }
      if (data.type === 'user disconected') {
        this.modal.renderUsers(data.data, this.idUsers);
        this.modal.renderMesgStatus(`${data.name} покинул чат...`);
      }
      if (data.type === 'new message') {
        this.modal.renderMessage(data, this.idUsers);
      }
    });
  }
}
