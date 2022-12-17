const IconButton = ({ children, className }) => {
  return (
    <button
      className={
        "rounded-full p-2 flex items-center justify-center " + className
      }
    >
      {children}
    </button>
  );
};

export default IconButton;
