import React from "react";
import { InputCard } from "../../../Components/InputCard/Index";
import "./RegistarVisitantes.css";
import { handlePostData } from "../../../Utils/handlePostData";
import { handleGetData } from "../../../Utils/handleGetData";

const RegistarVisitantes = () => {
  const [values, setValues] = React.useState({
    idRegistro: 0,
    idVisitante: 0,
    idResidenteVinculado: 0,
    idVigilanteQueRegistra: 0,
    fecha: "",
    horaIngreso: "",
    horaSalida: "",
  });

  const [datoCedula, setDatoCedula] = React.useState(null);

  const [datosVisitantes, setDatosVisitantes] = React.useState(null);

  const [datoCedulaResidente, setDatoCedulaResidente] = React.useState(null);

  const [datosResidente, setDatosResidente] = React.useState(null);

  React.useEffect(() => {
    if (datoCedula) {
      const fetchUsersByCedula = async () => {
        setDatosVisitantes(
          await handleGetData(`/Visitantes/BuscarCedula/${datoCedula}`)
        );
      };
      fetchUsersByCedula();
    }
  }, [datoCedula]);

  React.useEffect(() => {
    if (datoCedulaResidente) {
      const fetchResidenteByCedula = async () => {
        setDatosResidente(
          await handleGetData(
            `/Perfiles/${datoCedulaResidente}/${localStorage.getItem(
              "ActualConjuntoId"
            )}`
          )
        );
      };
      fetchResidenteByCedula();
    }
  }, [datoCedulaResidente]);

  const [error, setError] = React.useState("");
  const inputsOption = [
    {
      id: "Fecha",
      label: "Fecha",
      placeholder: "00-00-0000",
      state: "fecha",
    },
    {
      id: "Hora de Ingreso",
      label: "Hora de Ingreso",
      placeholder: "00:00:00",
      state: "horaIngreso",
    },
    {
      id: "Hora de Salida",
      label: "Hora de Salida",
      placeholder: "00:00:00",
      state: "horaSalida",
    },
  ];

  const handleRegistarVisitante = async (event) => {
    event.preventDefault();
    const data = {
      ...values,
      idRegistro: 0,
      idVisitante: datosVisitantes.idVisitante,
      idResidenteVinculado: datosResidente.idPerfil,
      idVigilanteQueRegistra: localStorage.getItem("ActualProfileId"),
    };

    await handlePostData(event, data, "/RegistroVisitantes");
  };
  return (
    <div>
      <h1>Registrar Visita</h1>
      <form onSubmit={handleRegistarVisitante}>
        <InputCard
          type="text"
          id="BuscarCedula"
          label="Buscar Visitante por cédula"
          placeholder="Buscar"
          onChange={setDatoCedula}
        />

        <p className="Usuario">Usuario Encontrado</p>
        {datosVisitantes ? (
          <div className="datosUsuarios">
            <p>Cedula: {datosVisitantes?.cedula}</p>
            <p>
              Nombre: {datosVisitantes?.nombre} {datosVisitantes.apellido}
            </p>
          </div>
        ) : (
          <p>No se encontro ningun usuario</p>
        )}

<InputCard
          type="text"
          id="BuscarCedula"
          label="Buscar Residente por cédula"
          placeholder="Buscar"
          onChange={setDatoCedulaResidente}
        />

        <p className="Usuario">Usuario Encontrado</p>
        {datosResidente ? (
          <div className="datosUsuarios">
            <p>Codigo de Residente: {datosResidente?.idPerfil}</p>
          </div>
        ) : (
          <p>No se encontro ningun usuario</p>
        )}



        {inputsOption.map((item, index) => (
          <InputCard
            key={index}
            id={item.id}
            label={item.label}
            placeholder={item.placeholder}
            type={item.type || "text"}
            onChange={(event) => {
              setValues((prev) => ({ ...prev, [item.state]: event }));
            }}
          />
        ))}
        <button type="submit" className="boton-guardar">
          Guardar
        </button>
      </form>
    </div>
  );
};
export default RegistarVisitantes;
