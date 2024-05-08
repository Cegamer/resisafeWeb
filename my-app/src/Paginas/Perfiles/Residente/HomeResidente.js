import React from 'react';
import {useNavigate} from 'react-router-dom'
import { MainWrapper } from '../../../Components/MainWrapper';
import { AppContext } from '../../../Context';
import api from '../../../Utils/Api';
import { ReservarZonaComun } from './ReservarZonaComun';
import { HistorialPaqueteriaResidente } from './HistorialPaquetes/HistorialPaqueteria';
import QuejasReclamos from './QuejasYReclamos/QuejasReclamos';

const HomeResidente = () => {
    const context = React.useContext(AppContext);

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
      'Reservar Zona Común': <ReservarZonaComun/>,
      'Historial de paquetes': <HistorialPaqueteriaResidente/>, 
      'Quejas y reclamos': <QuejasReclamos/>,
    }


    return(      
            <MainWrapper
                object={buttons}
                state={selectedOption}
                setState={setSelectedOption}
                role={"Residente"}
                user={context.responseData[0]?.nombre}
            />
    );
}
export default HomeResidente;