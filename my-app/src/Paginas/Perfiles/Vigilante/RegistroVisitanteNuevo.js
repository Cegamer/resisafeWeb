import React from "react";
import { InputCard } from "../../../Components/InputCard/Index";
import "./RegistarVisitantes.css";
import { handlePostData } from "../../../Utils/handlePostData";
import { handleGetData } from "../../../Utils/handleGetData";

const RegistroVisitanteNuevo = () => {
  const [values, setValues] = React.useState({
    idVisitante: 0,
    nombre: "",
    apellido: "",
    cedula: 0,
  });

  const [error, setError] = React.useState("");
  const inputsOption = [
    {
      id: "Nombre",
      label: "Nombre",
      placeholder: "Nombre",
      state: "nombre",
    },
    {
      id: "Apellido",
      label: "Apellido",
      placeholder: "Apellido",
      state: "apellido",
    },
    {
      id: "Cedula",
      label: "Cedula",
      placeholder: "Cedula",
      state: "cedula",
    },
  ];

  const handleRegistarVisitante = async (event) => {
    event.preventDefault();
    const data = {
      ...values,
      idVisitante: 0,
      nombre: values.nombre,
      apellido: values.apellido,
      cedula: parseInt(values.cedula),
      foto: ""
    };

    await handlePostData(event, data, "/Visitantes");
  };
  return (
    <div>
      <h1>Registrar Visitante</h1>
      <form onSubmit={handleRegistarVisitante}>
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
export default RegistroVisitanteNuevo;
