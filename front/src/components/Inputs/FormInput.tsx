interface IFormInput {
    type: string;
    name: string;
    label: string;
    inputValue: string;
    handleChange: Function;
    errorMessage: string;
    autoComplete?: string;
}

export default function FormInput({
    type,
    name,
    label,
    inputValue,
    handleChange,
    errorMessage,
    autoComplete,
}: IFormInput) {
    return (
        <>
            <label
                htmlFor={name}
                className="font-bold mt-1 dark:text-gray-900 after:text-red-800 dark:after:text-gray-300 after:content-['*'] after:ml-0.5"
            >
                {label}
            </label>
            <input
                type={type}
                autoComplete={autoComplete ? autoComplete : "on"}
                name={name}
                className="mx-2 p-2 border border-blue-900 dark:border-gray-800 rounded focus:bg-blue-100/80 outline-none shadow-inner"
                onChange={handleChange(event)}
                value={inputValue}
                required
            />
            {errorMessage && (
                <p className="mx-4 h-4 font-bold text-red-700 dark:text-gray-300">
                    {errorMessage}
                </p>
            )}
        </>
    );
}
