import React from "react"
import api from "../../../Utils/Api"
import { InputCard } from "../../../Components/InputCard/Index"
import './RegistroConjuntos.css'
const RegistroConjuntos = ()=> {
    const [values, setValues]= React.useState({    
        "idConjunto": 0,
        "nombre": "",
        "direccion": "",
        "activo": 1
      })

      const [error, setError] = React.useState('')
      const inputsOption = [

        {
            id:'ID Conjunto',
            label:'ID Conjunto',
            placeholder:'ID Conjunto',
            state: 'idConjunto'
          }, 

        {
          id:'Nombre',
          label:'Nombre',
          placeholder:'Nombre',
          state: 'nombre'
        }, 
        {
          id:'Direccion',
          label:'Direccion',
          placeholder:'Direccion',
          state: 'direccion'
        },
        
        {
          id:'Activo',
          label:'Activo',
          placeholder:'Activo',
          state: 'activo'
        },
    
      ]
        const handleRegistroConjuntos = async (event) => {
            event.preventDefault()
            try {
              const data = {
                ...values
              };
        
              const url = `${api}/Conjuntos/CrearConjunto`;
              const options = {
                method: 'Post', 
                mode:'cors',
                headers: {
                  'Authorization': localStorage.getItem('token'),
                  'Content-Type': 'application/json',
                  'Accept': 'application/json'
                },
                body: JSON.stringify(data) 
              };
              
              const response = await fetch(url, options);
              console.log(response)
              if (response.ok) {    
                console.log('Guardado correctamente');
            
        
              } else {
                console.log(localStorage.getItem('token'))
                setError('Registro fallido')
                throw new Error('Registro fallido');
              }
              
            } catch (error) {
              console.error('Error:', error.message);
              setError('Error al registrar conjunto. Por favor, inténtalo de nuevo.');
            }
          };
     return(
        <div>
            <h1>Registrar Conjunto</h1>
            <form onSubmit={handleRegistroConjuntos} >
              {inputsOption.map((item, index)=>(
    
                <InputCard 
                  id={item.id}
                  label={item.label}
                  placeholder={item.placeholder}
                  type={item.type || 'text'}
                  onChange={(event)=>{setValues((prev)=>({...prev,[item.state]: event}))}}
                />                    
              ))}
              <p>{error}</p>
              <button type='submit' className="boton-guardar">Guardar</button>
            </form>
        </div>
     );
}
export default RegistroConjuntos;