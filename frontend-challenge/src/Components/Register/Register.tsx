import React from 'react'

const displayMessage = (message: string) =>{
    (document.querySelector(`#messageBox`) as HTMLInputElement).innerHTML = message

}

const submitRegister = ()=>{
    var email = (document.querySelector(`  [name="email"]`) as HTMLInputElement).value
    var username = (document.querySelector(`  [name="username"]`) as HTMLInputElement).value
    var password = (document.querySelector(`  [name="password"]`) as HTMLInputElement).value
    var passwordRetype = (document.querySelector(`  [name="passwordRetype"]`) as HTMLInputElement).value


    if(password !== passwordRetype)
       return  displayMessage("Passwords do not match")

    var userData = {
        email,
        username,
        password
    }

    checkLoginCredentials(userData)

}



const checkLoginCredentials = (userData: {username: string, email: string; password: string }) =>{
     window.fetch('http://localhost:3000/api/users', {
        method: 'POST',
        headers: {
          'content-type': 'application/json',
        },
        body: JSON.stringify({
            username: userData.username,
            email: userData.email,
            password: userData.password
        }),
      }).then((response) => response.json())
      .then((data) =>{
          data.message ? displayMessage("Registration failed") : displayMessage(`Successful registration you can now log in`)
    }); 
}



export default function Register() {
    return (
        <div className="loginWrap">
            <input type="text" name="username" placeholder="Username"/>
            <input type="text" name="email" placeholder="Email"/>
            <input type="password" name="password" placeholder="Password"/>
            <input type="password" name="passwordRetype" placeholder="Password retype"/>
            <button onClick={submitRegister}>Register</button>
            <div id="messageBox" />
        </div>
    )
}
