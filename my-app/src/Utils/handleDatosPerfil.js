import api from "./Api";

const cargarDatosPerfil = async () => {
    try {
        const url = `${api}/Perfiles/${localStorage?.getItem('ActualProfileId')}`; 
        const options = {
          method: 'GET', 
          mode:'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage?.getItem('token')
          },
        };
  
        const response = await fetch(url, options);
        if (response.ok) {
          const responseData = await response.json()
          return responseData;

        } else {
          throw new Error('Error cargando los datos');
        }
      } catch (err) {
        console.log(err)
      }
}

export { cargarDatosPerfil }