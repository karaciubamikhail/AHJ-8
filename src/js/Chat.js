export class Chat {
    constructor(element){
        this.element = element;
        this.wsAdress = ('ws://localhost:3000/ws');
        this.user 
    }
    static createElement (tag,className,content){
        let element = document.createElement (tag);
        if(className || className !=null){
            element.classList.add(className);
        }
        if(content || content !=null){
            element.textContent = content;
        }
        return element;
    }
    start(){
        const chat = this.element;
        const windowAdd = Chat.createElement('div','chat_add',null);
        const windowAddHeader = Chat.createElement('h3','chat-add__header','Выберите имя');
        const windowAddinput = Chat.createElement('input','chat-add__input',null);
        const windowAddBtn = Chat.createElement('button','chat-add__button','Отправить');
        windowAdd.appendChild(windowAddHeader);
        windowAdd.appendChild(windowAddinput );
        windowAdd.appendChild(windowAddBtn);
        chat.appendChild(windowAdd);
        windowAddBtn.addEventListener('click',()=>{
            /*const userList = this.element.querySelector('.chat-users')
            const user = Chat.createElement('div','chat-users__user');
            const userName = Chat.createElement('p','chat-users__user__name',windowAddinput.value);
            user.appendChild(userName);
            userList.appendChild(user);*/
            let data = JSON.stringify({name:windowAddinput.value})
            let usersadd = fetch('http://localhost:3000/new-user',{
                method:'post',
                body:data,
                headers: {
                    'Content-Type': 'application/json;charset=utf-8'
                  },
            });
            usersadd.then((data)=>{
                console.log(data.status)
                if(data.status == 200){
                    this.user = windowAddinput.value;
                    windowAdd.remove();
                    this.message();
                    this.getUsers();
                }else{
                    const windowAddError = Chat.createElement('p','chat-add__error','Такой пользователь есть');
                    windowAdd.appendChild(windowAddError );
                }
            })
        })
    }
    async getUsers(){
        let res = await fetch('http://localhost:3000/get-user');
        let users = await res.json()
        users.forEach(element => {
            const userList = this.element.querySelector('.chat-users')
            const user = Chat.createElement('div','chat-users__user');
            const userName = Chat.createElement('p','chat-users__user__name',element.name);
            user.setAttribute('id',element.id);
            user.appendChild(userName);
            userList.appendChild(user);
        });
    }
    message (){
        const ws = new WebSocket(this.wsAdress);
        const messageinput = this.element.querySelector('.chat-messages__form__input');
        const messagebtn = this.element.querySelector('.chat-messages__form_button');
        messagebtn.addEventListener('click',(e)=>{
            e.preventDefault()
            let data = {
                type:'send',
                user:this.user,
                message:messageinput.value}
                ws.send(JSON.stringify(data))
                messageinput.value = ''
        })
        ws.addEventListener('message',(e)=>{
            let data = JSON.parse(e.data);
            console.log(data.message)
            const messageList = this.element.querySelector('.chat-messages-list');
            const messageItem = Chat.createElement('div','chat-messages-list__item',null);
            const messageItemName = Chat.createElement('div','chat-messages__list__item__name',data.user);
            const messageItemMessage = Chat.createElement('div','chat-messages__list__item__message',data.message);
            messageItem.appendChild(messageItemName);
            messageItem.appendChild(messageItemMessage);
            messageList.appendChild(messageItem);
            if(data.user!=this.user){
                messageItem.classList.add('left')
            }
        })
        window.addEventListener('beforeunload',()=>{
            let data = {
                type:'exit',
                user:this.user}
                ws.send(JSON.stringify(data))
        })
    }
}