import React from 'react'
import { useNavigate } from 'react-router-dom';
import { InputCard } from '../../../../Components/InputCard/Index';
import api from '../../../../Utils/Api';
import "./AgregarZona.css"
import { handlePostData } from '../../../../Utils/handlePostData';

export const AgregarZona = () => { 
  const [values, setValues]= React.useState({    
    nombre: '',
    horarioApertura:'',
    horarioCierre:'',
    aforoMaximo:0,
    intervaloTurnos:0,
    precio:0,
    idIcono: 1, 
    idConjunto: 0,
    idZonaComun:0
    
  })

  const [error, setError] = React.useState('')
  const inputsOption = [
  
    {
      id:'Nombre-Zona',
      label:'Nombre',
      placeholder:'Ingresa tu nombre',
      state: 'nombre'
    }, 
    {
      id:'Id-Conjunto',
      label:'ID Conjunto',
      placeholder:'Ingresa el ID de tu conjunto',
      state: 'idConjunto'
    },
    {
      id:'Horario-Zona',
      label:'Horario Apertura',
      placeholder:'Horario Apertura (00:00:00)',
      state: 'horarioApertura'
    },
    {
      id:'Cierre-Zona',
      label:'Horario Cierre',
      placeholder:'Horario Cierre (00:00:00)',
      state: 'horarioCierre'
    }, 
    {
      id:'Aforo-Zona',
      label:'Aforo máximo',
      placeholder:'Ingresa el aforo máximo',
      state: 'aforoMaximo'
    }, 
    {
      id:'Intervalo-Zona',
      label:'Intervalo de reserva',
      placeholder:'Intervalo de reserva (minutos)',
      state: 'intervaloTurnos'
    }, 
    {
      id:'Precio',
      label:'Precio',
      placeholder:'Precio',
      state: 'precio'
    }, 

  ]
    const handleAgregarZona = async (event) => {
      event.preventDefault()
      const data = {
        ...values
      };

      await handlePostData(event, data, "/Zonacomun");
    };
 return(
    <div>
      <div className= 'Agregar'>
        <h1>Agregar zona Comun</h1>
        </div>
        <form onSubmit={handleAgregarZona} >
          {inputsOption.map((item, index)=>(
            <InputCard 
              id={item.id}
              label={item.label}
              placeholder={item.placeholder}
              onChange={(event)=>{setValues((prev)=>({...prev,[item.state]: event}))}}
              className="input-box"
              key={index}
            />                    
          ))}
          <button  className='Guardar' type='submit'>Guardar</button>
          <button  className='Cancelar'>Cancelar</button>
        </form>
    </div>
 );
}