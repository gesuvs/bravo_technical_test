import { HTMLAttributes, ReactNode } from "react"

type ButtonProps = {
  children: ReactNode,
} & HTMLAttributes<HTMLButtonElement>


export const Button = ({ children, onClick }: ButtonProps) => {
  return (
    <button className="ml-2 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      onClick={onClick}
    >
      {children}
    </button>
  )
}