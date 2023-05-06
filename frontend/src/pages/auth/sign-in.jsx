import { useState, useEffect } from "react"
import axios from 'axios'
import { useNavigate } from "react-router-dom"
import Layout from "../../components/layout"

const Login = () => {
    const [username, setUsername] = useState('')
    const [password, setPassword] = useState('')
    const navigate = useNavigate()

    const loginUser = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post('http://localhost:4000/api/auth', {
                username,
                password
            });
            console.log(username, password)
            const data = response.data;
            console.log("token", data)
            if (data) {
                localStorage.setItem('accessToken', data.accessToken);
                alert('Login successful');
            } else {
                alert('Please check your username and password');
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <>
            <Layout>
                <br /> <br />
                <div  >
                    <center >
                        <div class="w-full max-w-xs">
                        <h1>Login</h1>
                        <form class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4" onSubmit={loginUser}>
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={username}
                                placeholder="Username"
                                onChange={(e) => setUsername(e.target.value)}
                                type="text"
                            />
                            <br />
                            <input
                                className="appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"
                                value={password}
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                type="password"
                            />
                            <br />
                            <input className="flex-shrink-0 bg-teal-500 hover:bg-teal-700 border-teal-500 hover:border-teal-700 text-sm border-4 text-white py-2 px-3 rounded" type="submit" value="Login" />
                        </form>
                        </div>
                    </center>
                </div>
            </Layout>
        </>
    )
}

export default Login