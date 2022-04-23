import axios from 'axios';
import React from 'react';

async function authorizeRequest (url:string, data:object) {
    const resp = await axios({
        url: url,
        method: 'post',
        data: JSON.stringify(data),
        headers: {
            'Content-Type':'application/json'
        }
    }).then((response) => {  
        if (response.status !== 200) {  // Проверка подключения к API
            console.log('Looks like there was a problem. Status Code: ' +  
            response.status);  
            throw new Error("Status");  
        }
        return response.data
    })  
    return resp;

}

const pullAuthorizeData = (login:string, password:string) => {  // Добавить login: string, password: string
    const url = 'http://127.0.0.1:4000/authorize'; // ip подключения для авторизации
    const data = { // Тестовое значение
        loginData: {
            'login': login,
            'password': password
        }
    }
    return authorizeRequest(url, data) // Статус авторизации;
}

async function Click(login:string, password:string, navigate, checked:boolean) {
    let isLogin;
    await pullAuthorizeData(login, password).then(data => {isLogin = data.isLogin});
    if (isLogin && checked) {
        localStorage.setItem('isLogin', <string>isLogin);
        localStorage.setItem('isRemember', 'true');  // Авторизация с запоминанем
        navigate('/organization');
    } else if (isLogin) {
        localStorage.setItem('isLogin', <string>isLogin);
        navigate('/organization')
    }
}


export default Click;