import axios from "axios";
import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StarWarsContext from "../../context/StarWarsContext";
import CharactersList from "../characters/CharactersList";
import Button from "../UI/Button.styled";
import LogOutButton from "../UI/LogOutButton";
import "./ListPage.css";

const ListPage = () => {
  const {
    isAccessToken,
    setIsAccessToken,
    pageNumber,
    siteSwitch,
    accessToken,
  } = useContext(StarWarsContext);

  const deleteToken = () => {
    localStorage.removeItem("accessToken");
    setIsAccessToken(false);
  };

  return (
    <div className="list-page-main-div">
      {!isAccessToken ? (
        <div className="list-div">
          <div className="title-div">
            <h1 className="title">Star Wars Catalog</h1>
            <LogOutButton />
          </div>
          <CharactersList />
        </div>
      ) : (
        <div className="list-div">
          <p>No token with permission!</p>
          <Link to="/login">
            <Button onClick={deleteToken}>Login Page</Button>
          </Link>
        </div>
      )}
    </div>
  );
};

export default ListPage;
