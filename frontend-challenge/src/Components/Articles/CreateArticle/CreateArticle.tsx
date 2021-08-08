import React from 'react'

const getToken = () =>{
    return (document.querySelector(`#jwtToken`) as HTMLInputElement).value
}

const displayMessage = (message: string) =>{
    (document.querySelector(`#messageBox`) as HTMLInputElement).innerText = message
}

const submitArticleCreate = () =>{
    const title = (document.querySelector(`[name="title"]`) as HTMLInputElement).value
    const desc = (document.querySelector(`[name="desc"]`) as HTMLInputElement).value
    const body = (document.querySelector(`[name="body"]`) as HTMLInputElement).value
    const taglist = (document.querySelector(`[name="taglist"]`) as HTMLInputElement).value

    if(!title || !desc || !body || !taglist)
        return displayMessage("FE Validation: Missing data")

    const tagListArray = taglist.split(",")

    const postBody = {
        title, 
        description: desc,
        body,
        tagList: tagListArray,
    }


    const token = getToken()

    window.fetch('http://localhost:3000/api/articles', {
        method: 'POST',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Authorization':  `Bearer ${token}`
        },
        body: JSON.stringify(postBody),
      }).then((response) => response.json())
      .then((data) => {
        data.errors ? displayMessage("Error creating article") : data.statusCode===401 ? displayMessage("Not authorized, please log in") : displayMessage("Article created")
    });
}

export default function CreateArticle() {
    return (
        <div className="article" id="createArticle">
            <h3>Create Article</h3>
            <input type="text" name="title" placeholder="Title"/>
            <input type="text" name="desc" placeholder="Description"/>
            <input type="text" name="body" placeholder="Body"/>
            <input type="text" name="taglist" placeholder="Taglist, separated by comma"/>
            <button onClick={submitArticleCreate}>Create</button>
            <div id="messageBox" />
        </div>
    )
}
