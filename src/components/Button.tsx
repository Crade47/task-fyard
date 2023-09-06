import React from 'react'

type ButtonProps ={
    children: React.ReactNode,
    size?:string
}

export default function Button({children, size="text-xl"}:ButtonProps) {
  return (
    <button className={`${size} no-highlight active:opacity-20`}>{children}</button>
  )
}