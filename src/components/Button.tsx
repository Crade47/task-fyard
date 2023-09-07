import React from 'react'

type ButtonProps ={
    children: React.ReactNode,
    size?:string;
    onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined
}

export default function Button({children, onClick,size="text-xl"}:ButtonProps) {
  return (
    <button onClick={onClick} className={`${size} no-highlight active:opacity-20`}>{children}</button>
  )
}