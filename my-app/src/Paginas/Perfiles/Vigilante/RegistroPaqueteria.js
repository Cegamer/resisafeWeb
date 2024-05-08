import React from "react"
import api from "../../../Utils/Api"
import { InputCard } from "../../../Components/InputCard/Index"
import './RegistroPaqueteria.css'
import { cargarDatosPerfil } from "../../../Utils/handleDatosPerfil"
import { handlePostData } from "../../../Utils/handlePostData"

const RegistroPaqueteria = () => {
  const [datosPerfil, setDatosPerfil]= React.useState(null);

    const [values, setValues]= React.useState({    
        "idPaquete": 0,
        "torre": "",
        "apto": "",
        "idVigilanteRecibe": 0,
        "estado": 0,
        "idResidenteRecibe": 0,
        "fechaEntrega": "",
        "horaEntrega": "",
        "fechaRecibido": "",
        "horaRecibido": "",
        "idConjunto": 0
      })

      React.useEffect(() => {
        const fetchData = async () => {
            const values = await cargarDatosPerfil();
            setDatosPerfil(values);
        }
        fetchData()
      }, []);

      const [error, setError] = React.useState('')
      const inputsOption = [

        {
          id:'Torre',
          label:'Torre',
          placeholder:'Torre',
          state: 'torre'
        }, 
        {
          id:'Apartamento',
          label:'Apartamento',
          placeholder:'Apartamento',
          state: 'apto'
        },
        {
            id:'ID del Vigilante que Recibe',
            label:'ID del Vigilante que Recibe',
            placeholder:'ID del Vigilante que Recibe ',
            state: 'idVigilanteRecibe'
        }, 
        {
            id:'ID del Residente que Recibe',
            label:'ID del Residente que Recibe',
            placeholder:'ID del Residente que Recibe ',
            state: 'idResidenteRecibe'
        }, 
        
        {
          id:'Fecha de Entegra',
          label:'Fecha de Entegra',
          placeholder:'Fecha de Entegra',
          state: 'fechaEntrega'
        }, 
        {
          id:'Hora de Entrega',
          label:'Hora de Entrega',
          placeholder:'Hora de Entrega',
          state: 'horaEntrega'
        }, 
        {
          id:'Fecha en la que se Recibió',
          label:'Fecha en la que se Recibió',
          placeholder:'Fecha en la que se Recibió',
          state: 'fechaRecibido'
        }, 
        {
          id:'Hora en la que se Recibió',
          label:'Hora en la que se Recibió',
          placeholder:'Hora en la que se Recibió',
          state: 'horaRecibido'
        }, 

        {
            id:'ID del Conjunto',
            label:'ID del Conjunto',
            placeholder:'ID del Conjunto ',
            state: 'idConjunto'
        }, 
      ]

      const handleRegistroPaqueteria = async (event) => {
          event.preventDefault()
          const data = {
            ...values,
            idConjunto: datosPerfil?.idConjunto
          };

          await handlePostData(event, data, "/Paquetes")
        };
     return(
        <div>
            <h1>Registrar Paqueteria</h1>
            <form onSubmit={handleRegistroPaqueteria} >
              {inputsOption?.map((item, index) => (
                <InputCard 
                  key={index}
                  id={item.id}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type || 'text'}
                  onChange={(event)=>{setValues((prev)=>({...prev, [item.state]: event}))}}
                />                    
              ))}

              <select onChange={(event)=>{setValues({...values, "estado": event.target.value})}}>
                <option value={null}></option>
                <option value={0}>No Entegrado</option>
                <option value={1}>Entegrado</option>
              </select>

              <button type='submit' className="boton-guardar">Guardar</button>
            </form>
        </div>
     );
}
export {RegistroPaqueteria}