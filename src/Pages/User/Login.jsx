import { useState } from "react";
import logo from "../../assets/Images/shopping-cart.png";
import { userLogin } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../Components/Modal/ConfirmModal";
import SuccessModal from "../../Components/Modal/SuccessModal";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError,setIsError] = useState(false);
  const [isSuccess,setIsSuccess] = useState(false)


  const handleSignIn = () => {

  

    userLogin(username, password)
    .then( (result) => {

      
      if (result) {

        console.log(result,'sdfsdfsfd');
        
        setIsSuccess(true)
        
        setTimeout(() => {
          navigate("/");
          dispatch({ type: "SET_USER", payload: {
            user: result?.username || "Guest",
            token: result?.user_id || "NoToken",
          } });
        },2500);
    
        

       
      }else{
        setIsError(true)
      }
    });
  };

  return (
    <>
      <div className="flex min-h-screen flex-1 flex-col justify-center px-6 py-12 lg:px-8">
        <div>
          <div className="sm:mx-auto sm:w-full sm:max-w-sm">
            <img
              alt="Your Company"
              src={logo}
              className="mx-auto h-10 w-auto"
            />
            <h2 className="mt-10 text-center text-2xl/9 font-bold tracking-tight text-gray-900">
              Sign in to your account
            </h2>
          </div>

          <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
            <div className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  User name
                </label>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setUsername(e.target.value);
                    }}
                    id="name"
                    name="name"
                    type="name"
                    //   value={username}
                    autoComplete="name"
                    className="block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 hover:shadow-md transition-all focus:shadow-md outline-[#ffffff] placeholder:text-gray-400 sm:text-sm/6"
                  />
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between">
                  <label
                    htmlFor="password"
                    className="block text-sm/6 font-medium text-gray-900"
                  >
                    Password
                  </label>
                </div>
                <div className="mt-2">
                  <input
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    id="password"
                    name="password"
                    type="password"
                    //   value={password}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 hover:shadow-md transition-all focus:shadow-md outline-[#ffffff] placeholder:text-gray-400 sm:text-sm/6"
                  />
                </div>
              </div>

              {/* <div>
              <div className="flex items-center justify-between">
                <label
                  htmlFor="password"
                  className="block text-sm/6 font-medium text-gray-900"
                >
                  Repeat password
                </label>
              </div>
              <div className="mt-2">
                <input
                  id="password"
                  name="password"
                  type="password"
                  required
                  autoComplete="current-password"
                  className="block w-full rounded-lg bg-white px-3 py-1.5 text-base text-gray-900 hover:shadow-md transition-all focus:shadow-md outline-[#ffffff] placeholder:text-gray-400 sm:text-sm/6"
                />
              </div>
            </div> */}

              <div>
                <button
                  onClick={() => {
                    handleSignIn();
                  }}
                  className="flex w-full justify-center rounded-md bg-[#79c070] px-3 py-1.5 text-sm/6 font-semibold text-white shadow-xs hover:shadow-lg hover:border border-[#dad8d8] focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#ff5a54]"
                >
                  Sign in
                </button>
              </div>
            </div>

            <p className="mt-10 text-center text-sm/6 text-gray-500">
              forgot password?
              <a
                href="#"
                className="font-semibold text-[#ff8e8e] hover:text-[gray]"
              >
                click here
              </a>
            </p>
          </div>
        </div>
      </div>
      <ConfirmModal openModal={isError} setOpenModal={setIsError} />
      <SuccessModal openModal={isSuccess} setOpenModal={setIsSuccess} message={'Login Successfully'} subMessage={'Explore your needs.'} />
    </>
  );
}
