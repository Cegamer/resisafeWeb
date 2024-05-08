import React from "react";
import { fetchAllData } from "../Utils/handleFetchData";

export const AppContext = React.createContext() 

const AppProvider = ({children}) => {
    const [showNavbarResponsive, setShowNavbarResponsive] = React.useState(false)

    // RESPONSE:
    const [responseData, setResponseData] = React.useState({});

    React.useEffect(() => {
        const endpoints = [
            `/Users/${localStorage.getItem("userID")?.toString()}`,
        ]

        const fetchData = async () => {
            try {
                const data = await fetchAllData(endpoints);
                setResponseData(data);
            } 
            catch (err) {
                console.log(err)
            } 
        }
        fetchData()
    }, []);

    return(
    <AppContext.Provider
        value={{
            showNavbarResponsive,    
            setShowNavbarResponsive,
            responseData
         }}
    >
    {children}
    </AppContext.Provider>
    
    )
}
    
export { AppProvider };