import React from "react"
import api from "../../../Utils/Api"
import { InputCard } from "../../../Components/InputCard/Index"
import './CrearUsuarios.css'
const CrearUsuarios = ()=> {
    const [values, setValues]= React.useState({    
        "nombre": "",
        "apellido": "",
        "cedula": 0,
        "contraseña": "",
      })

      const [error, setError] = React.useState('')
      const inputsOption = [

        {
            id:'Nombre',
            label:'Nombre',
            placeholder:'Nombre',
            state: 'nombre'
          }, 

        {
          id:'Apellido',
          label:'Apellido',
          placeholder:'Apellido',
          state: 'apellido'
        }, 
        {
          id:'Cedula',
          label:'Cedula',
          placeholder:'Cedula',
          state: 'cedula'
        },
        
        {
          id:'Contraseña',
          label:'Contraseña',
          placeholder:'Contraseña',
          state: 'contraseña'
        },
    
      ]
        const handleCrearUsuarios = async (event) => {
            event.preventDefault()
            try {
              const data = {
                ...values
              };
        
              const url = `${api}/Users/Register`;
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
                setError('Guardado correctamente')
        
              } else {
                console.log(localStorage.getItem('token'))
                setError('Registro fallido')
                throw new Error('Registro fallido');
              }
              
            } catch (error) {
              console.error('Error:', error.message);
              setError('Error al registrar usuario. Por favor, inténtalo de nuevo.');
            }
          };
     return(
        <div>
            <h1>Crear Usuario</h1>
            <form onSubmit={handleCrearUsuarios} >
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
export default CrearUsuarios;