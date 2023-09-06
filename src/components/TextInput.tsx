import { ReactNode } from "react";

type TextInputProps = {
  children?: ReactNode;
  placeholder: string;
  name: string;
  value: string;
  onChangeFn: React.ChangeEventHandler<HTMLInputElement>;
};

export default function TextInput({
  children,
  placeholder,
  name,
  value,
  onChangeFn,
}: TextInputProps) {
  return (
    <input
      name={name}
      value={value}
      onChange={onChangeFn}
      className={`text-sm my-2 w-full border-b border-slate-100/50 py-2 bg-transparent`}
      placeholder={placeholder}
      type="text"
    />
  );
}
