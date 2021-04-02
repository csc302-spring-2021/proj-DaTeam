import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({
    to = "/",
    isActive = false,
    icon,
    ...props
}: {
    to?: string;
    isActive?: boolean;
    icon?: React.ReactElement;
}) {
    return (
        <Link
            to={to}
            className={`p-2 rounded-md block text-white ${isActive ? "bg-purple-400" : "hover:text-purple-400"
                }`}
            {...props}
        >
            {icon}
        </Link>
    );
}

const SearchIcon = (
    <svg
        data-testid="menu-btn-search"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
        />
    </svg>
);

const HomeIcon = (
    <svg
        data-testid="menu-btn-home"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
        />
    </svg>
);

const PatientsIcon = (
    <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z"
        />
    </svg>
);

const ResponsesIcon = (
    <svg
        data-testid="menu-btn-responses"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M7 8h10M7 12h4m1 8l-4-4H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-3l-4 4z"
        />
    </svg>
);

const FormsIcon = (
    <svg
        data-testid="menu-btn-forms"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
    >
        <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01"
        />
    </svg>
);

function Nav() {
    const { pathname } = useLocation();

    return (
        <div
            data-testid="nav"
            className="flex-col flex-shrink-0 items-center space-y-4 w-16 p-2 h-screen bg-black shadow-2xl"
        >
            <NavLink
                data-testid="search-link"
                to="/search"
                isActive={pathname.includes("/search")}
                icon={SearchIcon}
            />
            <NavLink
                data-testid="home-link"
                to="/home"
                isActive={pathname.includes("/home")}
                icon={HomeIcon}
            />
            <NavLink
                data-testid="patients-link"
                to="/patients"
                isActive={pathname.includes("/patients")}
                icon={PatientsIcon}
            />
            <NavLink
                data-testid="responses-link"
                to="/responses"
                isActive={pathname.includes("/responses")}
                icon={ResponsesIcon}
            />
            <NavLink
                data-testid="forms-link"
                to="/forms"
                isActive={pathname.includes("/forms")}
                icon={FormsIcon}
            />
        </div>
    );
}

export default Nav;
