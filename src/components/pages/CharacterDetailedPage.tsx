import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import StarWarsContext from "../../context/StarWarsContext";
import { ICharactersData } from "../../interface/ICharactersData.interface";
import Button from "../UI/Button.styled";
import LogOutButton from "../UI/LogOutButton";
import "./CharacterDetailedPage.css";

const CharacterDetailed = () => {
  const [characterData, setCharacterData] = useState<ICharactersData>();
  const [isLoading, setIsLoading] = useState(true);

  const { characterid } = useParams();

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      try {
        await axios
          .get(`https://swapi.dev/api/people/${characterid}/`)
          .then((result: any) => {
            if (result.data !== undefined) {
              const character: ICharactersData = {
                name: result.data.name,
                height: result.data.height,
                mass: result.data.mass,
                gender: result.data.gender,
                birth_year: result.data.birth_year,
                eye_color: result.data.eye_color,
                hair_color: result.data.hair_color,
                skin_color: result.data.skin_color,
                homeworld: result.data.homeworld,
                films: result.data.films,
                vehicles: result.data.vehicles,
                starships: result.data.starships,
                created: result.data.created,
                edited: result.data.edited,
                url: result.data.url,
              };
              setCharacterData(character);
            }
          });
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, []);

  return (
    <div>
      <LogOutButton />
      <Link to="/listed">
        <Button type="button">Back</Button>
      </Link>
      {isLoading && <div>Loading..</div>}
      {characterData && (
        <div className="title-data-div">
          <h1>{characterData.name}</h1>
          <div className="data-div">
            <div className="data-lower-div">
              <p>Height: {characterData.height}</p>
              <p>Mass: {characterData.mass}</p>
              <p>Gender: {characterData.gender}</p>
            </div>
            <div className="data-lower-div">
              <p>Birth year: {characterData.birth_year}</p>
              <p>Eye color: {characterData.eye_color}</p>
              <p>Hair color: {characterData.hair_color}</p>
              <p>Skin Color: {characterData.skin_color}</p>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
export default CharacterDetailed;
