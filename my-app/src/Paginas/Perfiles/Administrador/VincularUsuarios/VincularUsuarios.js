import React from 'react'
import { InputCard } from '../../../../Components/InputCard/Index';
import api from '../../../../Utils/Api';
import { cargarDatosPerfil } from '../../../../Utils/handleDatosPerfil';
import { handleGetData } from '../../../../Utils/handleGetData';

import "./VincularUsuarios.css"

export const VincularUsuarios = ({title="Vincular Usuarios", type="Administrador"}) => { 
  const [datosPerfil, setDatosPerfil]= React.useState(null);
  const [datosUsers, setDatosUsers]= React.useState(null);
  const [datoCedula, setDatoCedula]= React.useState(null);
  const [tipoPerfil, setTipoPerfil]= React.useState(null);
  const [error, setError] = React.useState('')

  const [values, setValues] = React.useState({
    "idPerfil": 0,
    "idUsuario": 0,
    "idConjunto": 0,
    "idTipoPerfil": 0,
    "activo": 0
  })

    React.useEffect(() => {
      const fetchData = async () => {
          const values = await cargarDatosPerfil();
          setDatosPerfil(values);
          const tipoPerfil = await handleGetData("/TipoPerfil");
          setTipoPerfil(tipoPerfil);
      }
      fetchData()
    }, []);

    React.useEffect(() => {

      if(datoCedula) {
        const fetchUsersByCedula = async () => {
          const users = await handleGetData(`/Users/BuscarCedula/${datoCedula}`); 
          setDatosUsers(users)      
        }
        fetchUsersByCedula();
      }
    }, [datoCedula])


    const handleVincularUsuario = async (event) => {
      event.preventDefault()
      try {
        const data = {
          "idPerfil": 0,
          "idUsuario": datosUsers?.idUsuario,
          "idConjunto": datosPerfil?.idConjunto,
          "idTipoPerfil": values?.idTipoPerfil,
          "activo": 1
        };
        console.log(data);
  
        const url = `${api}/Perfiles/CrearPerfil`;
        const options = {
          method: 'POST', 
          mode:'cors',
          headers: {
            'Authorization': localStorage.getItem('token'),
            'Content-Type': 'application/json',
            'Accept': 'application/json'
          },
          body: JSON.stringify(data) 
        };
        
        const response = await fetch(url, options);
        if (response.ok) {
          setError('Guardado correctamente');
  
        } else {
          throw new Error('Registro fallido');
        }
        
      } catch (error) {
        console.error('Error:', error.message);
      } finally {
        // window.location.reload();
      }
    };

    const handleType = () => {
      if( type === "Administrador" ) {
        return(
          <>
            {tipoPerfil?.filter(item => (item.idTipo != 1 && item.idTipo != 4)).map((item, index) => (
              <option key={index} value={item?.idTipo}>{item?.nombreTipo}</option>
            ))}
          </>
        )
      } else if (type === "AppMaster") {
        return(
          <>
            {tipoPerfil?.filter(item => (item.idTipo != 4)).map((item, index) => (
              <option key={index} value={item?.idTipo}>{item?.nombreTipo}</option>
            ))}
          </>
        )
      }
    }

 return(
    <div className='Vincular'>
      <h1>{title}</h1>
        <form  onSubmit={handleVincularUsuario}>
          <p className='idconjunto'>ID Conjunto</p>
          <input type='text' value={datosPerfil?.idConjunto} placeholder='ID conjunto'  label="ID CONJUNTO"/>
          <InputCard 
            type='text'
            id= 'BuscarCedula'
            label='Buscar por cédula'
            placeholder='Buscar'
            onChange={setDatoCedula}
          />
          <p className='Usuario'>Usuario Encontrado</p>
          {datosUsers ? ( 
            <div className='datosUsuarios'>
              <p>Cedula: {datosUsers?.cedula}</p>
              <p>Nombre: {datosUsers?.nombre}</p>
            </div>
          ) : (
              <p>No se encontro ningun usuario</p>
          )}
              <p className='Tipo'>Tipo de Perfil</p>
          <select onChange={(event) => {setValues({...values, "idTipoPerfil": event.target.value})}}>
            <option value={null}>Todo</option>
            {handleType()}
          </select>
          <p>{error}</p>
          <div className='Buttons-container'>
            <button type='submit'>Guardar</button>
            <button  className='Cancelar'>Cancelar</button>
          </div>
        </form>
    </div>
 );
}
