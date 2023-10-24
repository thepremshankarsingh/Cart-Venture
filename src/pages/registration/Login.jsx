import { Link, useNavigate } from 'react-router-dom'
import { useState,useContext } from 'react';
import MyContext from '../../context/MyContext';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../../firebase/FirebaseConfig';
import { toast } from 'react-toastify';
import Loader from '../../components/loader/Loader';
function Login() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const navigate=useNavigate();
    
    const context = useContext(MyContext);
    const { loading,setLoading} = context;
    const  login = async ()=>
    {     
        if(email===""||password==="")
        {
            return ;
        }
        setLoading(true);
           try {

               const result=await signInWithEmailAndPassword(auth,email,password);
               toast.success("Login successfully",{
                position: "top-center",
                autoClose: 1000
               });
               setLoading(false);
               localStorage.setItem('user',JSON.stringify(result)); 
               navigate('/');
            
           } catch (error) {
             toast.error('Sigin Failed',{
                position: "top-center",
                autoClose: 1000
             });
             setLoading(false);

           }
    }
    return (
        <div className=' flex justify-center items-center h-screen bg-[#c4a4f9]'>
             {
                loading&&<Loader/>
             }
            <div className=' bg-gray-800 px-10 py-10 rounded-xl '>
                <div className="">
                    <h1 className='text-center text-white text-xl mb-4 font-bold'>Login</h1>
                </div>
                <form onSubmit={(e)=>e.preventDefault()}>
                <div>
                    <input type="email"
                        name='email'
                        value={email}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Email'
                        onChange={(e)=>setEmail(e.target.value)}
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        value={password}
                        className=' bg-gray-600 mb-4 px-2 py-2 w-full lg:w-[20em] rounded-lg text-white placeholder:text-gray-200 outline-none'
                        placeholder='Password'
                        onChange={(e)=>setPassword(e.target.value)}
                        required
                    />
                </div>
                <div className=' flex justify-center mb-3'>
                    <button
                        className=' bg-yellow-500 w-full text-black font-bold  px-2 py-2 rounded-lg'
                        onClick={login}>
                        Login
                    </button>
                </div>
                </form>
                <div>
                    <h2 className='text-red-400'>Don't have an account? <Link className=' text-yellow-500 font-bold' to={'/signup'}>Signup</Link></h2>
                </div>
            </div>
        </div>
    )
}

export default Login 