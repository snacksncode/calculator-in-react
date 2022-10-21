export const formatValue = (value: string) => {
  switch (value) {
    case "*":
      return "×";
    case "/":
      return "÷";
    case "DEL":
      return (
        <svg className="w-[1em] fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512">
          <path d="M576 128c0-35.3-28.7-64-64-64H205.3c-17 0-33.3 6.7-45.3 18.7L9.4 233.4c-6 6-9.4 14.1-9.4 22.6s3.4 16.6 9.4 22.6L160 429.3c12 12 28.3 18.7 45.3 18.7H512c35.3 0 64-28.7 64-64V128zM271 175c9.4-9.4 24.6-9.4 33.9 0l47 47 47-47c9.4-9.4 24.6-9.4 33.9 0s9.4 24.6 0 33.9l-47 47 47 47c9.4 9.4 9.4 24.6 0 33.9s-24.6 9.4-33.9 0l-47-47-47 47c-9.4 9.4-24.6 9.4-33.9 0s-9.4-24.6 0-33.9l47-47-47-47c-9.4-9.4-9.4-24.6 0-33.9z" />
        </svg>
      );
    default:
      return value;
  }
};

export const buttonClasses =
  "p-3 text-2xl transition-colors duration-150 focus-visible:bg-blue-300 focus-visible:text-white focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-dashed focus-visible:outline-blue-300 hover:bg-blue-300 hover:text-white overflow-hidden font-medium max-w-full overflow-ellipsis flex items-center justify-center rounded";
