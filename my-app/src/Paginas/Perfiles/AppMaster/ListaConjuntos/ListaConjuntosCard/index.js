import "./styles.css";

const ListaConjuntosCard = ({item= null, onClick}) => {
    return(        
        <div className="card">
            <h3 className="card-title">{item?.nombre}</h3>
            <ul className="list-group list-group-flush">
                <li className="list-group-item">ID Conjunto: {item?.idConjunto}</li>
                <li className="list-group-item">Direccion: {item?.direccion}</li>
                <li className="list-group-item">Nombre: {item?.nombre}</li>
            </ul>
            <button onClick={onClick} className="btn-delete">Borrar</button>
        </div>
    );
}

export { ListaConjuntosCard };