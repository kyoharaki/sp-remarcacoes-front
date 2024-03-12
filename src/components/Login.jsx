import React, {useState} from 'react';
import axios from "axios";
import { useNavigate } from 'react-router-dom';

function Login({url,handleAuth}) {
    const [values, setValues] = useState({
        user: "",
        password: "",
    });

    const navigate = useNavigate();

    function handleSubmit(e){
        e.preventDefault();
        axios.post(url + "login", values)
        .then(res => {
            if(res.data.Status === "Sucesso"){
                handleAuth(true);
                navigate('/form');
            } else {
                handleAuth(false);
                alert("Erro.");
            }
        })
        .catch(err => console.log(err));
    }

  return (
    <div className='d-flex vh-100 justify-content-center align-items-center bg-primary'>
        <div className='p-3 big-white w-25'>
            <form onSubmit={handleSubmit}>
                <div className='mb-3'>
                    <label htmlFor="usuario">Usuário</label>
                    <input type="text" id="usuario" className='form-control'
                    onChange={e => setValues({...values, user: e.target.value})}/>
                </div>
                <div className='mb-3'>
                    <label htmlFor="senha">Senha</label>
                    <input type="password" id="senha" className='form-control'
                    onChange={e => setValues({...values, password: e.target.value})}/>
                </div>
                <button className='btn btn-success'>Login</button>
            </form>
        </div>
    </div>
  )
}

export default Login