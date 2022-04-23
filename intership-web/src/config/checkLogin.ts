import { useNavigate, useLocation } from "react-router-dom";

export function checkLogin () {
    const navigate = useNavigate();
    const location = useLocation();
    
    if (localStorage.getItem('isRemember') === 'true')
    {
        localStorage.setItem('isLogin', 'true')
    } else if (localStorage.getItem('isLogin') != 'true'){
        navigate("/")
        console.log(location);
    }
}