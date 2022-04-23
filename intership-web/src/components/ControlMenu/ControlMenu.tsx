import React from 'react';
import { useNavigate } from "react-router-dom";
import { Header } from '../Header/Header';

const ControlMenu = ({state}) => { // Глвное меню с добавлением организаций и выходом назад
    const navigate = useNavigate()
    return (
        <>
            <Header />
            <div className="controlMenu">
                <button onClick={() => {navigate(-1)}}>Back</button>
                <button onClick={() => {state.setModalActive(true); state.setStatus(false)}}>Add</button>
            </div>
        </>
    )
 }

export default ControlMenu