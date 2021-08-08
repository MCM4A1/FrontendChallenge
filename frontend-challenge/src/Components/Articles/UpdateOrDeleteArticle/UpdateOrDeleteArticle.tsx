import React from 'react'

const getToken = () =>{
    return (document.querySelector(`#jwtToken`) as HTMLInputElement).value
}

const displayMessage = (message: string) =>{
    (document.querySelector(`#messageBox`) as HTMLInputElement).innerText = message
}

const loadArticleValues = (article: {id: string, slug: string, title: string, description: string, body: string, tagList: [string]})=>{

   const titleElement = (document.querySelector(`[name="title"]`) as HTMLInputElement)
   titleElement.value = article.title
   const slugElement = (document.querySelector(`[name="slug"]`) as HTMLInputElement)
   slugElement.value = article.slug
   const descriptionElement = (document.querySelector(`[name="desc"]`) as HTMLInputElement)
   descriptionElement.value = article.description
   const bodyElement = (document.querySelector(`[name="body"]`) as HTMLInputElement)
   bodyElement.value = article.body
   const tagListElement = (document.querySelector(`[name="taglist"]`) as HTMLInputElement)
   tagListElement.value = article.tagList.join(",") 

   displayMessage("Article loaded")

}

const loadArticle = ()=>{
    const slug = (document.querySelector(`[name="slug"]`) as HTMLInputElement).value
    if(!slug)
        displayMessage("Missing slug")

    const token = getToken()

    window.fetch(`http://localhost:3000/api/articles/${slug}`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Authorization':  `Bearer ${token}`
        },
        }).then((response) => response.json())
        .then((data) => {
        data.errors ? displayMessage("Error updating article") : data.statusCode===404 ? displayMessage("Article not found") : data.statusCode===401 ? displayMessage("Unauthorized, please log in") :loadArticleValues(data.article)
    });
    
}

const submitArticleUpdate = () =>{
    const title = (document.querySelector(`[name="title"]`) as HTMLInputElement).value
    const slug = (document.querySelector(`[name="slug"]`) as HTMLInputElement).value
    const desc = (document.querySelector(`[name="desc"]`) as HTMLInputElement).value
    const body = (document.querySelector(`[name="body"]`) as HTMLInputElement).value
    const taglist = (document.querySelector(`[name="taglist"]`) as HTMLInputElement).value
    const tagListArray = taglist.split(",")

    const postBody = {
        title, 
        description: desc,
        body,
        tagList: tagListArray,
    }


    const token = getToken()

    window.fetch(`http://localhost:3000/api/articles/${slug}`, {
        method: 'PUT',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Authorization':  `Bearer ${token}`
        },
        body: JSON.stringify(postBody),
      }).then((response) => response.json())
      .then((data) => {
        data.errors ? displayMessage("Error updating article") : data.statusCode===404 ? displayMessage("Article not found") : data.statusCode===401 ? displayMessage("Unauthorized, please log in") : displayMessage("Article updated")
    });
}

const submitArticleDelete = () =>{
    const slug = (document.querySelector(`[name="slug"]`) as HTMLInputElement).value
    const token = getToken()

    window.fetch(`http://localhost:3000/api/articles/${slug}`, {
        method: 'DELETE',
        headers: {
          'content-type': 'application/json;charset=UTF-8',
          'Authorization':  `Bearer ${token}`
        },
      }).then((response) => response.json())
      .then((data) => {
        data.errors ? displayMessage("Error deleting article") :  data.statusCode===404 ? displayMessage("Article not found") : data.statusCode===401 ? displayMessage("Unauthorized, please log in") : displayMessage("Article deleted")
    });
}

export default function UpdateOrDeleteArticle() {
    return (
        <div className="article">
            <h3>Update article</h3>
            <input type="text" name="slug"  placeholder="Slug example: mytitle2 - hpouml"/>
            <button onClick={loadArticle}>Load article</button>
            <input type="text" name="title" placeholder="Title"/>
            <input type="text" name="desc" placeholder="Desc"/>
            <input type="text" name="body" placeholder="Body"/>
            <input type="text" name="taglist" placeholder="Taglist, separated by comma"/>
            <button onClick={submitArticleUpdate}>Update article</button>
            <button onClick={submitArticleDelete}>Delete article</button>
            <div id="messageBox" />

        </div>
    )
}
