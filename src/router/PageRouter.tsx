import { useContext, useEffect } from "react";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import CharacterDetailedPage from "../components/pages/DetailPage";
import ListPage from "../components/pages/ListPage";
import LoginPage from "../components/pages/LoginPage";
import StarWarsContext from "../context/StarWarsContext";

const PageRouter = () => {
  const { isAccessToken, setIsAccessToken, accessToken } =
    useContext(StarWarsContext);
  const getAccessToken = localStorage.getItem("accessToken");
  ///ITT MI TÖRTÉNIK???

  return (
    <BrowserRouter>
      {getAccessToken ? (
        <Routes>
          <Route path="/listed" element={<ListPage />} />
          <Route path="/listed/*" element={<Navigate to="/listed" />} />
          <Route
            path="/listed/:characterid"
            element={<CharacterDetailedPage />}
          />
          <Route
            path="/listed/:characterid/*"
            element={<CharacterDetailedPage />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      ) : (
        <Routes>
          <Route path="/listed" element={<Navigate to="/login" />} />
          <Route path="/listed/*" element={<Navigate to="/login" />} />
          <Route
            path="/listed/:characterid"
            element={<Navigate to="/login" />}
          />
          <Route
            path="/listed/:characterid/*"
            element={<Navigate to="/login" />}
          />
          <Route path="/" element={<Navigate to="/login" />} />
          <Route path="*" element={<Navigate to="/login" />} />
          <Route path="/login" element={<LoginPage />} />
        </Routes>
      )}
    </BrowserRouter>
  );
};
export default PageRouter;
