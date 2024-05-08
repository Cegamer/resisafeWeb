import "./styles.css"
import { useNavigate } from 'react-router-dom';

const MainWrapper = ({object, state, setState, role, user}) => {
    let navigate = useNavigate();

    const handleRegresar = () => {
        navigate('/Usuario');
    };
  
    return(
        <div className="main-wrapper">
            <div className='info-and-buttons-container'>
                <div className='title-and-role-container'>
                    <p>Hola {user}! Tu rol es</p>
                    <h1>{role}</h1>
                    <button key="regresar" onClick={handleRegresar}>Regresar</button>
                </div>

                <div className='functions-container'>
                    <h2>Tus funciones</h2>
                    {Object.keys(object).map((item, index)=>(
                        <button onClick={()=>{setState(item)}} key={index}>{item}</button>
                    ))}
                </div>               
            </div>

            {/* <div>P</div> */}
            <div className='form-and-info-wrapper'>
                {object[state]}
            </div>
        </div>
    );
}

export { MainWrapper }