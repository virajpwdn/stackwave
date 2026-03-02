const sizeVarient = {
  sm: "max-w-3xl",
  md: "max-w-5xl",
  lg: "max-w-7xl",
  full: "max-w-full",
};

const Container = ({ children, size = "lg", className = "" }) => {
  return (
    <div
      className={`mx-auto ${sizeVarient[size]} px-4 sm:px-6 lg:px-8 bg-sky-500 ${className}`}
    >
      {children}
    </div>
  );
};
export default Container;
