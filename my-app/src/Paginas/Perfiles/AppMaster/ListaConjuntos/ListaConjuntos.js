import React from 'react';
import { ListaConjuntosCard } from './ListaConjuntosCard';
import './ListaConjuntos.css'
import { cargarDatosPerfil } from '../../../../Utils/handleDatosPerfil';
import { handleGetData } from '../../../../Utils/handleGetData';

 const ListaConjuntos = () => { 
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
                const values = await handleGetData(`/Conjuntos`);
                setArray(values);
            }
            fetchData()
        }
      }, [datosPerfil])

      

     return (  
        <div>
            <div className='Zonas'>
                <h3 className='ZonasC'>Lista de Conjuntos</h3>
            </div>
            <div className='contenedorLista'>
                {array ? (
                    array?.map((item, index) => (
                        <div className="card">
          
                            <h3 className="card-title">{item?.nombre}</h3>
                            <ul className="list-group list-group-flush">
                                <li className="list-group-item">Direccion: {item?.direccion}</li>
                                <li className="list-group-item">ID: {item?.idConjunto}</li>
                            </ul>
                        </div>
                    ))
                ) : (
                    <p>Cargando...</p>
                )}
            </div>
        </div>
    )
}
export {ListaConjuntos}