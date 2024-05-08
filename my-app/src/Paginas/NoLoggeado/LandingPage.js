import { Link } from "react-router-dom";
import "./LandingPage.css";
import {
  adminLanding,
  residenteLanding,
  vigilanteLanding,
} from "../../Components/Assets";
import { Fade } from "react-awesome-reveal";
import ContactForm from "./ContactForm";
const LandingPage = () => {

  const scrollToBottom = () => {
    window.scrollTo(0, document.body.scrollHeight)
  }
  

  return (
    <div className="landing-page-wrapper">
      <div>
        <div className="presentacionContainer">
          <div className="sombra">
            <div className="ContenedorTextoPrincipal">
              <h2>
                Bienvenido a <b>Resisafe</b>
              </h2>
              <h1>Plataforma de Gestión para conjuntos Residenciales</h1>
              <button onClick={scrollToBottom}>Contáctanos</button>
              <Link to="/Login">
                <button className="botonIngreso">Ingreso Usuarios</button>
              </Link>
            </div>
          </div>
        </div>

        <div className="containerProfileCards">
          <h3 className="titulo">Múltiples tipos de perfil</h3>
          <div className="perfilesContainer">
            <div className="cardContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10vw"
                viewBox="0 -960 960 960"
                width="10vw"
                fill="#0057FF"
              >
                <path d="M720-720q-33 0-56.5-23.5T640-800q0-33 23.5-56.5T720-880q33 0 56.5 23.5T800-800q0 33-23.5 56.5T720-720ZM680-80v-320q0-40-20.5-72T607-522l35-103q8-25 29.5-40t48.5-15q27 0 48.5 15t29.5 40l102 305H800v240H680ZM500-500q-25 0-42.5-17.5T440-560q0-25 17.5-42.5T500-620q25 0 42.5 17.5T560-560q0 25-17.5 42.5T500-500ZM220-720q-33 0-56.5-23.5T140-800q0-33 23.5-56.5T220-880q33 0 56.5 23.5T300-800q0 33-23.5 56.5T220-720ZM140-80v-280H80v-240q0-33 23.5-56.5T160-680h120q33 0 56.5 23.5T360-600v240h-60v280H140Zm300 0v-160h-40v-160q0-25 17.5-42.5T460-460h80q25 0 42.5 17.5T600-400v160h-40v160H440Z" />
              </svg>
              <p>Administrador</p>
            </div>

            <div className="cardContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10vw"
                viewBox="0 -960 960 960"
                width="10vw"
                fill="#0057FF"
              >
                <path d="M400-480q-66 0-113-47t-47-113q0-66 47-113t113-47q66 0 113 47t47 113q0 66-47 113t-113 47ZM80-160v-112q0-33 17-62t47-44q51-26 115-44t141-18h14q6 0 12 2-8 18-13.5 37.5T404-360h-4q-71 0-127.5 18T180-306q-9 5-14.5 14t-5.5 20v32h252q6 21 16 41.5t22 38.5H80Zm560 40-12-60q-12-5-22.5-10.5T584-204l-58 18-40-68 46-40q-2-14-2-26t2-26l-46-40 40-68 58 18q11-8 21.5-13.5T628-460l12-60h80l12 60q12 5 22.5 11t21.5 15l58-20 40 70-46 40q2 12 2 25t-2 25l46 40-40 68-58-18q-11 8-21.5 13.5T732-180l-12 60h-80Zm40-120q33 0 56.5-23.5T760-320q0-33-23.5-56.5T680-400q-33 0-56.5 23.5T600-320q0 33 23.5 56.5T680-240ZM400-560q33 0 56.5-23.5T480-640q0-33-23.5-56.5T400-720q-33 0-56.5 23.5T320-640q0 33 23.5 56.5T400-560Zm0-80Zm12 400Z" />
              </svg>
              <p>Residente</p>
            </div>

            <div className="cardContainer">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                height="10vw"
                viewBox="0 -960 960 960"
                width="10vw"
                fill="#0057FF"
              >
                <path d="m368-336 112-84 110 84-42-136 112-88H524l-44-136-44 136H300l110 88-42 136ZM480-80q-139-35-229.5-159.5T160-516v-244l320-120 320 120v244q0 152-90.5 276.5T480-80Z" />
              </svg>
              <p>Seguridad</p>
            </div>
          </div>
        </div>

        <hr></hr>

        <div class="container">
          <div class="containerTexto">
            <Fade>
              <h3>Administrador</h3>
              <ul>
                <li>
                  <p>Gestionar Zonas Comunes</p>
                </li>
                <li>
                  <p>Gestión de Reservas</p>
                </li>
                <li>
                  <p>Gestionar Residentes</p>
                </li>
                <li>
                  <p>Gestionar Paquetería</p>
                </li>
                <li>
                  <p>Gestionar Información del conjunto</p>
                </li>
                <li>
                  <p>Consultar Quejas y Reclamos</p>
                </li>
              </ul>
            </Fade>
          </div>
          <div>
            <Fade>
              <img className="imagen" src={adminLanding} alt="Administrador" />
            </Fade>
          </div>
        </div>

        <div class="container">
          <div>
            <Fade>
              <img className="imagen" src={residenteLanding} alt="Residente" />
            </Fade>
          </div>
          <div class="containerTexto">
            <Fade>
              <h3>Residente</h3>
              <ul>
                <li>
                  <p>Reservar Zonas Comunes</p>
                </li>
                <li>
                  <p>Consultar historial de Paquetería</p>
                </li>
      
                <li>
                  <p>Poner Quejas y Reclamos</p>
                </li>
              </ul>
            </Fade>
          </div>
        </div>

        <div class="container">
          <div class="containerTexto">
            <Fade>
              <h3>Guardia de seguridad</h3>
              <ul>
                <li>
                  <p>Registrar visitantes</p>
                </li>
                <li>
                  <p>Consultar historial de visitas</p>
                </li>
                <li>
                  <p>Gestionar Paquetería</p>
                </li>
                <li>
                  <p>Consultar historial de paquetería</p>
                </li>
              </ul>
            </Fade>
          </div>
          <div>
            <Fade>
              <img
                className="imagen"
                src={vigilanteLanding}
                alt="Guardia de seguridad"
              />
            </Fade>
          </div>
        </div>

        <hr></hr>
        <div>
          <ContactForm></ContactForm>
          
        </div>
      </div>
    </div>
  );
};
export default LandingPage;
