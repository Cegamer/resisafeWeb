import React from 'react'
import api from '../../../../Utils/Api';
import './ListaVigilantes.css'
import { cargarDatosPerfil } from '../../../../Utils/handleDatosPerfil';
import { handleGetData } from '../../../../Utils/handleGetData';
import { ListaZonaCard } from '../ListaZona/ListaZonaCard';
 export const ListaResidentes = () => { 
  const [datosPerfil, setDatosPerfil]= React.useState();
    const [array, setArray]= React.useState([]);

    React.useEffect(() => {
      const fetchData = async () => {
          const values = await cargarDatosPerfil();
          setDatosPerfil(values);
      }
      fetchData()
    }, []);

    React.useEffect(() => {
      if (datosPerfil) {
        const fetchData = async () => {
            const values = await handleGetData(`/Perfiles/Conjunto/${datosPerfil?.idConjunto}`);
            setArray(values);
        }
        fetchData();
      }

    }, [datosPerfil])

    
    const handleDeleteVigilantes = async (id) => {
      try {
          const url = `${api}/Perfiles/${id}`; 
          const options = {
            method: 'DELETE', 
            mode:'cors',
            headers: {
              'Content-Type': 'application/json',
              'Accept': 'application/json',
              'Authorization': localStorage.getItem('token') //algo que noté es que en la mayoría de peticiones no están mandando el Authorization, esto debe ir en TODAS las peticiones que se hagan al servidor
            },
          };

          const response = await fetch(url, options);
          if (response.ok) {
            const responseData = await response.json()
          } else {
            console.log("Error")
          }
        } catch (error) {
          console.log(error)
        }
        finally {
          window.location.reload()
        }
    }
    return (  
        <div>
         <div className='Zonas'>
           <h3 className='ZonasC'>Lista de Residentes</h3>
           </div>
           <div className='contenedorLista'>
           {array ? (
               array?.filter(item=> item?.tipoPerfil==='Residente').map((item, index) => (
                   <div className="card">
                   <div className="card-body">               
                       <h3 className="card-title">{item?.nombre}</h3>
                       <ul className="list-group list-group-flush">
                           <li className="list-group-item">Cédula: {item?.cedula}</li>
                           <li className="list-group-item">ID: {item?.id}</li>
                           <li className="list-group-item">Nombre: {item?.nombre}</li>
                           <li className="list-group-item">Tipo de Perfil: {item?.tipoPerfil}</li>
                           <li className="list-group-item">Torre: {item?.torre}</li>
                       </ul>
                   </div>
               </div>
  
               ))
           ) : (
               <p>Cargando...</p>
           )}
           </div>
       </div>)
 }