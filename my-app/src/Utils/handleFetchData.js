import api from "./Api";

const fetchData = async (endpoint) => {
    try {
        const response = await fetch(`${api}${endpoint}`, {
            method: 'GET', 
            mode:'cors',
            headers: {
                'Authorization': localStorage.getItem('token'),
            }
          });

        if (!(response.status === 200)) {
            console.log("error");
            throw new Error(`Error fetching ${endpoint}: ${response.statusText}`);
        }
    
        return await response.json();
    } catch (err) {
        throw new Error(err)
    }

};

const fetchAllData = async (endpoints) => {
    try {
        const resultsArray = await Promise.all(
            endpoints.map(fetchData)
        );
    
        // const combinedResults = resultsArray.reduce((acc, result) => {
        //     return { ...acc ...result };
        // }, {});
    
        return resultsArray;
    } catch (err) {
        throw new Error(err)
    }

};

export { fetchAllData };