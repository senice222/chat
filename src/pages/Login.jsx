import React, {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import {signInWithEmailAndPassword} from "firebase/auth";
import {auth} from "../firebase";
import {useForm} from "react-hook-form";

const Login = () => {
    const [err, setErr] = useState(false);
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm()

    const handleLogin = async (data, e) => {
        e.preventDefault();
        const {email, password} = data

        try {
            await signInWithEmailAndPassword(auth, email, password);
            navigate("/")
        } catch (err) {
            setErr(true);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">N-Chat</span>
                <span className="title">Login</span>
                <form onSubmit={handleSubmit(handleLogin)}>
                    <input type="email" placeholder="email" {...register("email", {required: true })}/>
                    <input type="password" placeholder="password" {...register("password", {required: true })}/>
                    <button>Sign in</button>
                    <div style={{height: '30px'}}>
                        {errors?.email || errors?.password ?
                            <p style={{color: 'red'}}>Email or password already in use, or something went wrong</p> : null}
                    </div>
                    {err && <span>Something went wrong</span>}
                </form>
                <p>You don't have an account? <Link to="/register">Register</Link></p>
            </div>
        </div>
    );
};

export default Login;