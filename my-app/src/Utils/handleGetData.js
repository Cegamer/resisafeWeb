import api from "./Api";

const handleGetData = async (endpoint="") => {
    try {
        const url = `${api}${endpoint}`; 
        const options = {
          method: 'GET', 
          mode:'cors',
          headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': localStorage?.getItem('token') //algo que noté es que en la mayoría de peticiones no están mandando el Authorization, esto debe ir en TODAS las peticiones que se hagan al servidor
          },
        };
  
        const response = await fetch(url, options);
        if (response.ok) {
          const responseData = await response.json()
          console.log(responseData)
          return responseData;
        } else {
          console.log("Error")
        }
      } catch (err) {
        console.log(err)
      }
}

export { handleGetData };