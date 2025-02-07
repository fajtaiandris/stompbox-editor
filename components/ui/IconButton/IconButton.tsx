type IconButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement>

export const IconButton: React.FC<IconButtonProps> = ({ children, ...props }) => {
  return (
    <button
      type="button"
      className="flex h-[25px] w-[25px] cursor-pointer items-center justify-center rounded-[3px] bg-[lightgray] text-black transition-colors hover:bg-[lightblue]"
      {...props}
    >
      {children}
    </button>
  )
}
