/**
 * @class
 * @module /app/js/msg_color
 * @description Pick random color theme for message
 */
export default class ColorPicker {
	/**
	 * @constructor
	 * @description Find random number in a given interval, that serve for pick random color theme
	 * @param {Number} min - Min number
	 * @param {Number} max - Max number
	 */
	constructor (min = 1, max= 4) {
		this.random = Math.floor(Math.random() * (max - min + 1)) + min;
	}

	/**
	 * @method
	 * @description select color based on random number
	 * @return {string} - name of class
	 */
	getColorTheme () {
		switch (this.random) {
		case 1 :
			return 'light';
		case 2 :
			return 'green';
		case 3 :
			return 'yellow';
		case 4 :
			return 'dark';
		}
	}

}