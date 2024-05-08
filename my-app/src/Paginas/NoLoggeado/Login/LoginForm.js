import React from 'react'
import api from '../../../Utils/Api'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './LoginForm.css';
import { LuUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { fondoRefisafe } from '../../../Components/Assets';
import Header from '../../../Components/Header/Header';

export const LoginForm = () => { 
  let navigate = useNavigate();
  const [values, setValues] = React.useState({
    cedula: "",
    password: "",
  })
  const [error, setError] = React.useState('')
  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const data = {
        cedula: parseInt(values.cedula),
        contraseña: values.password
      };

      const url = `${api}/Users/Login`
      const options = {
        method: 'POST', 
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data) 
      };

      console.log(JSON.stringify(data))
      const response = await fetch(url, options);
      if (response.ok) {
        const responseData = await response.json()
        localStorage.setItem('token', 'Bearer ' +responseData.token);
        localStorage.setItem('userID', responseData.userID)

        console.log('Inicio de sesión exitoso');

       navigate('/Usuario')


      } else {
        throw new Error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };
  return (
    <div className='Login-container'>
      <div className="containerLogin">
          <h2 className='Bienvenido'>Bienvenido!</h2>

          <form onSubmit={handleLogin} className='login-form-container'>         
              <div className='input-box'>
                <p>Cédula</p>
                  <input type="text" id="cedula" name="cedula" onChange={(event) => {setValues({...values, cedula: event.target.value})}} placeholder="Ingresa tu cedula" required/>
                  <LuUser className='icon'/>
              </div>     

              <div className='input-box'>
                <p>Contraseña</p>
                  <input type="password" id="password" name="password" onChange={(event) => {setValues({...values, password: event.target.value})}} placeholder="Ingresa tu contraseña" required/>
                  <RiLockPasswordLine className='icon' />
              </div>

              <div className='Recuerdame'>
                <label><input type="checkbox" />Recuerdame</label>
                <a href="#"> Olvidaste tú contraseña?</a>
              </div>

              <button className='Inicio'>Iniciar Sesión</button>
              <img href={fondoRefisafe}/> 

              <div className='Link-registro'>
                <p>¿No tienes una cuenta? <Link to="/Registro"> Registrese</Link></p>
              </div>


          </form>
      </div>
    </div>

    
  )

}
