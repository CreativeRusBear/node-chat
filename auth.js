export default async function auth() {
  const {value: text} = await Swal.fire({
    title: 'Enter your name',
    input: 'text',
    inputPlaceholder: 'Enter your name',
    inputAttributes: {
      maxlength: 15,
      autocapitalize: 'off',
      autocorrect: 'off'
    },
    inputValidator: (value) => {
      if (!value) return 'This is a required field.!';
    },
  });
  return text;
}