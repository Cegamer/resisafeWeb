import React from 'react';
import './HomeAppMaster.css';
import { MainWrapper } from '../../../Components/MainWrapper';
import { AppContext } from '../../../Context';
import RegistroConjuntos from './RegistroConjuntos';
import VincularResidente from './VincularResidente';
import { ListaConjuntos } from './ListaConjuntos/ListaConjuntos';
import { ListaUsuarios } from './ListaUsuarios';
import { VincularUsuarios } from '../Administrador/VincularUsuarios/VincularUsuarios';
import CrearUsuarios from './CrearUsuarios';
import { Link } from 'react-router-dom';

const HomeAppMaster = () => {
    const context = React.useContext(AppContext)
    const [selectedOption, setSelectedOption ]= React.useState(null)

    const buttons={
        'Registro Conjuntos': <RegistroConjuntos/>,
        'Lista Conjuntos': <ListaConjuntos/>,
        'Crear Usuarios': <CrearUsuarios/>,
        'Vincular Usuarios': <VincularUsuarios title='Vincular Residentes' type="AppMaster"/>,
        'Lista Usuarios': <ListaUsuarios/>,
    }

    return (
        <MainWrapper
            object={buttons}
            state={selectedOption}
            setState={setSelectedOption}
            role={"AppMaster"}
            user={context.responseData[0]?.nombre}

        />
        
    );

}
export default HomeAppMaster;