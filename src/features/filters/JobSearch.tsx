import { useAppDispatch, useAppSelector } from "../../app/hooks";
import { setSearch } from "./filterSlice";
import { selectSearch } from "./filterSelectors";

function JobSearch() {
  const dispatch = useAppDispatch();
  const search = useAppSelector(selectSearch);

  return (
    <>
      <input
        type="search"
        value={search}
        onChange={(event) => dispatch(setSearch(event.target.value))}
        placeholder="Search company or position..."
        aria-label="Search job applications"
      />
      <button type="button" onClick={() => dispatch(setSearch(""))}>
        Clear Search
      </button>
    </>
  );
}

export default JobSearch;
