/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
import React from "react"
import { useState, useEffect } from "react";
import { addList, changeList, createObjectPage } from "./functions";
import './modal.css'

const closeModal = (setModalActive, inp) => { // Функция для закрытия и очистки модального окна
    for (const key in inp) {
        inp[key]('');
    }
    setModalActive(false);
}

const ModalWindow = ({modalState, list, Inputs, inpState, setInp, page, req, id}) => { // Модальное окно
    const [obj, setObj] = useState({});
    
    const changeOrAdd = (isChange) => {
        if (isChange)
            changeList(obj, list.currentId, list, req.put)
        else {
            addList(obj, list, req.get, req.post, id).catch(error => console.log(error));
        }
    }
    useEffect(() => {
        setObj(createObjectPage({...inpState, id}, page));
    }, [inpState])

    return (
        <div className={modalState.modalActive?"modal active":"modal"} onClick={() => closeModal(modalState.setModalActive, setInp)}>
            <div className="modal__content" onClick={e => e.stopPropagation()}>
                <Inputs state={{...inpState, ...setInp}}/>
                <button onClick={() => closeModal(modalState.setModalActive, setInp)}>Cancel</button>
                <button onClick={() => {changeOrAdd(modalState.status); closeModal(modalState.setModalActive, setInp)}}>Add</button>
            </div> 
        </div>
    )
}

export default ModalWindow