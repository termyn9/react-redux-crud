// проверка хранилища на наличие user-элемента и его авторизации 
// условия выполняются -> вернуть HTTP-заголовок авторизации

export default function authHeader() {
    const user = JSON.parse(localStorage.getItem('user'));
  
    if (user && user.accessToken) {
        // for Node.js Express back-end
      return { 'x-access-token': user.accessToken };
    } else {
      return {};
    }
  }