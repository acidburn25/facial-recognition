import { React, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import logo from "../assets/logo.png";
import axios from "axios";

const Login = () => {
  const [inputEmpty, setInputEmpty] = useState(true);
  const [values, setValues] = useState({ document: "", pwd: "" });
  const [data, setData] = useState("");
  const navigate = useNavigate();

  /*useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedESApp')

    if (loggedUserJSON) {
      const document = JSON.parse(loggedUserJSON);
    }
  }, [])*/

  const handleChange = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };

  const handleClick = () => {
    navigate("/Register");
  }

  const getUserEmployee = async () => {
    const user = {
      document: values.document,
      pwd: values.pwd,
    };

    await axios
      .post(
        "http://localhost:3005/getUserEmployee",
        user,
      )
      .then((response) => {
        console.log(response.data);
        setData(response.data.ok)
        window.localStorage.setItem('loggedESApp', JSON.stringify(response.data));
        handleClick();
      })
      .catch((error) => {
        console.log(error.response);
        setData(error.response)
      });
  };

  useEffect(() => {
    if (values.pwd !== "" && values.document !== "") {
      setInputEmpty(false);
    }
  }, [inputEmpty, values.pwd, values.document]);

  const divStyle = {
    display: 'flex',
    flexDirection: 'column',
    background: '#fff',
    borderRadius: '8px',
    padding: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1), 0 8px 16px rgba(0, 0, 0, 0.1)',
    maxWidth: '400px',
    width: '100%',
  };

  return (
    <>
      <div className="flex justify-start items-center flex-col h-screen">
        <div className="relative w-full h-full">
          <div className="absolute flex flex-col justify-center items-center top-0 right-0 left-0 bottom-0 bg-backgroundPage">
            <div className="p-5">
              <img src={logo} width="250px" alt="" />
            </div>
            <div style={divStyle}>
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
              <input
                className="form-control block w-full mb-3 px-3 py-2 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded-md transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-green-700 focus:ring-1 ring-green-700 focus:outline-none"
                type="password"
                placeholder="Contraseña"
                id="password"
                value={values.pwd}
                onChange={handleChange("pwd")}
                required
                ></input>
              <div>
                <button
                    className="inline-block px-6 py-2.5 bg-greenEagles text-white font-bold text-xs leading-tight uppercase rounded-full shadow-md hover:bg-greenEaglesHover hover:shadow-lg focus:bg-greenEaglesFocus focus:shadow-lg focus:outline-none focus:ring-0 active:bg-greenEaglesActive active:shadow-lg transition duration-150 ease-in-out"
                    onClick={getUserEmployee}
                    disabled={inputEmpty ? true : false}
                  >
                    Ingresar
                  </button>
                </div>
              </div>
            <br></br>
            <div >{data ? <div><strong>Usuario o contraseña incorrecta, por favor ingrese nuevamente</strong></div> : null }</div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
