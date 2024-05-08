import React from 'react';
import { cargarDatosPerfil } from '../../../Utils/handleDatosPerfil';
import { handleGetData } from '../../../Utils/handleGetData';
const ListaUsuarios = () => { 
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
                const values = await handleGetData(`/Users`);
                setArray(values);
            }
            fetchData()
        }
      }, [datosPerfil])

      

     return (  
        <div>
            <div className='Zonas'>
                <h3 className='ZonasC'>Lista de Usuarios</h3>
            </div>
            <div className='contenedorLista'>
                {array ? (
                    array?.map((item, index) => (
                        <div className="card">
          
                            <ul className="list-group list-group-flush">
                            <li className="list-group-item">Nombre: {item?.nombre}</li>
                                <li className="list-group-item">Apellido: {item?.apellido}</li>
                                <li className="list-group-item">Cedula: {item?.cedula}</li>
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
export {ListaUsuarios}