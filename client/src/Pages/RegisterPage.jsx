
import { useState } from "react";
import {Link, Navigate} from "react-router-dom";

import {errorNotification, successNotification} from "../services/notification.js";
import {saveCustomer} from "../services/client.js";


export default function RegisterPage(){
    const [email,setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [name,setName] = useState('');
    const [age, setAge] = useState('');
    const [gender, setGender] = useState('OTHER');
    const [redirect, setRedirect] = useState(false);


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
            await saveCustomer(customer);
            alert('Registration successful');
            setRedirect(true)
        }catch(e){
            alert('Registration failed');
        }
    }

    if(redirect){
        return <Navigate to="/login" />
    }

    return(
        <div className="grow flex items-center justify-around bg-mainGray text-white min-h-screen">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-6">Register</h1>
                <form className=" max-w-md mx-auto text-black" onSubmit={registerUser}>
                    <input type="text" placeholder="name" value={name} onChange={ev => setName(ev.target.value)}/>
                    <input type="email" placeholder="email" value={email} onChange={ev => setEmail(ev.target.value)}/>
                    <input type="password" placeholder="password" value={password}
                           onChange={ev => setPassword(ev.target.value)}/>
                    <input type="number" placeholder="age" value={age} onChange={ev => setAge(ev.target.value)}/>
                    <select name="gender" value={gender} onChange={ev => setGender(ev.target.value)}>
                        <option value="OTHER">OTHER</option>
                        <option value="MALE">MALE</option>
                        <option value="FEMALE">FEMALE</option>
                    </select>
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