
const Error = ({errorMessage}) => {
    return (
      <div className="flex items-center justify-center w-full h-full"><h3 className="text-slate-900 text-[20px] loading-[30px] font-semibold">
          {errorMessage}
          </h3></div>
    )
  }
  
  export default Error