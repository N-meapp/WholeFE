import React from 'react'
import { useState } from 'react';
import { useNavigate } from 'react-router-dom'
import { AdminLogin } from '../../../api/adminApi';
import { useDispatch } from 'react-redux';
import { showToast } from "../../Toast/Toast";

const LoginLayout = () => {
    const [username, setUsername] = useState();
    const [password, setPassword] = useState();
    const dispatch = useDispatch();
    const navigate = useNavigate();
    console.log(username, password, 'login form');
    
    const handleLogin = async () => {
        if (!username.trim() || !password.trim()) {
            alert("Please fill in both fields.");
            return;
        }
        
        try {
            const result = await AdminLogin(username, password);  // Await the login function
            console.log(result, "logon form");
            
            if (result.user_type === "admin") {
               
                dispatch({
                    type: "SET_ADMIN",
                    payload: {
                        admin: result?.username || "Guest",
                        token: result?.access_token || "NoToken",
                    },
                });
    
                navigate("/admin_dashboard");
                showToast("success", "Login Successfully!");
            } else {
          
                showToast("error", "Admin not found");
            }
    
        } catch (error) {
            console.error("Login error:", error);
            showToast("error", "An error occurred during login.");
        }
    };
    



  return (
    <>
    <div class="font-sans">
            <div class="relative min-h-screen flex flex-col sm:justify-center items-center bg-gray-100 ">
                <div class="relative sm:max-w-sm w-full">
                    <div class="card bg-blue-400 shadow-lg  w-full h-full rounded-3xl absolute  transform -rotate-6"></div>
                    <div class="card bg-red-400 shadow-lg  w-full h-full rounded-3xl absolute  transform rotate-6"></div>
                    <div class="relative w-full rounded-3xl  px-6 py-4 bg-gray-100 shadow-md">
                        <label for="" class="block mt-3 text-sm text-gray-700 text-center font-semibold">
                           WholeApp
                        </label>
                        <form method="#" action="#" class="mt-10">
                                           
                            <div>
                                <input onChange={(e)=>setUsername(e.target.value)} type="text" placeholder=" Enter username" class="p-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />
                            </div>
                
                            <div class="mt-7">                
                                <input onChange={(e)=>setPassword(e.target.value)} type="password" placeholder="Enter password" class="p-2 mt-1 block w-full border-none bg-gray-100 h-11 rounded-xl shadow-lg hover:bg-blue-100 focus:bg-blue-100 focus:ring-0" />                           
                            </div>

                            <div class="mt-7 flex">
                                <label for="remember_me" class="inline-flex items-center w-full cursor-pointer">
                                    <input id="remember_me" type="checkbox" class="rounded border-gray-300 text-indigo-600 shadow-sm focus:border-indigo-300 focus:ring focus:ring-indigo-200 focus:ring-opacity-50" name="remember" />
                                    <span class="ml-2 text-sm text-gray-600">
                                        readme
                                    </span>
                                </label>
                
                               <div class="w-full text-right">     
                                    <p class="underline text-sm text-gray-600 hover:text-gray-900" href="#">
                                        Login to your user name and password
                                    </p>                                  
                               </div>
                            </div>
                
                            <div class="mt-7">
                                <button onClick={handleLogin} class="bg-blue-500 w-full py-3 rounded-xl text-white shadow-xl hover:shadow-inner focus:outline-none transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    Login
                                </button>
                            </div>
                
                            <div class="flex mt-7 items-center text-center">
                                <hr class="border-gray-300 border-1 w-full rounded-md" />
                                {/* <label class="block font-medium text-sm text-gray-600 w-full">
                                    Accede con
                                </label> */}
                                <hr class="border-gray-300 border-1 w-full rounded-md" />
                            </div>
                
                            {/* <div class="flex mt-7 justify-center w-full">
                                <button class="mr-5 bg-blue-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    
                                    Facebook
                                </button>
                
                                <button class="bg-red-500 border-none px-4 py-2 rounded-xl cursor-pointer text-white shadow-xl hover:shadow-inner transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                    
                                    Google
                                </button>
                            </div> */}
                
                             {/* <div class="mt-7">
                                <div class="flex justify-center items-center">
                                    <label class="mr-2" >¿Eres nuevo?</label>
                                    <a href="#" class=" text-blue-500 transition duration-500 ease-in-out  transform hover:-translate-x hover:scale-105">
                                        Crea una cuenta
                                    </a>
                                </div>
                            </div> */}
                        </form>
                    </div>
                </div>
            </div>
            
        </div>
    
    </>
  )
}

export default LoginLayout