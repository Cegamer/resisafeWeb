import './App.css';

import {Routes, Route} from 'react-router-dom'
import LandingPage from './Paginas/NoLoggeado/LandingPage';
import InicioUsuario from './Paginas/Usuario/InicioForm/InicioUsuario';
import HomeAdministrador from './Paginas/Perfiles/Administrador/HomeAdministrador';
import HomeResidente from './Paginas/Perfiles/Residente/HomeResidente';
import HomeVigilante from './Paginas/Perfiles/Vigilante/HomeVigilante';
import HomeAppMaster from './Paginas/Perfiles/AppMaster/HomeAppMaster';
import LayoutAppMaster from './Paginas/Perfiles/AppMaster/LayoutAppMaster';
import LayoutAdministrador from './Paginas/Perfiles/Administrador/LayoutAdministrador';
import ListaUsuariosVinculados from './Paginas/Perfiles/Administrador/ListaUsuariosVinculados';
import LayoutResidente from './Paginas/Perfiles/Residente/LayoutResidente';
import LayoutVigilante from './Paginas/Perfiles/Vigilante/LayoutVigilante';
import RegistarVisitantes from './Paginas/Perfiles/Vigilante/RegistarVisitantes';
import { LoginForm } from './Paginas/NoLoggeado/Login/LoginForm';
import { NavbarResponsive } from './Components/NavbarResponsive';
import Header from './Components/Header/Header';
import { RegistroForm } from './Paginas/NoLoggeado/Registro/RegistroForm';

function App() {
  return (
    <div>
    <Header/>
    <Routes>
        <Route path="/" element={<LandingPage/>}></Route>
        <Route path="/Login" element={<LoginForm/>}></Route>
        <Route path="/Registro" element={<RegistroForm/>}></Route>
        <Route path="/Usuario" element={<InicioUsuario/>}></Route>

        <Route path="/Administrador" element={<LayoutAdministrador/>}>
          <Route path="/Administrador" element={<HomeAdministrador/>}></Route>
          <Route path="/Administrador/ListaUsuariosVinculados" element={<ListaUsuariosVinculados/>}></Route>
        </Route>
        
        <Route path="/Residente" element={<LayoutResidente/>}>
            <Route path='/Residente' element={<HomeResidente/>}></Route>
        </Route>
        
        <Route path="/Vigilante" element={<LayoutVigilante/>}>
            <Route path='/Vigilante' element={<HomeVigilante/>}></Route>
            <Route path='/Vigilante/RegistarVisitantes' element={<RegistarVisitantes/>}></Route>
        </Route>
        
        <Route path="/AppMaster" element={<LayoutAppMaster></LayoutAppMaster>}>
            <Route path='/AppMaster' element={<HomeAppMaster/>}></Route>
        </Route>
    </Routes>
    
    <NavbarResponsive/>
    </div>
  );
}

export default App;
