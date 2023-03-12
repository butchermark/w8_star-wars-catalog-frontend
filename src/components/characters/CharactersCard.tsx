import { useContext, useEffect } from "react";
import { Link } from "react-router-dom";
import StarWarsContext from "../../context/StarWarsContext";
import { CardWrapper } from "../../styling/CardWrapper";
import { Wrapper } from "../../styling/Wrapper";
import "./CharactersCard.css";

const CharactersCard = ({ character, index }: any) => {
  return (
    <Link className="link-div" to={`/listed/${index}`}>
      <CardWrapper>
        <Wrapper className="wrapper">
          <p className="p-name">{character.name}</p>
          <p className="p-data">Height: {character.height}</p>
          <p className="p-data">Mass: {character.mass}</p>
        </Wrapper>
      </CardWrapper>
    </Link>
  );
};
export default CharactersCard;
