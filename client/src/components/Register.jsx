import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const Register = () => {
  const [inputEmpty, setInputEmpty] = useState(true);
  const [values, setValues] = useState({ document: "", user: "", pwd: "" });
  const [data, setData] = useState("");
  const navigate = useNavigate();

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {
    navigate("/Login");
  }

  const createUserEmployee = async () => {
    const user = {
      document: values.document,
      user: values.user,
      pwd: values.pwd,
    };

    await axios
      .post(
        "http://localhost:3005/createUserEmployee",
        user,
      )
      .then((response) => {
        setData(response.data)
      })
      .catch((error) => {
        console.log(error.response);
      });
  };

  useEffect(() => {
    if (values.user !== "" && values.pwd !== "" && values.document !== "") {
      setInputEmpty(false);
    }
  }, [inputEmpty, values.user, values.pwd, values.document]);

  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-white">
            <div className="p-5">
              <img src={logo} width="250px" alt="" />
            </div>
            <div>
              <input
                className="form-control block w-full mb-3 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-700 focus:ring-1 ring-green-700 focus:outline-none"
                type="text"
                placeholder="Documento"
                id="document"
                autoComplete="off"
                value={values.document}
                onChange={handleChange("document")}
                required
              ></input>
            </div>
            <div>
              <input
                className="form-control block w-full mb-3 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-700 focus:ring-1 ring-green-700 focus:outline-none"
                type="text"
                placeholder="Usuario"
                id="username"
                autoComplete="off"
                value={values.user}
                onChange={handleChange("user")}
                required
              ></input>
            </div>
            <div>
              <input
                className="form-control block w-full mb-3 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-700 focus:ring-1 ring-green-700 focus:outline-none"
                type="password"
                placeholder="Contraseña"
                id="password"
                value={values.pwd}
                onChange={handleChange("pwd")}
                required
              ></input>
            </div>
            <div className="flex space-x-2 justify-center">
              <div>
                <button
                  className="inline-block px-6 py-2.5 bg-greenEagles text-white font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-greenEaglesHover hover:shadow-lg focus:bg-greenEaglesFocus focus:shadow-lg focus:outline-none focus:ring-0 active:bg-greenEaglesActive active:shadow-lg transition duration-150 ease-in-out"
                  onClick={createUserEmployee}
                  disabled={inputEmpty ? true : false}
                >
                  Registrar
                </button>
              </div>
            </div>
            <br></br>
            <div >{data ? <div><strong>El usuario con documento {values.document} registrado exitosamente</strong>
            <br></br><br></br>
            <button onClick={handleClick} type="button" className="relative w-full h-full inline-block px-6 py-2.5 bg-greenEagles text-white font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-greenEaglesHover hover:shadow-lg focus:bg-greenEaglesFocus focus:shadow-lg focus:outline-none focus:ring-0 active:bg-greenEaglesActive active:shadow-lg transition duration-150 ease-in-out">Ir a Iniciar sesión</button>
            </div> : null}</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Register;
