const variants = {
  primary: "bg-blue-600 text-white hover:bg-blue-700 border-transparent",
  secondary: "bg-white text-gray-800 border-gray-300 hover:bg-gray-50",
  ghost: "bg-transparent text-gray-700 border-transparent hover:bg-gray-100",
  danger: "bg-red-600 text-white hover:bg-red-700 border-transparent",
  link: "bg-transparent text-blue-600 underline border-transparent hover:text-blue-800 p-0",
};

const sizes = {
  sm: "text-sm px-3 py-1.5 gap-1.5",
  md: "text-sm px-4 py-2   gap-2",
  lg: "text-base px-5 py-2.5 gap-2.5",
};

const Button = ({
  className,
  text,
  onClick,
  label,
  children,
  variant = "primary",
  size = "md",
  fullWidth = false,
  leftIcon,
  rightIcon,
  ariaLabel,
  ariaDescribedBy,
  type = "button", // "button" | "submit" | "reset"
  disabled = false,
  loading = false,
  ...props
}) => {
  const isDisabled = disabled || loading;

  return (
    <button
      onClick={onClick}
      type={type}
      aria-label={ariaLabel}
      disabled={isDisabled}
      className={[
        // Base styles
        "inline-flex items-center justify-center font-medium",
        "rounded-md border transition-colors duration-150",
        "focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-500",
        // Variant + size
        variants[variant],
        sizes[size],
        // Modifiers
        fullWidth ? "w-full" : "",
        isDisabled
          ? "pointer-events-none cursor-not-allowed opacity-50"
          : "cursor-pointer",
        className,
      ].join(" ")}
      {...props}
    >
      {loading ? <Loader2 className="animate-spin" size={16} /> : leftIcon}
      {children}
      {!loading && rightIcon}
    </button>
  );
};

export default Button;
