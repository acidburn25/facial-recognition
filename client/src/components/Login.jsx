import React from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";

const Login = () => {
  return (
    <div className="flex justify-start items-center flex-col h-screen">
      <div className="relative w-full h-full">
        <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0    bg-white">
          <div className="p-5">
            <img src={logo} width="250px" alt="" />
          </div>
          <form>
            <div>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-700 focus:outline-none"
                type="text"
                placeholder="Documento"
              ></input>
            </div>
            <div>
              <input
                className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-700 focus:outline-none"
                type="password"
                placeholder="Contraseña"
              ></input>
            </div>
            <div className="flex space-x-2 justify-center">
              <div>
                <button
                  type="button"
                  class="inline-block px-6 py-2.5 bg-greenEagles text-white font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-greenEaglesHover hover:shadow-lg focus:bg-greenEaglesFocus focus:shadow-lg focus:outline-none focus:ring-0 active:bg-greenEaglesActive active:shadow-lg transition duration-150 ease-in-out"
                >
                  Ingresar
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
