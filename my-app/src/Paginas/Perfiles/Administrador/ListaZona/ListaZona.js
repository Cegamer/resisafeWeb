import React from 'react'
import api from '../../../../Utils/Api';
import { ListaZonaCard } from './ListaZonaCard';
import './ListaZona.css'
import { cargarDatosPerfil } from '../../../../Utils/handleDatosPerfil';
import { handleGetData } from '../../../../Utils/handleGetData';
 export const ListaZona = () => { 
  const [datosPerfil, setDatosPerfil]= React.useState();
    const [array, setArray]= React.useState();

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
          const values = await handleGetData(`/Zonacomun/Conjunto/${datosPerfil?.idConjunto}`);
          setArray(values);
        }
        fetchData()
      }
    }, [datosPerfil])

    
    const handleDeleteZonaComun = async (id) => {
      try {
          const url = `${api}/Zonacomun/${id}`; 
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
        <h3 className='ZonasC'>Zonas Comunes</h3>

      <div className='Zonas'>
        </div>
        <div className='contenedorLista'>
        {array ? (
            array?.map((item, index) => (
              <ListaZonaCard item={item} key={index} onClick={()=> handleDeleteZonaComun(item.idZonaComun)}/>

            ))
        ) : (
            <p>Cargando...</p>
        )}
        </div>
    </div>)


}