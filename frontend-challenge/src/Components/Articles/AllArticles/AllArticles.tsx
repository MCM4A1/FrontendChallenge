import React from 'react'


const getToken = () =>{
    return (document.querySelector(`#jwtToken`) as HTMLInputElement).value
}

const displayMessage = (message: string) =>{
    (document.querySelector(`#messageBox`) as HTMLInputElement).innerText = message
}

const createArticleElementFromData = (article:{author: {username: string}, body: string, description: string, id: string, slug: string, title: string })=>{
    const articleWrap = document.createElement("div")
    articleWrap.setAttribute("id", `Slug: ${article.slug}`)

    const authorElement = document.createElement("input")
    authorElement.setAttribute("name", "author")
    authorElement.setAttribute("value", `Username: ${article.author.username}`)
    articleWrap.appendChild(authorElement)

    const titleElement = document.createElement("input")
    titleElement.setAttribute("name", "title")
    titleElement.setAttribute("value", `Title: ${article.title}`)
    articleWrap.appendChild(titleElement)

    const bodyElement = document.createElement("input")
    bodyElement.setAttribute("name", "body")
    bodyElement.setAttribute("value", `Body: ${article.body}`)
    articleWrap.appendChild(bodyElement)

    const descriptionElement = document.createElement("input")
    descriptionElement.setAttribute("name", "description")
    descriptionElement.setAttribute("value", `Description: ${article.description}`)
    articleWrap.appendChild(descriptionElement)

    const idElement = document.createElement("input")
    idElement.setAttribute("name", "id")
    idElement.setAttribute("value", `Id: ${article.id}`)
    articleWrap.appendChild(idElement)

    const slugElement = document.createElement("input")
    slugElement.setAttribute("name", "slug")
    slugElement.setAttribute("value", `Slug: ${article.slug}`)
    articleWrap.appendChild(slugElement)

    const hr = document.createElement("hr")
    articleWrap.appendChild(hr)


    return articleWrap
}

const showArticles = (data: {articlesCount: string, articles: []}) =>{
    const loadedArticles = document.querySelector(`.loadedArticles`)
    if (loadedArticles)
        loadedArticles.remove()
    
    const loadedArticlesWrap = document.createElement("div")
    loadedArticlesWrap.classList.add("loadedArticles")
    
    const articleCount = document.createElement("h4")
    articleCount.innerText = `Article count: ${data?.articlesCount}`;


    for(let article of data.articles){
        loadedArticlesWrap.appendChild(createArticleElementFromData(article))
    }

    document.querySelector(`#allArticles`)?.appendChild(loadedArticlesWrap)
    
}

const loadAllArticles = () =>{
    const token = getToken()


    window.fetch(`http://localhost:3000/api/articles`, {
        method: 'GET',
        headers: {
            'content-type': 'application/json;charset=UTF-8',
            'Authorization':  `Bearer ${token}`
        },
        }).then((response) => response.json())
        .then((data) => {
            data.errors ? displayMessage("Error getting articles") :  showArticles(data)
    });
}

export default function AllArticles() {
    return (
        <div id="allArticles" className="article">
            <button onClick={loadAllArticles}>Load all articles</button>
        </div>
    )
}
