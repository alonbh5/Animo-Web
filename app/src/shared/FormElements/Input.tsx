import React from 'react'

type InputProps = {
  type: string;
  name?: string;
  label?: string
  required?: boolean;
  className?: string;
  placeholder?: string;
  value: string;
  disabled?: boolean;
  errorMessage?: string;
  onChange: (event: any) => void;

}

const Input = (props: InputProps) => {
  const { label, disabled, required, type, name, className, placeholder, value, errorMessage, onChange } = props;
  return (
    <>
      {label && <label className={required? "required":""}>{label}</label>}
      <input disabled={disabled} type={type} name={name} className={className} placeholder={placeholder} value={value} onChange={onChange} />
      <div className="error-msg">{errorMessage}</div>
    </>
  );
}
export default Input;
