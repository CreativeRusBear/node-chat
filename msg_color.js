export default function loadColor() {
  const min = 1;
  const max = 3;
  const random = Math.floor(Math.random() * (max - min + 1)) + min;
  let msg_theme;
  switch (random) {
    case 1:
      msg_theme= 'light';
      break;
    case 2:
      msg_theme = 'green';
      break;
    case 3:
      msg_theme = 'yellow';
      break;
    case 4:
      msg_theme = 'dark';
      break;
  }
  return msg_theme;
}