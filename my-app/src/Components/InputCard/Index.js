import './InputCard.css'
const InputCard = ({type="text", id, label, placeholder="placeholder", onChange, required=true, defaultValue=""}) => {
    return(
        <div className="input-container">
            <label htmlFor={id}>{label} {required && "*"}</label>
            <input
                type={type}
                placeholder={placeholder}
                name={id}
                id={id}
                onChange={(event) => {onChange( event.target.value)}}
                required
                defaultValue={defaultValue}
            />
        </div>
    );
}
export{InputCard}