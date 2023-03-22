import { useContext } from "react";
import StarWarsContext from "../../context/StarWarsContext";
import Button from "./Button.styled";
import "./PrevPageButton.css";

const PrevPageButton = () => {
  const { setPageNumber, pageNumber, isTherePrevPage } =
    useContext(StarWarsContext);

  const addNextPageNumber = () => {
    setPageNumber(pageNumber - 1);
  };

  return (
    <div>
      <Button
        className="prev-button"
        type="button"
        onClick={addNextPageNumber}
        disabled={!isTherePrevPage}
      >
        Previous Page
      </Button>
    </div>
  );
};
export default PrevPageButton;
