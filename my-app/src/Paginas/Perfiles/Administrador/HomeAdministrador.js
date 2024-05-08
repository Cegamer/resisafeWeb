import React from 'react';
import './HomeAdministrador.css';
import {useNavigate} from 'react-router-dom'
import { AgregarZona } from './AgregarZona/AgregarZona';
import { MainWrapper } from '../../../Components/MainWrapper';
import { AppContext } from '../../../Context';
import { VincularUsuarios } from './VincularUsuarios/VincularUsuarios';
import { ListaZona } from './ListaZona/ListaZona';
import { ListaVigilantes } from './ListaVigilantes/ListaVigilantes';
import api from '../../../Utils/Api';
import { ListaResidentes } from './ListaResidentes/ListaResidentes';
import { ListaReservas } from './ListaReservas/ListaReservas';

const HomeAdministrador = () => {
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
        'Agregar Zona Común': <AgregarZona/>,
        'Lista Zona': <ListaZona/>, 
        'Vincular Usuarios': <VincularUsuarios/>,
        'Lista de reservas de zonas comunes': <ListaReservas/>,
        'Lista Vigilantes': <ListaVigilantes/>,
        'Lista Residentes': <ListaResidentes></ListaResidentes>,
    }


    return(
        <div>
            <MainWrapper
                object={buttons}
                state={selectedOption}
                setState={setSelectedOption}
                role={"Administrador"}
                user={context.responseData[0]?.nombre}
            />
        </div>

    );
}
export default HomeAdministrador;