import React from 'react'
import { useNavigate, useLocation } from "react-router-dom";
import "./style.css"


export const Header = () => {
    const navigate = useNavigate();

    const goHome = () => {
        navigate("/");
        localStorage.removeItem('isLogin'); // Выйти из аккаунта
        localStorage.removeItem('isRemember'); // Выйти из аккаунта
    };

    return (
        <div className="header">
            <button onClick={goHome}>Выход</button>   
        </div>)
}