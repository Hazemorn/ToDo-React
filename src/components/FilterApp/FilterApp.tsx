import s from "./FilterApp.module.scss";
import SearchField from "../SearchField";
import filterImg from "../../assets/icons/filter.svg";
import DropDownApp from "../DropDownApp/DropDownApp";
import React, { useState } from "react";

const FilterApp = React.memo(() => {
    const [search, setSearch] = useState<string>('');
  return (
    <div className={`${s.filter} top-indent`}>
      <div className={s.filter__wrapper}>
        <img
          src={filterImg}
          alt="filter"
          loading="lazy"
          style={{ width: "40px" }}
        />
        <SearchField onSearch={setSearch}/>
        <DropDownApp label="Filter by status" fromCreated={false}/>
      </div>
    </div>
  );
});

export default FilterApp;
