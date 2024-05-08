import "./styles.css";

const ListaZonaCard = ({item= null, onClick}) => {
    return(        
        <div className="card">
            <h3 className="card-title">{item?.nombre}</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">Aforo Máximo: {item?.aforoMaximo}</li>
                <li className="list-group-item">Horario de Apertura: {item?.horarioApertura}</li>
                <li className="list-group-item">Horario de Cierre: {item?.horarioCierre}</li>
                <li className="list-group-item">Intervalo de Turnos: {item?.intervaloTurnos} Minutos</li>
                <li className="list-group-item">Precio: {item?.precio}</li>
            </ul>
            <button onClick={onClick} className="btn-delete">Borrar</button>
        </div>
    );
}

export { ListaZonaCard };