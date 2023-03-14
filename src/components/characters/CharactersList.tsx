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
  } = useContext(StarWarsContext);
  const [isLoading, setIsLoading] = useState(false);
  const [characters, setCharacters] = useState<ICharactersData[]>([]);
  const [filterValue, setFilterValue] = useState("");
  const [sortValue, setSortValue] = useState("");
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [standardCharacters, setStandardCharacters] = useState<
    ICharactersData[]
  >([]);

  useEffect(() => {
    setIsSort(false);
    setIsFilter(false);
    const getCharacters = async () => {
      try {
        setLoading(true);
        await axios
          .get(`https://swapi.dev/api/people/?page=${pageNumber}`)
          .then((res) => {
            setCharacters(res.data.results);
            setStandardCharacters(res.data.results);
            setIsThereNextPage(res.data.next);
            setIsTherePrevPage(res.data.previous);
          });
      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };
    getCharacters();
  }, [siteSwitch, pageNumber]);

  const setSortValueHandler = (value: any) => {
    setSortValue(value);
    setIsSort(true);
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
    setIsFilter(true);
  };

  useEffect(() => {
    if (filterValue === "") {
      setCharacters(standardCharacters);
      console.log(standardCharacters);
    }
    if (filterValue === "male") {
      const filtered = standardCharacters.filter(
        (character: ICharactersData) => {
          return character.gender === "male";
        }
      );
      setCharacters(filtered);
      console.log([...filtered]);
    }
    if (filterValue === "female") {
      const filtered = standardCharacters.filter(
        (character: ICharactersData) => {
          return character.gender === "female";
        }
      );
      setCharacters(filtered);
      console.log([...filtered]);
    }
  }, [filterValue, pageNumber]);

  useEffect(() => {
    if (loading) {
      setIsLoading(true);
    } else {
      setIsLoading(false);
    }
  }, [loading]);

  const calculateIndex = (index: number) => {
    return (pageNumber - 1) * 10 + (index + 1);
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
            {characters.map((character: ICharactersData, index: number) => (
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
                  index={calculateIndex(index)}
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
