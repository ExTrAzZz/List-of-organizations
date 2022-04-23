import React from 'react';
import {useState} from 'react';
import Click from './index';
import { useNavigate } from "react-router-dom";


const Authorize: React.FC = () => {
  const [login, setLogin] = useState('');
  const [password, setPassword] = useState('');
  const [checked, setChecked] = useState(false)
  const handleClick = () => setChecked(!checked)
  const navigate = useNavigate();
  return (
    <div className="authField">
      <div className="container">
        <h2>Please sign in</h2>
        <input onChange={event => setLogin(event.target.value)} value={login} type="text" className="inpLogin" name="login"/>
        <input onChange={event => setPassword(event.target.value)} value={password} type="text" className="inpPass" name="password" />
        <input onChange={handleClick} checked={checked} type="checkbox" />
        <label>Remember me</label>
        <button onClick={() => {Click(login, password, navigate, checked).catch(error => console.log(error))}} className="authBut" type="button" >
          Sign in
        </button>
      </div>
    </div>
  );
};

export default Authorize;
