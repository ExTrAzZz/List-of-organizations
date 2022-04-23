/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useSearchParams } from "react-router-dom";
import React from "react";
import ReactDOM from 'react-dom';
import { useState, useEffect } from 'react';
import api from '../../Api/endpoints/auth'
import { checkLogin } from "src/config/checkLogin";
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import ControlMenu from '../../components/ControlMenu/ControlMenu'

const Employee: React.FC = () => {
    checkLogin();
    const [searchParams, setSearchParams] = useSearchParams();
    const [arr, setValue] = useState([{}]); // Массив подразделений 
    const [currentId, setCurrentId] = useState(0); // Id выбранного подразделения
    const [status, setStatus] = useState(false);
    const [inpFIO, setInpFIO] = useState(''); // ФИО в модальном окне
    const [inpAddress, setInpAddress] = useState(''); // Адрес в модальном окне
    const [inpPosition, setInpPosition] = useState(''); // Позиция в модальном окне
    const [modalActive, setModalActive] = useState(false) // Модальное окно


    const idQuery = searchParams.get('id'); // Id организации

    const listOrg = arr.map((data, i) => { // Список огранизаций
        return(
            <li key={i}>
                <div>Id: {data['id']}</div>
                <div>FIO: {data['FIO']}</div>
                <div>Address: {data['address']}</div>
                <div>Position: {data['position']}</div>
                <button onClick={() => {dele(data)}}>Удалить</button>
                <button onClick={() => {setModalActive(true); setCurrentId(data['id']); setStatus(true)}}>Редактировать</button>
            </li>
        )
    })
    
    const dele = (data) => { // Удаление подразделения из БД
        api.delEmployee(data['id']);
        setValue(arr.filter(elem => elem['id']!=data['id']));
    }

    const Inputs = ({state}) => { // Инпуты для модального окна
        return (
            <>
                <div>FIO</div>
                <input type='text' value={state.inpFIO} onChange={event => state.setInpFIO(event.target.value)}></input>
                <div>Address</div>
                <input type='text' value={state.inpAddress} onChange={event => state.setInpAddress(event.target.value)}></input>
                <div>Position</div>
                <input type='text' value={state.inpPosition} onChange={event => state.setInpPosition(event.target.value)}></input>
            </>
        )
    }


    useEffect(() => { // Загрузка списка организаций
        api.getEmployee(idQuery).then(result => result.data)
        .then((result) => {
            setValue(result);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <>
            <ControlMenu state={{setModalActive, setStatus}} />
            <div><ul>{listOrg}</ul></div>
            {ReactDOM.createPortal(<ModalWindow modalState={{modalActive, setModalActive, status }} list={{arr, setValue, currentId}} Inputs={Inputs} inpState={{inpFIO, inpAddress, inpPosition}}
            setInp={{setInpFIO, setInpAddress, setInpPosition}} page={'employee'}  req={{put: api.putEmployee, post: api.postEmployee, get: api.getEmployee}} id={idQuery} />, document.querySelector('body')!)}
        </>
    )
}

export default Employee