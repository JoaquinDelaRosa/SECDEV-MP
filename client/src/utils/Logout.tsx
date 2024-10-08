
import { useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { createAPIEndpoint } from "../api"
import { ENDPOINTS } from "../api/endpoints"
import { ROUTES } from "../api/routes"

export const Logout = (props: {setIsLoggedIn : Function}) => {
    const navigation = useNavigate()

    useEffect(() => {
        navigation(ROUTES.login);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [props.setIsLoggedIn])

    createAPIEndpoint(ENDPOINTS.logout).post({})
    .then((response) => { 
        props.setIsLoggedIn(false);
        if (response.status === 200) {
            navigation(ROUTES.login);
        }
    })
    .then(() => {
    })
    .catch((err) => {
        console.log(err)
    })

    return(
        <>
        </>
    )
}