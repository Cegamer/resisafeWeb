import React from 'react'
import api from '../../../Utils/Api'
import { useNavigate } from 'react-router-dom';
import { Link } from "react-router-dom";
import './RegistroForm.css';
import { LuUser } from "react-icons/lu";
import { RiLockPasswordLine } from "react-icons/ri";
import { fondoRefisafe } from '../../../Components/Assets';
import Header from '../../../Components/Header/Header';

export const RegistroForm = () => { 
  let navigate = useNavigate();
  const [values, setValues] = React.useState({
    nombre:"",
    apellido:"",
    cedula: null,
    contraseña: "",
  })
  const [error, setError] = React.useState('')
  const handleRegister = async (event) => {
    event.preventDefault()
    try {
      const data = {
        ...values,
        cedula: parseInt(values.cedula),
      };

      const url = `${api}/Users/Register`
      const options = {
        method: 'POST', 
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body:JSON.stringify(data)
      };

      console.log(JSON.stringify(data))
      const response = await fetch(url, options);
      if (response.ok) {
        const responseData = await response.json()
    
        console.log('Registro exitoso');

       navigate('/Login')


      } else {
        throw new Error('Registro fallido');
      }
    } catch (error) {
      console.error('Error:', error);
      setError('Error al registrarse. Por favor, inténtalo de nuevo.');
    }
  };
  return (
    <>
      
    <div className='Login-container'>
    <div className="containerLogin">
        <h2 className='Bienvenido'>Bienvenido!</h2>

        <form onSubmit={handleRegister} >
        <div className='input-box'>
              <p>Nombre</p>
                <input type="text" id="nombre" name="nombre" onChange={(event) => {setValues({...values, nombre: event.target.value})}} placeholder="Ingresa tu nombre" required/>
                <LuUser className='icon'/>
            </div>    
            <div className='input-box'>
              <p>Apellido</p>
                <input type="text" id="apellido" name="apellido" onChange={(event) => {setValues({...values, apellido: event.target.value})}} placeholder="Ingresa tu apellido" required/>
                <LuUser className='icon'/>
            </div>         
            <div className='input-box'>
              <p>Cédula</p>
                <input type="text" id="cedula" name="cedula" onChange={(event) => {setValues({...values, cedula: event.target.value})}} placeholder="Ingresa tu cedula" required/>
                <LuUser className='icon'/>
            </div>     

            <div className='input-box'>
              <p>Contraseña</p>
                <input type="password" id="password" name="password" onChange={(event) => {setValues({...values, contraseña: event.target.value})}} placeholder="Ingresa tu contraseña" required/>
                <RiLockPasswordLine className='icon' />
            </div>


            <button className='Inicio'>Registrate</button>
            <img href={fondoRefisafe}/> 

            <div className='Link-registro'>
              <p>¿Ya tienes una cuenta? <Link to="/Login"> Inicia Sesión</Link></p>
            </div>


        </form>
        <p>{values.name}</p>
    </div>
    <div></div>
    </div>
    
    </>
    
  )

}
