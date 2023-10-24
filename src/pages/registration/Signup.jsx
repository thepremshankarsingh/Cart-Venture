import { Link } from 'react-router-dom'
import { useContext, useState } from 'react';
import MyContext from '../../context/MyContext';
import { toast } from 'react-toastify';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { Timestamp, addDoc, collection } from 'firebase/firestore';
import { auth, fireDB } from '../../firebase/FirebaseConfig';
import Loader from '../../components/loader/Loader';

function Signup() {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const context = useContext(MyContext);
    const { loading, setLoading } = context;
    const singnup = async () => {
            if (name === "" || email === "" || password === "") {
                return;
          }
          setLoading(true);
        try {
            const users = await createUserWithEmailAndPassword(auth, email, password);
            const user = {
                name: name,
                uid: users.user.uid,
                email: users.user.email,
                time: Timestamp.now()
            }

            const userRef = collection(fireDB, "users");
            await addDoc(userRef, user);
            setName("");
            setEmail("");
            setPassword("");
            toast.success("Signup Succesfully",{
                position: "top-center",
                autoClose: 1000
            })
            setLoading(false);
            setTimeout(()=>
            {
                window.location.href='/login'
            },1000)
          
          
        }
        catch (error) {
            toast.error("Signup failed",{
                position: "top-center",
                autoClose: 1000
            })
            setLoading(false);

        }
    }
    return (
        <div className=' flex justify-center items-center h-screen bg-[#c4a4f9]'>
            {loading&&<Loader/>}
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Signup</h1>
                </div>
                <form onSubmit={(e) => e.preventDefault()}>
                    <div>
                        <input type="text"
                            name='name'
                            value={name}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Name'
                            onChange={(e) => setName(e.target.value)}
                            required

                        />
                    </div>
                    <div>
                        <input type="email"
                            name='email'
                            value={email}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Email'
                            onChange={(e) => setEmail(e.target.value)}
                            required
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            value={password}
                            className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                            placeholder='Password'
                            onChange={(e) => setPassword(e.target.value)}
                            required

                        />
                    </div>
                    <div className=' flex justify-center mb-3'>
                        <button
                            className=' bg-red-500 w-full text-white font-bold  px-2 py-2 rounded-lg'
                            onClick={singnup}>
                            Signup
                        </button>
                    </div>
                </form>
                <div>
                    <h2 className='text-white'>Have an account? <Link className=' text-red-500 font-bold' to={'/login'}>Login</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Signup