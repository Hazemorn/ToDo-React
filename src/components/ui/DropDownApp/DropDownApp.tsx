import s from "./DropDownApp.module.scss";
import type { Priority, Status } from "../../../store/types/types";
import { PRIORITY_OPTIONS, STATUS_OPTIONS } from "../../../store/constans";

interface DropDownProps<T extends Priority | Status>  {
  label: string;
  isPriotity?: boolean;
  value?: T;
  disable?: boolean;
  onChange?: (value: T) => void; 
}

const DropDownApp =<T extends Priority | Status>({ label, isPriotity = true, value, onChange, disable=false }: DropDownProps<T>) => {

  const selectHandler = (e: React.ChangeEvent<HTMLSelectElement>) => {
    onChange(e.target.value as T);
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
