import { useState } from "react";
import logo from "../../assets/Images/shopping-cart.png";
import { userLogin } from "../../api/userApi";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import ConfirmModal from "../../Components/Modal/ConfirmModal";
import SuccessModal from "../../Components/Modal/SuccessModal";

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState('');
  const [falsePassword, setFalsePassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isError, setIsError] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false)
  const [isHidden, setIsHidden] = useState(true)


  const handleSignIn = () => {


    userLogin(username, password)
      .then((result) => {

        console.log(result, 'ressuuttlll');


        if (result) {


          console.log(result, 'resssullttt');

          setIsSuccess(true)

          setTimeout(() => {
            navigate("/");
            dispatch({
              type: "SET_USER", payload: {
                user: result?.username || "Guest",
                token: result?.user_id || "NoToken",
                profile: result?.profile_image || "no profile"
              }
            });
          }, 2500);


        } else {
          setIsError(true)
        }
      });
  };

  const handlePassword = () => {
    

    console.log(password.length);
    
    if(isHidden){
      
      const length = password.length
      let dotPassword = ''
      for (let i = 1; i <= length; i++) {

        dotPassword = dotPassword + '●'
      }

      return dotPassword

    }else{
      return password
    }
    
  

    
  }

  const setingPassword = (value)=> {
    console.log(value,'valuee',password);
    
// if (value) {
      const lastChr = value.charAt(value.length - 1);
      if (lastChr != '●') {
        if(value.length<password.length){
          setPassword(value)
        }else{
          setPassword(password + lastChr)
        }
        
      }else{;
          const withoutLastChar = password.slice(0, -1);
          setPassword(withoutLastChar);
        // }

      }
    }
  

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
                    value={username}
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
                <div className="mt-2 relative">
                  <input
                    onChange={(e) => {
                      // handlePassword(e.target.value)
                      setingPassword(e.target.value)
                    }}
                    // id="password"
                    // name="password"
                    // type="password"
                    value={handlePassword()}
                    required
                    autoComplete="current-password"
                    className="block w-full rounded-lg pr-10 bg-white px-3 py-1.5 text-base text-gray-900 hover:shadow-md transition-all focus:shadow-md outline-[#ffffff] placeholder:text-gray-400 sm:text-sm/6"
                  />
                  {isHidden ?
                    <>
                      <svg onClick={() => {
                        setIsHidden(false)
                      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="absolute right-2 top-1 cursor-pointer" viewBox="0 0 24 24"><g fill="none"><path fill="currentColor" fill-rule="evenodd" d="M15.92 12.799Q16 12.41 16 12a4 4 0 0 0-4.799-3.92l.923.923a3 3 0 0 1 2.874 2.873zm-6.527-2.285a3 3 0 0 0 4.093 4.093l.726.726a4 4 0 0 1-5.545-5.545z" clip-rule="evenodd" /><path fill="currentColor" fill-rule="evenodd" d="m16.154 17.275l-.735-.734c-1.064.579-2.22.959-3.419.959c-1.672 0-3.262-.74-4.633-1.726c-1.367-.984-2.474-2.182-3.17-3.026c-.423-.515-.467-.604-.467-.748c0-.143.044-.233.468-.748c.67-.812 1.72-1.953 3.018-2.915L6.5 7.623c-1.33 1.007-2.396 2.17-3.074 2.993l-.059.072c-.33.399-.637.77-.637 1.312s.307.913.637 1.312l.059.072c.725.88 1.894 2.149 3.357 3.201C8.243 17.635 10.036 18.5 12 18.5c1.51 0 2.92-.511 4.154-1.225M9.19 6.07c.88-.35 1.824-.569 2.81-.569c1.964 0 3.758.865 5.217 1.915c1.463 1.052 2.632 2.321 3.357 3.201l.059.072c.33.399.637.77.637 1.312s-.307.913-.637 1.312l-.059.072a20 20 0 0 1-1.983 2.086l-.708-.708a19 19 0 0 0 1.92-2.014c.424-.515.467-.604.467-.748c0-.143-.043-.233-.468-.748c-.695-.844-1.802-2.042-3.17-3.026C15.263 7.24 13.673 6.5 12 6.5c-.694 0-1.375.128-2.031.348z" clip-rule="evenodd" /><path stroke="currentColor" d="m5 2l16 16" stroke-width="1" /></g></svg>
                    </>
                    :
                    <>
                      <svg onClick={() => {
                        setIsHidden(true)
                        console.log(password);

                      }} xmlns="http://www.w3.org/2000/svg" width="24" height="24" className="absolute right-2 top-1 cursor-pointer" viewBox="0 0 24 24"><g fill="none" stroke="currentColor" stroke-width="1"><circle cx="12" cy="12" r="3.5" /><path d="M20.188 10.934c.388.472.582.707.582 1.066s-.194.594-.582 1.066C18.768 14.79 15.636 18 12 18s-6.768-3.21-8.188-4.934c-.388-.472-.582-.707-.582-1.066s.194-.594.582-1.066C5.232 9.21 8.364 6 12 6s6.768 3.21 8.188 4.934Z" /></g></svg>
                    </>
                  }
                </div>
              </div>


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

