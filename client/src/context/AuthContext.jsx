import {
    createContext,
    useContext,
    useEffect,
    useState
} from "react";
import {login as performLogin} from "../services/client.js";
import {jwtDecode} from "jwt-decode";

const AuthContext = createContext({});

const AuthProvider = ({ children }) => {

    const [customer, setCustomer] = useState(null);

    //just communicates with localstorage gets username and roles from it
    const setCustomerFromToken = () => {
        let token = localStorage.getItem("access_token");
        if (token) {
            token = jwtDecode(token);
            const storedName = localStorage.getItem("customer_name");
            const storedId = localStorage.getItem("customer_id");
            const storedAge = localStorage.getItem("customer_age");
            setCustomer({
                username: token.sub,
                roles: token.scopes,
                name: storedName,
                age: storedAge,
                id: storedId
            })
        }
    }
    useEffect(() => {
        setCustomerFromToken()
    }, [])


    //communicates with server and actually gets reponse
    const login = async (usernameAndPassword) => {
        return new Promise((resolve, reject) => {
            performLogin(usernameAndPassword).then(res => {
                const jwtToken = res.headers["authorization"];
                localStorage.setItem("access_token", jwtToken);

                const customerDTO = res.data.customerDTO;

                if (customerDTO && customerDTO.username && customerDTO.name) {
                    setCustomer({
                        username: customerDTO.username,
                        name: customerDTO.name,
                        id: customerDTO.id,
                        age: customerDTO.age,
                        roles: customerDTO.roles
                    });
                    localStorage.setItem("customer_name", customerDTO.name);
                    localStorage.setItem("customer_id", customerDTO.id);
                    localStorage.setItem("customer_age", customerDTO.age);
                } else {
                    console.error("Customer details are incomplete", customerDTO);
                }

                resolve(res);
            }).catch(err => {
                reject(err);
            });
        });
    };




    const logOut = () => {
        localStorage.removeItem("access_token");
        localStorage.removeItem("customer_name");
        localStorage.removeItem("customer_id");
        localStorage.removeItem("customer_age");
        setCustomer(null)
    }

    const isCustomerAuthenticated = () => {
        const token = localStorage.getItem("access_token");
        if (!token) {
            return false;
        }
        const { exp: expiration } = jwtDecode(token);
        if (Date.now() > expiration * 10000000) {
            logOut()
            return false;
        }
        return true;
    }

    return (
        <AuthContext.Provider value={{
            customer,
            login,
            logOut,
            isCustomerAuthenticated,
            setCustomerFromToken
        }}>
            {children}
        </AuthContext.Provider>
    )
}

export const useAuth = () => useContext(AuthContext);

export default AuthProvider;