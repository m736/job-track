import { createSlice, type PayloadAction } from "@reduxjs/toolkit";
import type { FilterState, JobSortOrder, JobStatusFilter } from "./filterTypes";


const initialState: FilterState = {
  status: "All",
  search: '',
  sortOrder:"newest"
};
const filterSlice = createSlice({
  name: "filter",
  initialState,
  reducers: {
    setStatusFilter: (state, action: PayloadAction<JobStatusFilter>) => {
      state.status = action.payload;
    },
      setSearch: (state, action: PayloadAction<string>) => {
      state.search = action.payload
    },setSortorder:(state,action:PayloadAction<JobSortOrder>)=>{
state.sortOrder = action.payload
    }
  },
});
export const{setStatusFilter,setSearch,setSortorder}=filterSlice.actions
export default filterSlice.reducer