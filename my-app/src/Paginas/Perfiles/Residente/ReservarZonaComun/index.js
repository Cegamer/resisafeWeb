import React, { useState } from "react";
import { InputCard } from "../../../../Components/InputCard/Index";
import api from "../../../../Utils/Api";
import { cargarDatosPerfil } from "../../../../Utils/handleDatosPerfil";
import { handleGetData } from "../../../../Utils/handleGetData";

import { handlePostData } from "../../../../Utils/handlePostData";
import { formatDate } from "../../../../Utils/formatDate";
import './styles.css'
const ReservarZonaComun = () => {
  const [datosPerfil, setDatosPerfil] = React.useState(null);
  const [datosUsers, setDatosUsers] = React.useState(null);
  const [datoCedula, setDatoCedula] = React.useState(null);
  const [zonasComunes, setZonasComunes] = React.useState(null);
  const [horarios, setHorarios] = React.useState(null);
  const [error,setError] = React.useState("");
  const [values, setValues] = React.useState({
    idReserva: 0,
    idReservante: 0,
    idZonaComun: null,
    fecha: null,
    horaInicio: "",
    horaFin: "",
    cantidadPersonas: 0,
    estado: 1,
  });

  React.useEffect(() => {
    const fetchData = async () => {
      const values = await cargarDatosPerfil();
      setDatosPerfil(values);

      const zonasComunes = await handleGetData("/Zonacomun");
      setZonasComunes(zonasComunes);
    };
    fetchData();
  }, []);

  React.useEffect(() => {
    console.log(values);
    const fetchHorarios = async () => {
      const horarios = await handleGetData(
        `/Zonacomun/HorariosDisponibles/${values?.idZonaComun}/${values?.fecha}`
      );
      setHorarios(horarios);
    };
    if (values?.idZonaComun && values?.fecha) {
      fetchHorarios();
    }
  }, [values]);

  const handleChange = (event) => {
    const { value } = event.target;
    const formattedDate = formatDate(value);
    setValues({ ...values, fecha: formattedDate });
  };
  const [selectedItem, setSelectedItem] = useState(null);

  const handleReservarZonaComun = async (event) => {
    event.preventDefault();
    const data = {
      ...values,
      idReservante: datosPerfil.idPerfil,
      cantidadPersonas: parseInt(values?.cantidadPersonas),
    };

    if(await handlePostData(event, data, `/Reservas`)) 
        setError("Reserva realizada correctamente");
    else         setError("Error al reservar");

  };


  return (
    <div className="Vincular">
      <h1>Reservar Zona Comun</h1>
      <form onSubmit={handleReservarZonaComun}>
        <p className="idconjunto">ID Conjunto</p>

        <p className="Tipo">Tipo de Perfil</p>

        <select
          onChange={(event) => {
            setValues({ ...values, idZonaComun: event.target.value });
          }}
        >
          <option value={null}>Todo</option>

          {zonasComunes?.map((item, index) => (
            <option key={index} value={item?.idZonaComun}>
              {item?.nombre}
            </option>
          ))}
        </select>

        <input
          type="date"
          pattern="\d{4}-\d{2}-\d{2}"
          onChange={handleChange}
        />

        <InputCard
          type="text"
          id="cantidad-de-personas"
          label="Cantidad de Personas"
          placeholder="Cantidad de Personas"
          onChange={(event) => {
            setValues({ ...values, cantidadPersonas: event });
          }}
        />

        <div style={{overflow:'scroll',height:'20vh',marginTop:'5vh'}}>
          {horarios ? (
            horarios.map((item, index) => (
              <div
                key={index}
                className={`datosUsuarios ${selectedItem === index ? 'selected' : ''}`}
                onClick={() => {
                  setValues({
                    ...values,
                    horaInicio: item?.horaInicio,
                    horaFin: item?.horaFin,
                  });

                  setSelectedItem(index);

                }}
              >
                <p>Fecha: {item?.fecha}</p>
                <p>CuposDisponibles: {item?.cuposDisponibles}</p>
                <p>HoraInicio: {item?.horaInicio}</p>
                <p>HoraFin: {item?.horaFin}</p>
              </div>
            ))
          ) : (
            <p>No se encontro ningun horario</p>
          )}
        </div>
        <p>{error}</p>
        <div className="Buttons-container">
          <button type="submit">Reservar</button>
          <button className="Cancelar">Cancelar</button>
        </div>
      </form>
    </div>
  );
};

export { ReservarZonaComun };
