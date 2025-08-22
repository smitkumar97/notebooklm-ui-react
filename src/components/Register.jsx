import { Link, useNavigate } from 'react-router-dom'
import { register } from '../services/auth.service';
import { useState } from 'react';

const Register = () => {
    const [name, setName] = useState();
    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const navigate = useNavigate();

    const handleSubmit = (e) => {
        e.preventDefault();
        proceedToRegister(name, email, password);
    }

    const proceedToRegister = async (name, email, password) => {
        try {
            const response = await register(name, email, password);
            if (response.status === 201) {
                alert(response.data.message);
                setName('');
                setEmail('');
                setPassword('');
                navigate('/login');
            }
        } catch (error) {
            console.error(error);
            alert(`${error.data.message || 'Something went wrong. Please try again after sometime.'}`);
        }
    }

    return (
        <div className="flex h-[100vh] flex-col justify-center items-center">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <img
                    alt="Your Company"
                    src="https://tailwindcss.com/plus-assets/img/logos/mark.svg?color=blue&shade=500"
                    className="mx-auto h-10 w-auto"
                />
                <h2 className="mt-2 text-center text-2xl/9 font-bold tracking-tight text-white">Register yourself with us!</h2>
            </div>

            <div className="mt-10 w-80 p-6 sm:w-5/12 bg-gray-800 md:p-12 rounded-xl">
                <form onSubmit={handleSubmit} className="space-y-8">
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                            Name
                        </label>
                        <div className="mt-2">
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={name}
                                autoComplete="name"
                                placeholder='Enter your name'
                                onInput={(e) => setName(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                            />
                        </div>
                    </div>
                    <div>
                        <label htmlFor="email" className="block text-sm/6 font-medium text-gray-100">
                            Email address
                        </label>
                        <div className="mt-2">
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={email}
                                autoComplete="email"
                                placeholder='Enter your email'
                                onInput={(e) => setEmail(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div>
                        <div className="flex items-center justify-between">
                            <label htmlFor="password" className="block text-sm/6 font-medium text-gray-100">
                                Password
                            </label>
                        </div>
                        <div className="mt-2">
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={password}
                                autoComplete="current-password"
                                placeholder='Enter your password'
                                onInput={(e) => setPassword(e.target.value)}
                                className="block w-full rounded-md bg-white/5 px-3 py-1.5 text-base text-white outline-1 -outline-offset-1 outline-white/10 placeholder:text-gray-500 focus:outline-2 focus:-outline-offset-2 focus:outline-blue-500 sm:text-sm/6"
                            />
                        </div>
                    </div>

                    <div className="mt-2">
                        <button
                            type="submit"
                            className="flex w-full justify-center rounded-md bg-blue-500 px-3 py-1.5 text-sm/6 font-semibold text-white hover:bg-blue-400 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500"
                        >
                            Register
                        </button>
                    </div>
                </form>

                <p className="mt-10 text-center text-sm/6 text-gray-400">
                    Already a member?{' '}

                    <Link
                        to="/login"
                        className="font-semibold text-blue-400 hover:text-blue-300"
                    >
                        Login
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default Register