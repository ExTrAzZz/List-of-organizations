/* eslint-disable @typescript-eslint/no-unsafe-argument */
import { useSearchParams, useNavigate } from "react-router-dom";
import React from 'react';
import ReactDOM from 'react-dom'
import { useState, useEffect } from 'react';
import api from '../../Api/endpoints/auth'
import { checkLogin } from "src/config/checkLogin";
import ModalWindow from '../../components/ModalWindow/ModalWindow'
import ControlMenu from '../../components/ControlMenu/ControlMenu'

const Division: React.FC = () => {
    checkLogin();
    const [searchParams, setSearchParams] = useSearchParams();
    const [arr, setValue] = useState([{}]); // Массив подразделений 
    const [currentId, setCurrentId] = useState(0); // Id выбранного подразделения
    const [status, setStatus] = useState(false);
    const [inpName, setInpName] = useState(''); // Name в модальном окне
    const [inpPhone, setInpPhone] = useState(''); // Телефон в модальном окне
    const [modalActive, setModalActive] = useState(false) // Модальное окно


    const idQuery = searchParams.get('id'); // Id организации
    const navigate = useNavigate()

    const listOrg = arr.map((data, i) => { // Список огранизаций
        return(
            <li key={i}>
                <div>Id: {data['id']}</div>
                <div>Name: {data['name']}</div>
                <div>Phone: {data['phone']}</div>
                <button onClick={() => {dele(data)}}>Удалить</button>
                <button onClick={() => {setModalActive(true); setCurrentId(data['id']); setStatus(true)}}>Редактировать</button>
                <button onClick={() => {navigate(`employee/?id=${data['id']}`)}}>{"-->"}</button>
            </li>
        )
    })
    
    const dele = (data) => { // Удаление подразделения из БД
        api.delDivision(data['id']);
        setValue(arr.filter(elem => elem['id']!=data['id']));
    }

    const Inputs = ({state}) => { // Инпуты для модального окна
        return (
            <>
                <div>Name</div>
                <input type='text' value={state.inpName} onChange={event => state.setInpName(event.target.value)}></input>
                <div>Phone</div>
                <input type='text' value={state.inpPhone} onChange={event => state.setInpPhone(event.target.value)}></input>
            </>
        )
    }


    useEffect(() => { // Загрузка списка организаций
        api.getDivision(idQuery).then(result => result.data)
        .then((result) => {
            setValue(result);
        })
        .catch(error => console.log(error));
    }, [])

    return (
        <>
            <ControlMenu state={{setModalActive, setStatus}} />
            <div><ul>{listOrg}</ul></div>
            {ReactDOM.createPortal(<ModalWindow modalState={{modalActive, setModalActive, status }} list={{arr, setValue, currentId}} 
            Inputs={Inputs} inpState={{inpName, inpPhone}} setInp={{setInpName, setInpPhone}} page={'division'} 
            req={{put: api.putDivision, post: api.postDivision, get: api.getDivision}} id={idQuery} />, document.querySelector('body')!)}
        </>
    )
}

export default Division