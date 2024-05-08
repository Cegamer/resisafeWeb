import React from "react"
import api from "../../../Utils/Api"
import { InputCard } from "../../../Components/InputCard/Index"
import './VincularResidente.css'
const VincularResidente = ()=> {
    const [values, setValues]= React.useState({    
      "idPerfil": 0,
      "idUsuario": 0,
      "idConjunto": 0,
      "idTipoPerfil": 0,
      "activo": 1
      })

      const [error, setError] = React.useState('')
      const inputsOption = [

        {
            id:'ID Perfil',
            label:'ID Perfil',
            placeholder:'ID Perfil',
            state: 'idPerfil'
          }, 

        {
          id:'ID Usuario',
          label:'ID Usuario',
          placeholder:'ID Usuario',
          state: 'idUsuario'
        }, 
        {
          id:'ID Conjunto',
          label:'ID Conjunto',
          placeholder:'ID Conjunto',
          state: 'idConjunto'
        },
        {
          id:'ID Tipo de Perfil',
          label:'ID Tipo de Perfil',
          placeholder:'ID Tipo de Perfil',
          state: 'idTipoPerfil'
        },
        {
          id:'Activo',
          label:'Activo',
          placeholder:'Activo',
          state: 'activo'
        },
    
      ]
        const handleVincularResidente = async (event) => {
            event.preventDefault()
            try {
              const data = {
                ...values
              };
        
              const url = `${api}/CrearPerfil`;
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
                setError('Vinculado exitosamente al conjunto')
              } else {
                console.log(localStorage.getItem('token'))
                setError('Registro Fallido')
                throw new Error('Registro fallido');
              }
              
            } catch (error) {
              console.error('Error:', error.message);
              setError('Error al vincular usuario. Por favor, inténtalo de nuevo.');
            }
          };
     return(
        <div>
            <h1>Registrar Conjunto</h1>
            <form onSubmit={handleVincularResidente} >
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
export default VincularResidente;