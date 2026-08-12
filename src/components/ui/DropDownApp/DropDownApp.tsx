import s from "./DropDownApp.module.scss";
import type { Priority, Status } from "../../../store/types/types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../store/constans";

interface DropDownProps {
  label: string;
  isPriotity?: boolean;
  value?: Priority | Status; 
  disable?: boolean;
  onChange?: (value: any) => void; 
}

const DropDownApp: React.FC<DropDownProps> = ({ label, isPriotity = true, value, onChange, disable=false }) => {

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value);
  };
  const currentOptions = isPriotity ? PRIORITY_OPTIONS : STATUS_OPTIONS;
  const selectedOption = currentOptions.find((opt) => opt.value === value);
  const currentBackgroundColor = selectedOption?.color;

  return (
    <div className={`${s.priority__container} border`} style={{ backgroundColor: currentBackgroundColor }}>
       {label}:
      <select
        className="pointer"
        value={value}
        onChange={selectHandler}
        disabled={disable}
      > 
       {currentOptions.map((option) => (
          <option 
            key={option.value} 
            value={option.value}
             >
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DropDownApp;
