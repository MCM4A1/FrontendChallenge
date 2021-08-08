import React from 'react';
import { render, screen } from '@testing-library/react';
import LoginPage from '../Components/LoginPage/LoginPage';
import Profile from '../Components/Profile/Profile'
import Register from '../Components/Register/Register'
import ListOrDelete from '../Components/ListOrDelete/ListOrDelete';
import Navigation from '../Components/Navigation/Navigation'
import AllArticles from '../Components/Articles/AllArticles/AllArticles';
import CreateArticle from '../Components/Articles/CreateArticle/CreateArticle';
import UpdateOrDeleteArticle from '../Components/Articles/UpdateOrDeleteArticle/UpdateOrDeleteArticle';



describe("FindPages", () => {
    test("Navigation", async () => {
      <Navigation />
    });
    test("Loginpage", async () => {
      <LoginPage />
    });
    test("Profile", async () => {
      <Profile />
    });
    test("Register", async () => {
      <Register />
    });
    test("ListOrDelete", async () => {
      <ListOrDelete />
    });
    test("AllArticles", async () => {
      <AllArticles />
    });
    test("CreateArticle", async () => {
      <CreateArticle />
    });
    test("UpdateOrDeleteArticle", async () => {
      <UpdateOrDeleteArticle />
    });
    test("This should fail (Component does not exist)", async () => {
      <FavoriteArticle />
    });
  });