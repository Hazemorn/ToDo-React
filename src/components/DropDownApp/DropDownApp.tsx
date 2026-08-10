import { useState } from "react";
import s from "./DropDownApp.module.scss";
import type { Priority } from "../../store/types/types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../store/constans";

interface DropDownProps {
  label: string;
  onSelect?: (value: Priority) => void;
  fromCreated: boolean;
}

const DropDownApp: React.FC<DropDownProps> = ({ label, onSelect,fromCreated }) => {
  const [priority, setPriority] = useState<Priority | ''>(''); 


  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value as Priority;
    
    setPriority(value);
  
    if (onSelect) {
      onSelect(value);
    }
  };

  return (
    <div className={`${s.priority__container} border`}>
      <select
        name="priority--add"
        id="priority--add"
        value={priority} 
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
