import { ReactNode } from "react";

type TextInputProps = {
  children?: ReactNode;
  placeholder: string;
  name: string;
  value: string|undefined;
  onChangeFn: React.ChangeEventHandler<HTMLInputElement>;
  maxLength?:number
};

export default function TextInput({
  children,
  placeholder,
  name,
  value,
  onChangeFn,
  maxLength = undefined
}: TextInputProps) {
  return (
    <input
      maxLength={maxLength}
      name={name}
      value={value}
      onChange={onChangeFn}
      className={`outline-none text-sm my-2 w-full border-b border-slate-100/50 py-2 bg-transparent`}
      placeholder={placeholder}
      type="text"
    />
  );
}
