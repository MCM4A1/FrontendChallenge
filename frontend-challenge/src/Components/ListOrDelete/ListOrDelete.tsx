import React from 'react'

export default function ListOrDelete() {

    const displayMessage = (message: string) =>{
        (document.querySelector(`#messageBox`) as HTMLInputElement).innerHTML = message
    }

    const getToken = () =>{
        return (document.querySelector(`#jwtToken`) as HTMLInputElement).value
    }

    const deleteUser = () =>{
        const userToDeleteInput = (document.querySelector(`  [name="userToDelete"]`) as HTMLInputElement).value
        const token = getToken()

        window.fetch(`http://localhost:3000/api/users/${userToDeleteInput}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Authorization':  `Bearer ${token}`
        },
      }).then((response) => response.json())
      .then((data) => {
        data.errors ? displayMessage(data.errors.User) :data.statusCode===400 ? displayMessage("You can't delete yourself") : data.statusCode===401 ? displayMessage("Not authorized, please log in") : data.statusCode===404 ? displayMessage("User not found"): displayMessage("Successful deletion")
    });
    }

    const showUserData = (data: {username: string, bio: string, image: string}) =>{
    const userNameInput = (document.querySelector(`  [name="username"]`) as HTMLInputElement)
    const bioInput = (document.querySelector(`  [name="bio"]`) as HTMLInputElement)
    const imageInput = (document.querySelector(`  [name="image"]`) as HTMLInputElement)

    userNameInput.value = data.username
    bioInput.value = data.bio
    imageInput.value = data.image
}
    

    const loadOtherUser = () =>{
        var profileName = (document.querySelector(`  [name="otherUserName"]`) as HTMLInputElement).value
    
        window.fetch(`http://localhost:3000/api/profiles/${profileName}`, {
            method: 'GET',
            headers: {
              'content-type': 'application/json',
            }
          }).then((response) => response.json())
          .then((data) =>{
              data.errors ? displayMessage(data.errors.User)  : data.statusCode===401 ? displayMessage("Not authorized, please log in") : data.statusCode===404 ? displayMessage("User not found") :  showUserData(data.profile);
        }); 
    }

        return (
            <div className="loginWrap">
                <label htmlFor="otherUserName">Name of User</label>
                <input type="text" name="otherUserName"/>
                <button onClick={loadOtherUser}>Load user</button>
                <br />
                <label htmlFor="username">Requested user</label>
                <input type="text" name="username" />
                <label htmlFor="image">Bio</label>
                <input type="text" name="bio" />
                <label htmlFor="image">Image</label>
                <input type="text" name="image" />
                <br />
                <label htmlFor="userToDelete"> User Deletion via email </label>
                <input type="text" name="userToDelete" />
                <button onClick={deleteUser}>Delete user</button>
                <div id="messageBox" />
            </div>
        )
}

