/* eslint-disable react/prop-types */
export default function Card({ customClasses, disableHover, children }) {
    return (
        <div
            className={`bg-bg border border-hover dark:border dark:border-hover-dark dark:bg-bg-dark text-text dark:text-text-dark md:dark:border-hover-dark rounded-md shadow dark:shadow w-full md:max-w-3xl overflow-hidden 
            ${
                !disableHover
                    ? "md:hover:bg-hover md:dark:hover:bg-hover-dark"
                    : ""
            }
            ${customClasses}`}
        >
            {children}
        </div>
    );
}
