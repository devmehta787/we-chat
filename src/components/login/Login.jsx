import { useState } from "react";
import "./login.css";
import { toast } from "react-toastify";
import { createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";
import { auth, db } from "../../lib/firebase";
import { doc, setDoc } from "firebase/firestore";
import upload from "../../lib/upload";
import { set } from "firebase/database";

const Login = () => {
    const [avatar, setAvatar] = useState({
        file: null,
        url:""
    })
    const [loading, setLoading] = useState(false);

    const handleAvatar = e => {
        if (e.target.files[0]) {            
            setAvatar({
                file: e.target.files[0],
                url: URL.createObjectURL(e.target.files[0])
            })
        }
    }

    const handleRegister = async(e) => {
        e.preventDefault();
        setLoading(true);
        const formData = new FormData(e.target);

        const { username, email, password } = Object.fromEntries(formData);
        if (!username || !email || !password) return toast.error("Please fill all the fields");

        try {
            const res = await createUserWithEmailAndPassword(auth, email, password);
            const imgUrl = await upload(avatar.file);
            
            await setDoc(doc(db, "users", res.user.uid), {
                username: username,
                email: email,
                avatar: imgUrl,
                id: res.user.uid,

                blocked:[],
            });
            
            await setDoc(doc(db, "userchats", res.user.uid), {
                chats:[],
            });
            toast.success("Account created successfully");
        } catch (err) {
            console.log(err)
            toast.error("Something went wrong")
        } finally {
            setLoading(false);

        }
    }

    const handleLogin = async (e) => {
        e.preventDefault();
        setLoading(true);

        const formData = new FormData(e.target);

        const { email, password } = Object.fromEntries(formData);
        if (!email || !password) return toast.error("Please fill all the fields");
        
        try {
            await signInWithEmailAndPassword(auth, email, password);
        } catch (err) {
            console.log(err)
            toast.error(err.message)
        } finally {
            setLoading(false);
        }
    }


    return (
        <div className="login">
            <div className="item">
                <h2>Welcome back</h2>
                <form onSubmit={handleLogin}>
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading} >{loading? "Loading" : "Sign In"}</button>
                </form>
            </div>
            
            <div className="separator"></div>
            
            <div className="item">
                <h2>Create an Account</h2>
                <form onSubmit={handleRegister}>
                    <label htmlFor="file">
                        <img src={avatar.url || "./avatar.png"} alt="" />
                            Upload an image
                    </label>
                    <input
                        style={{ display: "none" }}
                        onChange={handleAvatar}
                        type="file"
                        id="file"
                    />
                    <input type="text" placeholder="Username" name="username" />
                    <input type="text" placeholder="Email" name="email" />
                    <input type="password" placeholder="Password" name="password" />
                    <button disabled={loading} >{loading? "Loading" : "Sign Up"}</button>
                </form>
            </div>
        </div>
    )
}

export default Login