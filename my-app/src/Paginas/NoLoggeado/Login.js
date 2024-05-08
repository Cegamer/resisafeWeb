import React, {useState} from "react";
import {useNavigate} from 'react-router-dom'

const Login = () => {

  let navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);

  const handleLogin = async () => {
    try {
      const data = {
        cedula: parseInt(username),
        contraseña: password
      };

      const url = `${api}/Users/Login`; 
      const options = {
        method: 'POST', 
        mode:'cors',
        headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify(data) 
      };

      console.log(JSON.stringify(data))
      const response = await fetch(url, options);
      if (response.ok) {
        const responseData = await response.json()
        localStorage.setItem('token', 'Bearer ' +responseData.token);
        localStorage.setItem('userID', responseData.userID)

        console.log('Inicio de sesión exitoso');

       navigate('/Usuario')


      } else {
        throw new Error('Inicio de sesión fallido');
      }
    } catch (error) {
      console.error('Error:', error.message);
      setError('Error al iniciar sesión. Por favor, inténtalo de nuevo.');
    }
  };


    return <div>
    <input
      type="text"
      placeholder="Nombre de usuario"
      value={username}
      onChange={(e) => setUsername(e.target.value)}
    />
    <input
      type="password"
      placeholder="Contraseña"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
    />
    <button onClick={handleLogin}>Iniciar sesión</button>
    {error && <p>{error}</p>}
  </div>

}
export default Login;