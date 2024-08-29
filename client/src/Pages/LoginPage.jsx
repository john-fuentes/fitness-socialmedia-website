import { useState } from "react";
import { Link, Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext"; // Import the AuthContext

export default function LoginPage() {
    const [email, setEmail] = useState('');

    const [name, setName] = useState('');
    const [password, setPassword] = useState('');
    const [redirect, setRedirect] = useState(false);
    const { login } = useAuth(); // Use login from AuthContext

    async function handleLoginSubmit(ev) {
        ev.preventDefault();
        try {
            await login({ username: email, password }); // Login with AuthContext
            alert('Login successful');
            setRedirect(true);
        } catch (e) {
            alert('Login failed');
        }
    }

    if (redirect) {
        return <Navigate to={'/mainfeedpage'} />;
    }

    return (
        <div className="grow min-h-screen items-center justify-around bg-mainGray text-white">
            <div className="mb-64">
                <h1 className="text-4xl text-center mb-6">Login</h1>
                <form className="max-w-md mx-auto text-black" onSubmit={handleLoginSubmit}>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={ev => setEmail(ev.target.value)}
                        required
                    />
                    <input
                        type="password"
                        placeholder="Password"
                        value={password}
                        onChange={ev => setPassword(ev.target.value)}
                        required
                    />
                    <button className="primary mt-1">Login</button>
                </form>
                <div className="text-center mt-1">
                    Don't have an account yet?
                    <Link className="px-1 underline text-primary" to="/register">Register</Link>
                </div>
            </div>
        </div>
    );
}
