import auth from './auth.js';
import loadColor from './msg_color.js';
const textarea = document.querySelector('#message');
const btn = document.querySelector('button');
const chatForm = document.querySelector('.all__messages');

(function() {
  const theme=loadColor();
  auth()
      .then((data)=>{
        const name=data;
        const socket=io.connect({query: {'name':name}});
        btn.onclick = () => {
          if (!textarea.value.trim()) return false;
          socket.emit('send', {name, msg: textarea.value, msg_theme: theme});
          textarea.value='';
        };
        socket.on('connect_user', (user)=>{
          changeChatForm(`<p class="connect">User ${user} has been connected</p>`);
        });

        socket.on('disconnect_user', (user)=>{
          changeChatForm(`<p class="disconnect">User ${user} has been disconnected</p>`);
        });

        socket.on('add_msg', ({msg})=>{
          const messageTemplate = `
            <div class="${msg.msg_theme}">
                <h6>${msg.name}:</h6>
                <p>${msg.msg}</p>
            </div>`;
          changeChatForm(messageTemplate);
        });
      })
      .catch((e)=> {
        throw new Error(e)
      });
})();

function changeChatForm(text){
  chatForm.innerHTML+=text;
}






