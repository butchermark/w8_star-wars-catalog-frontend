import { useContext } from "react";
import StarWarsContext from "../../context/StarWarsContext";
import Button from "./Button.styled";
import "./NextPageButton.css";

const NextPageButton = () => {
  const { setPageNumber, pageNumber, isThereNextPage } =
    useContext(StarWarsContext);

  const addNextPageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  return (
    <div>
      <Button
        className="next-button"
        type="button"
        onClick={addNextPageNumber}
        disabled={!isThereNextPage}
      >
        Next Page
      </Button>
    </div>
  );
};
export default NextPageButton;
