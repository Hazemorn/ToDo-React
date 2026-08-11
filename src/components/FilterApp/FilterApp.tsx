import s from "./FilterApp.module.scss";
import SearchField from "../ui/SearchField";
import filterImg from "../../assets/icons/filter.svg";
import DropDownApp from "../ui/DropDownApp/DropDownApp";
import React from "react";
import useTaskStore from "../../store/store";

const FilterApp = React.memo(() => {
  const setSearchQuery = useTaskStore((state) => state.setSearchQuery);
  const statusFilter = useTaskStore((state) => state.statusFilter);
  const setStatusFilter = useTaskStore((state) => state.setStatusFilter);
  return (
    <div className={`${s.filter} top-indent`}>
      <div className={s.filter__wrapper}>
        <img
          src={filterImg}
          alt="filter"
          loading="lazy"
          style={{ width: "40px" }}
        />
        <SearchField onSearch={setSearchQuery} />
        <DropDownApp
          label="Filter by status"
          fromCreated={false}
          value={statusFilter}
          onChange={setStatusFilter}
        />
      </div>
    </div>
  );
});

export default FilterApp;
