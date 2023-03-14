import { DropDownSelect } from "./DropDownSelector.styled";

const DropDownFiltering = ({ setFilterValue }: any) => {
  const onFilterChangeHandler = (event: any) => {
    setFilterValue(event.target.value);
  };

  return (
    <div
      className="drop-down-selector-div"
      style={{ display: "flex", alignItems: "center" }}
    >
      <DropDownSelect onChange={onFilterChangeHandler}>
        <option value="">Filter by</option>
        <option value="male">Male</option>
        <option value="female">Female</option>
      </DropDownSelect>
    </div>
  );
};

export default DropDownFiltering;
