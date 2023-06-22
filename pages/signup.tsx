import { ButtonWithImage } from "@/Components/components";
import { useContext, useEffect, useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AuthContext } from "@/context/AuthContext";
import { useRouter } from "next/router";
import Captcha from "@/Components/Utils/Captcha";

const SignUp = () => {
  const router = useRouter();
  const [userData, setUserData] = useState({
    email: "",
    password: "",
    confirmPassword: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const showPasswordToggle = () => {
    setShowPassword(!showPassword);
  };
  const { currentUser, signup } = useContext(AuthContext);
  const [trackState, setTrackState] = useState(false)

  const warning = () => {
    toast.warn("Please Complete all fields", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const success = () => {
    toast.success("Account Created", {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
    });
  };

  const error = ({ message }: any) => {
    toast.error(`${message}`, {
      position: "bottom-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      theme: "light",
    });
  };

  const handleSignUp = () => {
    if (
      userData.email === "" ||
      userData.password === "" ||
      userData.confirmPassword === ""
    ) {
      warning();
    } else if (userData.password !== userData.confirmPassword) {
      error({ message: "Passwords do not match" });
    } else {
      signup(userData.email, userData.password)
        .then(({ data }: any) => {
          success();
          router.push("/dashboard");
        })
        .catch((err: any) => {
          error({ message: err.message });
        });
    }
  };

  return (
    <div className="flex w-full h-screen bg-gray-200 ">
      <ToastContainer />
      <div className="flex flex-col w-10/12 p-4 m-auto bg-white rounded-lg md:w-8/12 lg:w-1/4 h-fit min-h-1/4 ">
        <div className="flex flex-col items-center space-y-8 ">
          {/* login heading and text */}
          <div className="flex flex-col w-full px-2 mt-8 space-y-2 ">
            <h3 className="text-3xl font-semibold ">Sign Up</h3>
            <h4 className="flex">Welcome to Gyana Guru. </h4>
          </div>

          {/* login form */}
          <div className="flex flex-col w-full mx-4 space-y-4 ">
            <ButtonWithImage
              buttonName="Continue with Google"
              icon="/images/google.svg"
            />

            {/* make or with divider */}
            <div className="flex flex-row items-center my-4 space-x-4">
              <hr className="w-full border-gray-200" />
              <h4 className="font-medium text-zinc-500">or</h4>
              <hr className="w-full border-gray-300" />
            </div>

            {/* login with email and password */}
            <div className="flex flex-col space-y-4">
              {/* email */}
              <input
                type="email"
                placeholder="Email"
                value={userData.email}
                onChange={(e) =>
                  setUserData({ ...userData, email: e.target.value })
                }
                className="p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-black"
              />
              {/* password */}
              <div className="flex w-full space-x-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  value={userData.password}
                  onChange={(e) =>
                    setUserData({ ...userData, password: e.target.value })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2"
                />
              </div>
              {/* confirm password */}
              <div className="flex w-full space-x-2">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Confirm password"
                  value={userData.confirmPassword}
                  onChange={(e) =>
                    setUserData({
                      ...userData,
                      confirmPassword: e.target.value,
                    })
                  }
                  className="w-full p-2 border border-gray-300 rounded-lg focus:outline-none focus:border-2 focus:border-black"
                />
                <div
                  className="flex items-center p-2 border border-gray-300 rounded-lg text-zinc-500 focus:outline-none focus:border-2 focus:border-black "
                  onClick={() => showPasswordToggle()}
                >
                  <span className="material-icons-outlined ">
                    {showPassword ? "visibility" : "visibility_off"}
                  </span>
                </div>
              </div>
              <Captcha message={setTrackState} trackState={trackState}/>
            </div>

            {/* login button */}
            <div className="flex flex-row space-x-4 py-4 transition hover:scale-[1.02]">
              <button
                className="w-full p-2 text-white bg-black rounded-lg"
                onClick={handleSignUp} disabled={!trackState}
                style={{cursor:`${trackState ? "pointer": "not-allowed"}`}}
              >
                Sign Up
              </button>
            </div>

            {/* Create Account */}
            <div className="flex flex-col items-center justify-between mt-4 text-sm">
              <p className="w-fit text-slate-600">Already have an account</p>
              <p
                onClick={() => router.push("/login")}
                className="text-black cursor-pointer w-fit hover:underline"
              >
                Sign In to you account
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUp;

