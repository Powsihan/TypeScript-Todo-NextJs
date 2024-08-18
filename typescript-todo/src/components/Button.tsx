import React from 'react'

type ButtonProps = {
  text?: String,
  secondary?: boolean;
  onClick?: (event: React.MouseEvent<HTMLButtonElement, MouseEvent>) => void;
  loading?: boolean;
}

const Button = ({ text, secondary, onClick, loading }: ButtonProps) => {
  return (
    <div>
      <button type="button" className={!secondary ?
        "text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
        : "py-2.5 px-5 me-2 mb-2 text-sm font-medium text-blue-800 focus:outline-none bg-white rounded-lg border hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-blue-100"}
        onClick={onClick}>
        {loading ? (
          <div className="flex items-center">
            <svg
              className="animate-spin h-5 w-5 mr-2 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z"
              ></path>
            </svg>
            Loading...
          </div>
        ) : (
          text
        )}
      </button>

    </div>

  )
}

export default Button
