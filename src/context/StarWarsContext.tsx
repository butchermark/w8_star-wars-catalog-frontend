import axios from "axios";
import { createContext, useEffect, useState } from "react";
import { ICharactersData } from "../interface/ICharactersData.interface";
import { IContextData } from "../interface/IContextData.interface";

const StarWarsContext = createContext({} as IContextData);

export const StarWarsProvider = ({ children }: any) => {
  const [characters, setCharacters] = useState<ICharactersData[]>([]);
  const [isThereNextPage, setIsThereNextPage] = useState("");
  const [isTherePrevPage, setIsTherePrevPage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [siteSwitch, setSiteSwitch] = useState(false);
  const [accessToken, setAccesstoken] = useState(undefined);
  const [isAccessToken, setIsAccessToken] = useState(false);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("male");
  const [sortValue, setSortValue] = useState("name");
  const [isFilter, setIsFilter] = useState(false);
  const [isSort, setIsSort] = useState(false);
  const [searchedCountries, setSearchedCountries] = useState<ICharactersData[]>(
    []
  );
  const [filteredCountries, setFilteredountries] = useState<ICharactersData[]>(
    []
  );

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

  useEffect(() => {
    setIsAccessToken(true);
    if (accessToken) {
      setIsAccessToken(true);
    } else {
      setIsAccessToken(false);
    }
  }, []);

  const sortArray = (array: ICharactersData[]) => {
    if (sortValue === "name") {
      return array.sort((a: ICharactersData, b: ICharactersData) => {
        return a.name.toLowerCase() > b.name.toLowerCase() ? 1 : -1;
      });
    }
    if (sortValue === "height") {
      return array.sort((a: ICharactersData, b: ICharactersData) => {
        return b.height - a.height;
      });
    }
    if (sortValue === "mass") {
      return array.sort((a: ICharactersData, b: ICharactersData) => {
        return b.mass - a.mass;
      });
    }
  };

  const filterArray = (array: ICharactersData[]) => {
    if (filterValue === "male") {
      return array.filter((character: ICharactersData) => {
        return character.gender === "male";
      });
    }
    if (filterValue === "female") {
      return array.filter((character: ICharactersData) => {
        return character.gender === "female";
      });
    }
  };

  useEffect(() => {
    sortArray(characters);
  }, [sortValue]);

  const sortCharactersHandler = (value: any) => {
    setIsSort(true);
    setSortValue(value);
  };

  useEffect(() => {
    filterArray(characters);
  }, [filterValue]);

  const filterCharactersHandler = (value: any) => {
    setIsFilter(true);
    setFilterValue(value);
  };

  return (
    <StarWarsContext.Provider
      value={{
        characters,
        setCharacters,
        setAccesstoken,
        accessToken,
        setPageNumber,
        setSiteSwitch,
        pageNumber,
        isThereNextPage,
        isTherePrevPage,
        isAccessToken,
        setIsAccessToken,
        loading,
        setLoading,
        filterCharactersHandler,
        sortCharactersHandler,
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};

export default StarWarsContext;
