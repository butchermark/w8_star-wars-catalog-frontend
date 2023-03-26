import { Grid } from "@mui/material";
import axios from "axios";
import { useContext, useEffect, useState } from "react";
import StarWarsContext from "../../context/StarWarsContext";
import { ICharactersData } from "../../interface/ICharactersData.interface";
import DropDownFiltering from "../UI/DropDownFiltering";
import DropDownSorting from "../UI/DropDownSorting";
import NextPageButton from "../UI/NextPageButton";
import PrevPageButton from "../UI/PrevPageButton";
import CharactersCard from "./CharactersCard";
import "./CharactersList.css";

const CharactersList = () => {
  const {
    pageNumber,
    setLoading,
    loading,
    siteSwitch,
    setIsThereNextPage,
    setIsTherePrevPage,
    isThereNextPage,
    isTherePrevPage,
    accessToken,
  } = useContext(StarWarsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<ICharactersData[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [standardCharacters, setStandardCharacters] = useState<
    ICharactersData[]
  >([]);

  useEffect(() => {
    const getCharacters = async () => {
      try {
        setLoading(true);

        await axios
          .get(
            `http://localhost:3000/swapi/characters?pageNumber=${
              pageNumber ?? 1
            }`,
            {
              headers: {
                Authorization: `Bearer ${accessToken}`,
              },
            }
          )
          .then((res) => {
            if (res.data === "") {
              return;
            } else {
              setCharacters(res.data.results);
            }
            setCharacters(res.data.results);
            setStandardCharacters(res.data.results);
            setIsThereNextPage(res.data.next);
            setIsTherePrevPage(res.data.previous);
            setLoading(false);
            console.log(accessToken);
          });
      } catch (err) {
        console.log(err);
        setCharacters([]);
      }
      setLoading(false);
    };
    getCharacters();
  }, [siteSwitch, pageNumber]);

  const setSortValueHandler = (value: any) => {
    setSortValue(value);
  };

  useEffect(() => {
    if (sortValue === "name") {
      const sorted = characters.sort(
        (a: ICharactersData, b: ICharactersData) => {
          return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
        }
      );
      setCharacters([...sorted]);
    }
    if (sortValue === "height") {
      const sorted = characters.sort(
        (a: ICharactersData, b: ICharactersData) => {
          return b.height - a.height;
        }
      );
      setCharacters([...sorted]);
    }
    if (sortValue === "mass") {
      const sorted = characters.sort(
        (a: ICharactersData, b: ICharactersData) => {
          return b.mass - a.mass;
        }
      );
      setCharacters([...sorted]);
    }
  }, [sortValue, pageNumber]);

  const filterCharactersHandler = (value: any) => {
    setFilterValue(value);
  };

  useEffect(() => {
    if (filterValue === "") {
      setCharacters(standardCharacters);
    }
    if (filterValue === "male") {
      const filtered = standardCharacters.filter(
        (character: ICharactersData) => {
          return character.gender === "male";
        }
      );
      setCharacters(filtered);
    }
    if (filterValue === "female") {
      const filtered = standardCharacters.filter(
        (character: ICharactersData) => {
          return character.gender === "female";
        }
      );
      setCharacters(filtered);
    }
  }, [filterValue, pageNumber]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  const convertURL = (character: ICharactersData) => {
    return parseFloat(character.url.split("/")[5]);
  };

  return (
    <div className="list-div">
      <div className="page-buttons-div">
        <DropDownFiltering setFilterValue={filterCharactersHandler} />
        <PrevPageButton />
        <NextPageButton />
        <DropDownSorting setSortValue={setSortValueHandler} />
      </div>
      <div className="listed-items">
        {isLoading ? (
          <div className="loading-p">Loading...</div>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {characters.map((character: ICharactersData) => (
              <Grid
                key={character.name}
                item
                xs={4}
                sm={3}
                md={4}
                lg={3}
                style={{
                  display: "flex",
                  justifyContent: "center",
                }}
              >
                <CharactersCard
                  character={character}
                  /*
                  index={calculateIndex(index)}
                  */
                  index={convertURL(character)}
                ></CharactersCard>
              </Grid>
            ))}
          </Grid>
        )}
      </div>
    </div>
  );
};
export default CharactersList;
