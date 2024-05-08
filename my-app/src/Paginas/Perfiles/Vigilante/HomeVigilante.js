import React from 'react';
import './HomeVigilante.css';
import {RegistroPaqueteria} from './RegistroPaqueteria.js';
import RegistarVisitantes from './RegistarVisitantes.js';
import { MainWrapper } from '../../../Components/MainWrapper/index.js';
import { AppContext } from '../../../Context/index.js';
import api from '../../../Utils/Api.js';
import { HistorialPaqueteria } from './HistorialPaqueteria.js';
import { HistorialVisitas } from './HistorialVisitas.js';
import RegistroVisitanteNuevo from './RegistroVisitanteNuevo.js';
const HomeVigilante = () => {
    const context = React.useContext(AppContext)
    const [selectedOption, setSelectedOption ]= React.useState(null)
    React.useEffect(() => {
        loadConjunto()
      }, []);
  
    const loadConjunto =  async () =>{
        const url = `${api}/Perfiles/${localStorage.getItem('ActualProfileId')}`;
              const options = {
                method: 'GET', 
                mode:'cors',
                headers: {
                  'Content-Type': 'application/json',
                  'Accept': 'application/json',
                  'Authorization': localStorage.getItem('token')
                },
              };
        
              const response = await fetch(url, options);
    
              if (response.ok) {
                const responseData = await response.json()
                localStorage.setItem("ActualConjuntoId",responseData.idConjunto)
              } else {
                console.log("Error")
              }
            }
    

    const buttons={
        'Registro Paqueteria': <RegistroPaqueteria/>,
        'Historial Paqueteria': <p><HistorialPaqueteria/></p>,
        'Historial Visitas': <p><HistorialVisitas/></p>,
        'Registrar Visitas': <RegistarVisitantes/>,
        'Registrar Visitante': <RegistroVisitanteNuevo/>

    }
    return (
         <MainWrapper
            object={buttons}
            state={selectedOption}
            setState={setSelectedOption}
            role={"Vigilante"}
            user={context.responseData[0]?.nombre}
         />

    );

}
export default HomeVigilante;