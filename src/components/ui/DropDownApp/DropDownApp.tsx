//import { useState } from "react";
import s from "./DropDownApp.module.scss";
import type { Priority, Status } from "../../../store/types/types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../store/constans";

interface DropDownProps {
  label: string;
  onSelect?: (value: Priority) => void;
  fromCreated: boolean;
  value?: Priority | Status; 
  onChange?: (value: any) => void; 
}

const DropDownApp: React.FC<DropDownProps> = ({ label, onSelect, fromCreated, value, onChange }) => {
  //const [priority, setPriority] = useState<Priority>('none'); 


  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange?.(e.target.value);
  };

  return (
    <div className={`${s.priority__container} border`}>
      <select
        className="pointer"
        name={fromCreated ? "priority--add" : "status--filter"}
        id={fromCreated ? "priority--add" : "status--filter"}
        value={value} 
        onChange={selectHandler}
      >
        <option value="" disabled>
            {label}
        </option>
        {fromCreated ?
        PRIORITY_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
        :
        STATUS_OPTIONS.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))
      }
      </select>
    </div>
  );
};

export default DropDownApp;
