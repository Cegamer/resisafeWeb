import {useNavigate} from 'react-router-dom'
import './cardsPerfiles.css';
import { ImgPerfil } from '../../../Utils/ImgPerfil';
import api from '../../../Utils/Api';


const CardsPerfiles = (props) => {

    let navigate = useNavigate();

    const iniciarPerfil = async () =>{
      try {
        const url = `${api}/Perfiles/IniciarPerfil/${props.perfilID}`;
          const options = {
            method: 'POST', 
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
            localStorage.setItem("token","Bearer "+ responseData.token)
            localStorage.setItem("ActualProfileId",props.perfilID)

            switch(props.nombreTipoPerfil){
              case "Administrador": navigate('/Administrador');  break;
              case "Residente": navigate('/Residente'); break;
              case "Vigilante": navigate('/Vigilante'); break;
              case "AppMaster": navigate('/AppMaster'); break;
              default: navigate('/'); break;
            }             
    
          } else {
            console.log("Error")
          }
        } catch (error) {
          console.error('Error:', error.message);
        }
    };

    return (
      <div onClick={iniciarPerfil} className='Cartas'>
        <img src={ImgPerfil[props.nombreTipoPerfil]} className='Imagen-perfil'/>
        <div className='NombrePerfil'>
          <h2>{props.nombreTipoPerfil}</h2>
        </div>
      </div>
    )

}
export default CardsPerfiles;