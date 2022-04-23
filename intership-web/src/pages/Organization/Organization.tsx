/* eslint-disable jsx-a11y/no-static-element-interactions */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable @typescript-eslint/no-unsafe-argument */
import React from 'react';
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react';
import { useNavigate } from "react-router-dom";
import api from '../../Api/endpoints/auth'
import { checkLogin } from "Src/config/checkLogin";
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import ControlMenu from '../../components/ControlMenu/ControlMenu'

const Organization: React.FC = () => {
    checkLogin();
    const [arr, setValue] = useState([{}]); // Массив организаций 
    const [currentId, setCurrentId] = useState(0); // Id выбранной организации
    const [status, setStatus] = useState(false);
    const [inpName, setInpName] = useState(''); // Name в модальном окне
    const [inpAddress, setInpAddress] = useState(''); // Адрес в модальном окне
    const [inpINN, setInpINN] = useState(''); // ИНН в модальном окне


    const navigate = useNavigate()

    const [modalActive, setModalActive] = useState(false) // Модальное окно

    const listOrg = arr.map((data, i) => { // Список огранизаций
        return(
            <li key={i}>
                <div>Id: {data['id']}</div>
                <div>Name: {data['name']}</div>
                <div>Address: {data['address']}</div>
                <div>INN: {data['INN']}</div>
                <button onClick={() => {dele(data)}}>Удалить</button>
                <button onClick={() => {setModalActive(true); setCurrentId(data['id']); setStatus(true)}}>Редактировать</button>
                <button onClick={() => {navigate(`division/?id=${data['id']}`)}}>{"-->"}</button>
            </li>
        )
    })
    
    const dele = (data) => { // Удаление организации из списка
        api.delOrganization(data['id']);
        const arr2 = arr.filter(data2 => data2['id']!=data['id']);
        setValue(arr2);
    }

    const Inputs = ({state}) => {
        return (
            <>
                <div>Name</div>
                <input type='text' value={state.inpName} onChange={event => state.setInpName(event.target.value)}></input>
                <div>Address</div>
                <input type='text' value={state.inpAddress} onChange={event => state.setInpAddress(event.target.value)}></input>
                <div>INN</div>
                <input type='text' value={state.inpINN} onChange={event => state.setInpINN(event.target.value)}></input>
            </>
        )
    }

    useEffect(() => { // Загрузка списка организаций
        api.getOrganization().then(result => result.data)
        .then((result) => {
            setValue(result);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <>
            <ControlMenu state={{setModalActive, setStatus}} />
            <ul>{listOrg}</ul>
            {ReactDOM.createPortal(<ModalWindow modalState={{modalActive, setModalActive, status }} list={{arr, setValue, currentId}} Inputs={Inputs} 
            inpState={{inpName, inpAddress, inpINN}} setInp={{setInpName, setInpAddress, setInpINN}} page={'organization'} 
            req={{put: api.putOrganization, post: api.postOrganization, get: api.getOrganization}} id={undefined}/>, document.querySelector('body')!)}
        </>
    )
}
export default Organization