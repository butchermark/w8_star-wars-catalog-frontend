import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import StarWarsContext from "../../context/StarWarsContext";
import Button from "../UI/Button.styled";
import "./LoginPage.css";

const LoginPage = () => {
  const { setAccesstoken, setLoading, setSiteSwitch, setIsAccessToken } =
    useContext(StarWarsContext);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [isSubmit, setIsSubmit] = useState(false);

  let navigate = useNavigate();

  useEffect(() => {
    if (username === "" || password === "") {
      setIsSubmit(false);
    } else {
      if (isSubmit) {
        const getUsers = async () => {
          try {
            setLoading(true);
            await axios
              .post("http://localhost:3000/auth/signin", {
                username: username,
                password: password,
              })
              .then((res) => {
                res.data && setIsSubmit(true);
                setAccesstoken(res.data.accesstoken);
                res.data &&
                  localStorage.setItem("accessToken", res.data.accesstoken);
                navigate("/listed");
              })
              .catch((err) => {
                setIsSubmit(false);
                console.log(err);
              });
          } catch (err) {
            setLoading(false);
          }
        };
        setSiteSwitch(true);
        getUsers();
      }
    }
  }, [isSubmit]);

  const handleSubmit = (e: any) => {
    setIsSubmit(true);
    setIsAccessToken(true);
  };

  return (
    <div className="login-wrapper-div">
      <div className="login-panel-div">
        <h1>Star Wars Catalog</h1>
        <div className="login-panel">
          <p>username:</p>
          <input
            type="text"
            className="input-field"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <p>Password:</p>
          <input
            type="password"
            className="input-field"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button
            type="button"
            className="submit-button"
            onClick={handleSubmit}
            disabled={isSubmit}
          >
            Login
          </Button>
        </div>
        <div className="dummy-data-div">
          <p>username: admin</p>
          <p>pw: asd123</p>
          <p>username: user</p>
          <p>pw: qwe123</p>
        </div>
      </div>
    </div>
  );
};
export default LoginPage;
