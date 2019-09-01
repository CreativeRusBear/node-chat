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
        const socket=io.connect();
        btn.onclick = () => {
          if (!textarea.value.trim()) return false;
          socket.emit('send', {name, msg: textarea.value, msg_theme: theme});
          textarea.value='';
        };

        socket.on('add_msg', ({msg})=>{
          chatForm.innerHTML += `
            <div class="${msg.msg_theme}">
                <h6>${msg.name}:</h6>
                <p>${msg.msg}</p>
            </div>`
        });
      })
      .catch((e)=> {
        throw new Error(e)
      });
})();






