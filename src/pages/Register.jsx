import React, {useState} from "react";
import Add from "../img/addAvatar.png";
import {createUserWithEmailAndPassword, updateProfile} from "firebase/auth";
import {auth, db, storage} from "../firebase";
import {ref, uploadBytesResumable, getDownloadURL} from "firebase/storage";
import {doc, setDoc} from "firebase/firestore";
import {useNavigate, Link} from "react-router-dom";
import {useForm} from "react-hook-form";

const Register = () => {
    const [err, setErr] = useState(false);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();
    const {register, formState: {errors}, handleSubmit} = useForm()

    const handleRegister = async (data, e) => {
        setLoading(true);
        e.preventDefault();
        const {displayName, email, password} = data
        const file = e.target[3].files[0];

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);

            const date = new Date().getTime();
            const storageRef = ref(storage, `${displayName + date}`);

            await uploadBytesResumable(storageRef, file).then(() => {
                getDownloadURL(storageRef).then(async (downloadURL) => {
                    try {
                        await updateProfile(res.user, {
                            displayName,
                            photoURL: downloadURL,
                        });
                        await setDoc(doc(db, "users", res.user.uid), {
                            uid: res.user.uid,
                            displayName,
                            email,
                            photoURL: downloadURL,
                        });

                        await setDoc(doc(db, "userChats", res.user.uid), {});
                        navigate("/");
                    } catch (err) {
                        console.log(err);
                        setErr(true);
                        setLoading(false);
                    }
                });
            });
        } catch (err) {
            setErr(true);
            setLoading(false);
        }
    };

    return (
        <div className="formContainer">
            <div className="formWrapper">
                <span className="logo">N-Chat</span>
                <span className="title">Register</span>
                <form onSubmit={handleSubmit(handleRegister)}>
                    <input required type="text"
                           placeholder="display name"
                           {...register("displayName", { required: true })}/>
                    <input required type="email"
                           placeholder="email"
                           {...register("email", { required: true })}/>
                    <input required type="password"
                           placeholder="password"
                           {...register("password", { required: true })}/>
                    <input required style={{display: "none"}}
                           type="file"
                           id="file"
                           {...register("file", { required: true })}/>
                    <label htmlFor="file">
                        <img src={Add} alt=""/>
                        <span>Add an avatar</span>
                    </label>
                    <button disabled={loading}>Sign up</button>
                    <div style={{height: '30px'}}>
                        {errors?.displayName || errors?.email || errors?.password || errors?.files ?
                            <p className={'err'} style={{color: 'red'}}>The field is required</p> : null}
                    </div>
                    {loading && <span style={{fontSize: '12px'}}>Uploading and compressing the image please wait</span>}
                    {err && <span>Something went wrong</span>}
                </form>
                <p>
                    You do have an account? <Link to="/login">Login</Link>
                </p>
            </div>
        </div>
    );
};

export default Register;
