import { Link, Outlet } from "react-router-dom";

const LayoutAdministrador = () => {

    return <div>
        <h1></h1>
        <Link to='/Administrador'></Link>
        <Link to='/Administrador/ListaUsuariosVinculados'></Link>
        <Outlet></Outlet>
    </div>

}
export default LayoutAdministrador;