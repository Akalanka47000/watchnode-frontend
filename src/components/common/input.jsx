import { twMerge } from 'tailwind-merge'

const Input = ({ placeholder, type, required, prefixIcon, value, ...props }) => {
  return (
    <div className={twMerge('relative my-2 group', props.wrapperclasses || '')}>
      {prefixIcon && (
        <div className="h-full w-10 group-hover:w-12 py-2.5 lg:py-3.5 absolute left-0 rounded-l-md border-r-1 border-black flex justify-center items-center bg-primary-base hover:bg-primary-hover cursor-pointer transition-all duration-300">
          <div className="w-5 h-5 text-white">{prefixIcon}</div>
        </div>
      )}
      <input
        {...props}
        type={type || 'text'}
        className={twMerge(
          `w-full shadow-ds2 pr-4 py-2.5 lg:py-3.5 ${
            prefixIcon ? 'pl-14 group-hover:pl-16' : 'pl-4'
          } text-sm font-semibold focus:ring-2 bg-transparent border-2 text-white border-primary-base focus:ring-primary-base focus:outline-0 rounded-md transition-all duration-300`,
          props.className,
        )}
        placeholder={placeholder}
        required={required || false}
        value={value}
      />
    </div>
  )
}

export default Input
