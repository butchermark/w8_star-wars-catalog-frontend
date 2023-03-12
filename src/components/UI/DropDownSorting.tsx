import { useContext } from "react";
import StarWarsContext from "../../context/StarWarsContext";
import { DropDownSelect } from "./DropDownSelector.styled";

const DropDownSorting = () => {
  const { sortCharactersHandler } = useContext(StarWarsContext);
  const onSortingChangeHandler = (event: any) => {
    sortCharactersHandler(event.target.value);
  };

  return (
    <div
      className="drop-down-selector-div"
      style={{ display: "flex", alignItems: "center" }}
    >
      <DropDownSelect onChange={onSortingChangeHandler}>
        <option value="">Sort by</option>
        <option value="name">Name</option>
        <option value="height">Height</option>
        <option value="mass">Mass</option>
      </DropDownSelect>
    </div>
  );
};

export default DropDownSorting;
