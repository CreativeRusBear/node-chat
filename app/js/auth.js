/**
 * @class
 * @module /app/js/auth
 * @description Class, using for user authorization
 */
export default class Authorization {

	/**
	 * @method
	 * @description Get user's data
	 * @return {Promise<*>} - Authorization data
	 */
	async auth () {
		const {value: text} = await Swal.fire({
			title            : 'Enter your name',
			input            : 'text',
			inputPlaceholder : 'Enter your name',
			inputAttributes  : {
				maxlength      : 15,
				autocapitalize : 'off',
				autocorrect    : 'off',
			},
			inputValidator: value => {
				if (!value) return 'This is a required field.!';
			},
		});
		return text;
	}
}

/*
 * Async function auth () {
 *
 * }
 */