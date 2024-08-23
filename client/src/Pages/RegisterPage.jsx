
import { useState } from "react";
import { Link } from "react-router-dom";

import {errorNotification, successNotification} from "../services/notification.js";
import {saveCustomer} from "../services/client.js";


export default function RegisterPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('');


    async function registerUser(ev){
        ev.preventDefault();

        const customer = {
            name,
            email,
            password,
            age,
            gender
        }
        try{
            const response = await saveCustomer(customer);
            successNotification('Registration successful. Now you can log in');
            console.log(response)
        }catch(e){
            errorNotification('Registration failed. Please try again later');
            console.error(e)
        }
    }
    return(
        <div className="grow flex items-center justify-around bg-mainGray text-white">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-6">Register</h1>
                <form className=" max-w-md mx-auto text-black" onSubmit={registerUser}>
                    <input type="text" placeholder="name" value={name} onChange={ev => setName(ev.target.value)}/>
                    <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="password" value={password}
                           onChange={ev => setPassword(ev.target.value)}/>
                    <input type="number" placeholder="age" value={age} onChange={ev => setAge(ev.target.value)}/>
                    <input type="text" placeholder="gender" value={gender} onChange={ev => setGender(ev.target.value)}/>
                    <button className="primary mt-1">Register</button>
                </form>
                <div className="text-center mt-1">
                    Already have an account?
                    <Link className="px-1 underline text-primary" to="/login">Login</Link>
                </div>
            </div>
        </div>
    )
}