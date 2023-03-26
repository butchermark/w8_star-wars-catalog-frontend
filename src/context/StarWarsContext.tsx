import { createContext, useEffect, useState } from "react";
import { IContextData } from "../interface/IContextData.interface";

const StarWarsContext = createContext({} as IContextData);

export const StarWarsProvider = ({ children }: any) => {
  const [accessToken, setAccesstoken] = useState(
    localStorage.getItem("accessToken")
  );
  const [isAccessToken, setIsAccessToken] = useState(false);
  const [isThereNextPage, setIsThereNextPage] = useState("");
  const [isTherePrevPage, setIsTherePrevPage] = useState("");
  const [pageNumber, setPageNumber] = useState(1);
  const [loading, setLoading] = useState(false);
  const [siteSwitch, setSiteSwitch] = useState(false);

  useEffect(() => {
    setIsAccessToken(true);
    if (accessToken) {
      setIsAccessToken(true);
    } else {
      setIsAccessToken(false);
    }
  }, []);

  return (
    <StarWarsContext.Provider
      value={{
        setAccesstoken,
        accessToken,
        isAccessToken,
        setIsAccessToken,
        isThereNextPage,
        isTherePrevPage,
        pageNumber,
        setPageNumber,
        setLoading,
        setSiteSwitch,
        loading,
        siteSwitch,
        setIsThereNextPage,
        setIsTherePrevPage,
      }}
    >
      {children}
    </StarWarsContext.Provider>
  );
};

export default StarWarsContext;
