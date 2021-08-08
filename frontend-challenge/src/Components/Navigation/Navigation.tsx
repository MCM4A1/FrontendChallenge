import React from 'react'
import { Link } from 'react-router-dom'
import './navigation.css'

export default function Navigation() {
    return (
        <div className="navWrap">
            <Link to="/" >Login</Link>
            <Link to="/profile" >Profile</Link>
            <Link to="/register" >Register</Link>
            <Link to="/list" >List or delete account</Link>
            <Link to="/article/create" >Create article</Link>
            <Link to="/article/all" >All articles</Link>
            <Link to="/article/update" >Update article</Link>
        </div>
    )
}
