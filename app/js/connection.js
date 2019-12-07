import Authorization from './auth.js';
import ColorPicker from './msg_color.js';

/**
 * @class
 * @description Class, that working with web sockets. And based on this, interact with page
 */
class Connection {
	/**
	 * @constructor
	 */
	constructor () {
		this.textarea = document.querySelector('#message');
		this.btn = document.querySelector('button');
		this.chatForm = document.querySelector('.all__messages');
	}

	/**
	 * @method
	 */
	async getAuthData () {
		this.authUser = await new Authorization().auth();
		this.webSocketsWork();
	}

	/**
	 * @method
	 * @description Render new message on form
	 * @param {String} text - new message with html tag
	 */
	changeChatForm (text) {
		this.chatForm.innerHTML+=text;
	}

	/**
	 * @method
	 */
	webSocketsWork () {
		this.theme = new ColorPicker().getColorTheme();
		this.socket=io.connect({query: {'name': this.authUser}});
		this.btn.onclick = () => {
			if (!this.textarea.value.trim()) return false;
			this.socket.emit('send', {name: this.authUser, msg: this.textarea.value, msg_theme: this.theme});
			this.textarea.value='';
		};
		this.socket.on('connect_user', user =>
			this.changeChatForm(`<p class="connect">User ${user} has been connected</p>`)
		);

		this.socket.on('disconnect_user', user =>
			this.changeChatForm(`<p class="disconnect">User ${user} has been disconnected</p>`)
		);

		this.socket.on('add_msg', ({msg}) => {
			const messageTemplate = `
            <div class="${msg.msg_theme}">
                <h6>${msg.name}:</h6>
                <p>${msg.msg}</p>
            </div>`;
			this.changeChatForm(messageTemplate);
		});
	}

}

const connection = new Connection();
connection.getAuthData();




