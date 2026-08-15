import { useEffect, useState } from "react";

interface Validations {
    isEmpty?: boolean;

  }

//custom hooks
export const useValidation = (value:string, validations: Validations) => {
  const [isEmpty, setEmpty] = useState<boolean>(true);
  const [inputValid, setInputValid] = useState<boolean>(false);

  useEffect(() => {
    for (const validation in validations) {
      switch (validation) {
        case "isEmpty":
          value ? setEmpty(false) : setEmpty(true);
          break;
      }
    }
  }, [value]);

  useEffect(() => {
    if (isEmpty) {
      setInputValid(false);
    } else {
      setInputValid(true);
    }
  }, [isEmpty]);

  return {
    isEmpty,
    inputValid,
  };
};


export const useInput = (initialValue: string, validations: Validations) => {
  const [value, setValue] = useState<string>(initialValue);
  const [isDirty, setDirty] = useState<boolean>(false);
  const valid = useValidation(value, validations);
  const onChange = (e) => {
    setValue(e.target.value);
  };

  const onBlur = (e) => {
    setDirty(true);
  };

  return {
    value,
    onChange,
    onBlur,
    isDirty,
    ...valid,
  };
};


export const getErrorInput = (title ) => {
    if (!title.isDirty) return null;
    if (title.isEmpty) return "The field cannot be empty";
    return null;
  };
export const getErrorText = (description) => {
    if (!description.isDirty) return null;
    if (description.isEmpty) return "The field cannot be empty";
    return null;
  };