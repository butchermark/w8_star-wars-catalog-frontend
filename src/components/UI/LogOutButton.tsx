import { useContext } from "react";
import { Link } from "react-router-dom";
import StarWarsContext from "../../context/StarWarsContext";
import Button from "./Button.styled";
import "./LogOutButton.css";

const LogOutButton = () => {
  const { accessToken, setLoading, setSiteSwitch } =
    useContext(StarWarsContext);

  const handleLogOut = () => {
    localStorage.removeItem("accessToken");
    setLoading(false);
    setSiteSwitch(false);
  };

  return (
    <div className="log-out-button-div">
      <Link className="a-div" to="/login">
        <Button className="log-out-button" type="button" onClick={handleLogOut}>
          Logout
        </Button>
      </Link>
    </div>
  );
};
export default LogOutButton;
