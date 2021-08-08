import React from 'react'
import './login.css'

const displayMessage = (message: string) =>{
    (document.querySelector(`#messageBox`) as HTMLInputElement).innerText = message
}

const storeToken = (token: string) =>{
    (document.querySelector(`#jwtToken`) as HTMLInputElement).value = token;
    displayMessage("Successful login, you can now view you profile.")
}



const submitLogin = ()=>{
    var email = (document.querySelector(`  [name="email"]`) as HTMLInputElement).value
    var password = (document.querySelector(`  [name="password"]`) as HTMLInputElement).value

    if(!email || !password)
       return  displayMessage("No email or password")
    

    var userData = {
        email,
        password
    }

    checkLoginCredentials(userData)
}

const checkLoginCredentials = (userData: { email: string; password: string }) =>{
    window.fetch('http://localhost:3000/api/login', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
        },
        body: JSON.stringify({
            email: userData.email,
            password: userData.password
        }),
      }).then((response) => response.json())
      .then((data) => {
        data.errors ? displayMessage("Login error") : storeToken(data.user.token)
    });
}



export default function LoginPage() {


        return (
            <div className="loginWrap">
                <input type="text" placeholder="E-mail" name="email"/>
                <input type="password" placeholder="Password" name="password"/>
                <button name="login" onClick={submitLogin}>
                    Login
                </button>
                <div id="messageBox" />
            </div>
        )
}

