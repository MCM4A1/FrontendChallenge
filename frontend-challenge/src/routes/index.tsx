import React from 'react'
import { Route, BrowserRouter, Switch} from "react-router-dom";
import LoginPage from '../Components/LoginPage/LoginPage';
import Profile from '../Components/Profile/Profile';
import Register from '../Components/Register/Register';
import ListOrDelete from '../Components/ListOrDelete/ListOrDelete';
import UserData from '../Components/UserData/UserData';
import Navigation from '../Components/Navigation/Navigation';
import CreateArticle from '../Components/Articles/CreateArticle/CreateArticle';
import AllArticles from '../Components/Articles/AllArticles/AllArticles';
import UpdateOrDeleteArticle from '../Components/Articles/UpdateOrDeleteArticle/UpdateOrDeleteArticle';


export default function Routes() {
    return (
        <BrowserRouter>
            <Navigation />
            <Switch>
                <Route path="/" exact>
                    <LoginPage />
                </Route>
                <Route path="/profile" exact>
                    <Profile />
                </Route>
                <Route path="/edit" exact>
                    <Profile />
                </Route>
                <Route path="/register" exact>
                    <Register />
                </Route>
                <Route path="/list" exact>
                    <ListOrDelete />
                </Route>
                <Route path="/article/create" exact>
                    <CreateArticle />
                </Route>
                <Route path="/article/all" exact>
                    <AllArticles />
                </Route>
                <Route path="/article/update" exact>
                    <UpdateOrDeleteArticle />
                </Route>
            </Switch>
            <UserData />
        </BrowserRouter>
    );
}

