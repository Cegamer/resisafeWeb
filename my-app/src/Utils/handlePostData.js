import api from "./Api";

const handlePostData = async (event, object, endpoint) => {
    event.preventDefault()
    try {
        console.log(object)
        const url = `${api}${endpoint}`;

        const options = {
            method: 'POST', 
            mode:'cors',
            headers: {
                'Authorization': localStorage.getItem('token'),
                'Content-Type': 'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify(object) 
        };
      
      const response = await fetch(url, options);
      if (response.ok) {
        console.log('Guardado correctamente');
        return true

      } else {
        throw new Error('Registro fallido');
      }
      
    } catch (error) {
      console.error('Error:', error);
      return false
    } finally {
    //   window.location.reload()
    }
};


export { handlePostData }