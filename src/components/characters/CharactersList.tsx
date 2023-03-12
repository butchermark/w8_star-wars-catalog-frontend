import { Grid } from "@mui/material";
import { useContext, useEffect, useState } from "react";
import StarWarsContext from "../../context/StarWarsContext";
import DropDownFiltering from "../UI/DropDownFiltering";
import DropDownSorting from "../UI/DropDownSorting";
import NextPageButton from "../UI/NextPageButton";
import PrevPageButton from "../UI/PrevPageButton";
import CharactersCard from "./CharactersCard";
import "./CharactersList.css";

const CharactersList = () => {
  const { pageNumber } = useContext(StarWarsContext);

  const { characters, loading } = useContext(StarWarsContext);
  const [isLoading, setIsLoading] = useState(false);

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
        <DropDownFiltering />
        <PrevPageButton />
        <NextPageButton />
        <DropDownSorting />
      </div>
      <div className="listed-items">
        {isLoading ? (
          <div className="loading-p">Loading...</div>
        ) : (
          <Grid container spacing={3} justifyContent="center">
            {characters.map((character, index) => (
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
