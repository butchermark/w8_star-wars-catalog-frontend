import { useContext, useEffect, useState } from "react";
import StarWarsContext from "../../context/StarWarsContext";
import Button from "./Button.styled";
import "./NextPageButton.css";

const NextPageButton = () => {
  const { setPageNumber, pageNumber, isThereNextPage, loading } =
    useContext(StarWarsContext);
  const [disable, setDisable] = useState(true);

  const addNextPageNumber = () => {
    setPageNumber(pageNumber + 1);
  };

  useEffect(() => {
    if (loading) {
      setDisable(true);
    } else {
      setDisable(false);
    }
    if (isThereNextPage) {
      setDisable(false);
    } else {
      setDisable(true);
    }
  }, [loading]);

  return (
    <div>
      <Button
        className="next-button"
        type="button"
        onClick={addNextPageNumber}
        disabled={disable}
      >
        Next Page
      </Button>
    </div>
  );
};
export default NextPageButton;
