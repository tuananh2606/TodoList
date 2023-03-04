import { useState, useEffect } from 'react';
import axios from 'axios';

import StorageUtils from '../helpers/StorageUtils';
import { users } from '../initialData';
import { Input } from '../components/Input';
import api from '../services/api';
const Login = ({ setSuccess, setUser }) => {
    const [userLogin, setUserLogin] = useState({
        email: '',
        password: '',
        checked: false,
    });

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (userLogin.checked) {
            StorageUtils.setItem(
                'user',
                JSON.stringify({
                    email: `${userLogin.email}`,
                    password: `${userLogin.password}`,
                }),
            );
        }
        const user1 =
            userLogin !== undefined
                ? users.find((user) => userLogin.email === user.email && userLogin.password === user.password)
                : '';
        if (user1) {
            setUser(user1);
            setSuccess(true);
        }

        // api.create()
        //     .login(userLogin.email, userLogin.password)
        //     .then((response) => {
        //         const { data } = response;
        //         //         // xử trí khi thành công
        //         //         console.log(response);
        //         //     })
        //         console.log('data ', response);
        //         // setTaskOrder(data.columns);
        //     })
        //     .catch((error) => {
        //         const { message } = error;
        //         console.log('error: ', message);
        //     });
    };
    const handleChange = (e) => {
        setUserLogin((prev) => ({
            ...prev,
            [e.target.name]: e.target.value || e.target.checked,
        }));
    };

    return (
        <div className="grid place-items-center h-screen bg-gradient-to-r from-[#373b44] to-[#4286f4]">
            <div className="w-[500px] h-[650px] bg-white rounded-lg flex flex-col items-center p-3">
                <h1 className="my-10 text-5xl font-bold">Login</h1>
                <form className="w-full px-10" onSubmit={handleSubmit}>
                    <Input
                        label="Email"
                        type="email"
                        name="email"
                        value={userLogin.email}
                        className="w-full border-[2px] border-solid"
                        placeHolder="Your Email"
                        onChange={handleChange}
                    />
                    <Input
                        label="Password"
                        type="password"
                        name="password"
                        vakue={userLogin.password}
                        className="w-full border-[2px] border-solid"
                        placeHolder="Your Password"
                        onChange={handleChange}
                    />
                    <Input
                        type="checkbox"
                        id="rememberme"
                        label="Remember me?"
                        name="checked"
                        onChange={handleChange}
                    />
                    <button
                        type="submit"
                        className="w-full rounded-full mt-10 text-2xl text-white p-2 bg-gradient-to-r from-[#373b44] to-[#4286f4]"
                    >
                        Login
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Login;
