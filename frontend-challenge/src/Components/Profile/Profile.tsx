import React from 'react'
import './profile.css'

const displayMessage = (message: string) =>{
    (document.querySelector(`#messageBox`) as HTMLInputElement).innerHTML = message
}

const getToken = () =>{
    return (document.querySelector(`#jwtToken`) as HTMLInputElement).value
}

const showData = (user: {bio: string, email: string, id: string, image: string, username: string,})=>{
    (document.querySelector(`[name="bio"]`) as HTMLInputElement).value = user.bio;
    (document.querySelector(`[name="email"]`) as HTMLInputElement).value = user.email;
    (document.querySelector(`[name="id"]`) as HTMLInputElement).value = user.id;
    (document.querySelector(`[name="username"]`) as HTMLInputElement).value = user.username;
    (document.querySelector(`[name="image"]`) as HTMLInputElement).value = user.image;

}

const updateYourself = ()=>{
    let bio = (document.querySelector(`[name="bio"]`) as HTMLInputElement).value
    let email = (document.querySelector(`[name="email"]`) as HTMLInputElement).value
    let username = (document.querySelector(`[name="username"]`) as HTMLInputElement).value
    let image = (document.querySelector(`[name="image"]`) as HTMLInputElement).value
    const token = getToken()

    window.fetch('http://localhost:3000/api/user', {
        method: 'PUT',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Authorization':  `Bearer ${token}`
        },
        body: JSON.stringify({
            username: username,
            email: email,
            bio: bio,
            image: image,
        }),
      }).then((response) => response.json())
      .then((data) => {
        data.errors ? displayMessage("Login error") : data.errors ? displayMessage(data.errors.User) : data.statusCode===401 ? displayMessage("Not authorized, please log in") :  displayMessage("profile updated")
    });
}

const loadYourself = () =>{
    const token = getToken()
    
    window.fetch(`http://localhost:3000/api/user`, {
        method: 'GET',
        headers: {
          'content-type': 'application/json',
          'Authorization':  `Bearer ${token}`
        }
      }).then((response) => response.json())
      .then((data) =>{
            data.error ? displayMessage(data.message) : data.statusCode===401 ? displayMessage("Not authorized") : showData(data.user)
    }); 
}

export default function Profile() {    
        return (
            <div className="loginWrap">
                <h3>Profile</h3>
                <label htmlFor="username">Username</label>
                <input type="text" name="username" />
                <label htmlFor="bio">Bio</label>
                <input type="text" name="bio" />
                <label htmlFor="email">Email</label>
                <input type="text" name="email" />
                <label htmlFor="image">Image</label>
                <input type="text" name="image" />
                <label htmlFor="id">Id</label>
                <input type="number" name="id" />
                <button onClick={loadYourself}>Load your data</button>
                <div id="messageBox" />
                <button onClick={updateYourself}>Update your data</button>
            </div>
        )
}

