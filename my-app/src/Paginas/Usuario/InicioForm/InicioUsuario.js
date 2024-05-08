import React, {useState,useEffect} from "react";
import {useNavigate} from 'react-router-dom'
import CardsPerfiles from "../CardsPerfiles/cardsPerfiles";
import './InicioUsuario.css';
import api from '../../../Utils/Api';

const InicioUsuario = () => {

    let navigate = useNavigate()
    const [nombre, setNombre] = useState('');
    const [apellido, setApellido] = useState('');
    const [cedula, setCedula] = useState('');


    const [token, setToken] = useState('');


    const [perfiles,setPerfiles] = useState([]);
    
    useEffect(() => {
        getUserData();
        getUserProfiles();
    }, []); // Llamar a getUserData cuando el componente se monta


    const getUserProfiles = async () => {
        try {
          const url = api+'/Perfiles/DatosPerfil/' + localStorage.getItem('userID');
          const options = {
            method: 'GET', 
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
          };
    
          const response = await fetch(url, options);
          if (response.ok) {
            const responseData = await response.json()
            console.log(responseData)
            setPerfiles(responseData)
          } else {
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };

      const getUserData = async () => {
        try {
          const url = api+'/Users/' + localStorage.getItem('userID');
          const options = {
            method: 'GET', 
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': localStorage.getItem('token')
            },
          };
    
          const response = await fetch(url, options);
          if (response.ok) {
            const responseData = await response.json()
            setNombre(responseData.nombre)
            setApellido(responseData.apellido)
            setCedula(responseData.cedula)
            setToken(localStorage.getItem('token'))
    
          } else {
            navigate('/Login')
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
      };
    
      const logout =  () =>{
        localStorage.removeItem('token')
        localStorage.removeItem('userID')
        navigate('/')
      }


    return (

      <div className="Inicio-container" onLoad={getUserData}>        
            <header></header>
          <div className="Selecciona">
            <h1>Selecciona tu perfil</h1>
          </div>

          <button className="Cerrar" onClick={logout}>Cerrar Sesión</button>
          <div className="Contenedor-perfiles">
            {perfiles.map((perfil, index) => (
              <CardsPerfiles
                  key={index}
                  perfilID={perfil.idPerfil}
                  nombreConjunto={perfil.nombreConjunto}
                  nombreTipoPerfil={perfil.nombreTipoPerfil}
              />
            ))}
          </div>
        </div>     
    );
}
export default InicioUsuario;