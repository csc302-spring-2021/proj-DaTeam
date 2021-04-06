import React from "react";
import { Link, useLocation } from "react-router-dom";

function NavLink({
  to = "/",
  isActive = false,
  icon,
  tooltip = "",
  ...props
}: {
  to?: string;
  isActive?: boolean;
  icon?: React.ReactElement;
  tooltip?: string;
}) {
  return (
    <Link
      to={to}
      title={tooltip}
      className={`p-2 rounded-md block text-white ${
        isActive ? "bg-purple-400" : "hover:text-purple-400"
      }`}
      {...props}
    >
      {icon}
    </Link>
  );
}
const HomeIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M10.707 2.293a1 1 0 00-1.414 0l-7 7a1 1 0 001.414 1.414L4 10.414V17a1 1 0 001 1h2a1 1 0 001-1v-2a1 1 0 011-1h2a1 1 0 011 1v2a1 1 0 001 1h2a1 1 0 001-1v-6.586l.293.293a1 1 0 001.414-1.414l-7-7z" />
  </svg>
);

const PatientsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
  </svg>
);

const ProceduresIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M7 2a1 1 0 00-.707 1.707L7 4.414v3.758a1 1 0 01-.293.707l-4 4C.817 14.769 2.156 18 4.828 18h10.343c2.673 0 4.012-3.231 2.122-5.121l-4-4A1 1 0 0113 8.172V4.414l.707-.707A1 1 0 0013 2H7zm2 6.172V4h2v4.172a3 3 0 00.879 2.12l1.027 1.028a4 4 0 00-2.171.102l-.47.156a4 4 0 01-2.53 0l-.563-.187a1.993 1.993 0 00-.114-.035l1.063-1.063A3 3 0 009 8.172z"
      clipRule="evenodd"
    />
  </svg>
);

const ResponsesIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path
      fillRule="evenodd"
      d="M18 13V5a2 2 0 00-2-2H4a2 2 0 00-2 2v8a2 2 0 002 2h3l3 3 3-3h3a2 2 0 002-2zM5 7a1 1 0 011-1h8a1 1 0 110 2H6a1 1 0 01-1-1zm1 3a1 1 0 100 2h3a1 1 0 100-2H6z"
      clipRule="evenodd"
    />
  </svg>
);

const FormsIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 20 20"
    fill="currentColor"
  >
    <path d="M9 2a1 1 0 000 2h2a1 1 0 100-2H9z" />
    <path
      fillRule="evenodd"
      d="M4 5a2 2 0 012-2 3 3 0 003 3h2a3 3 0 003-3 2 2 0 012 2v11a2 2 0 01-2 2H6a2 2 0 01-2-2V5zm3 4a1 1 0 000 2h.01a1 1 0 100-2H7zm3 0a1 1 0 000 2h3a1 1 0 100-2h-3zm-3 4a1 1 0 100 2h.01a1 1 0 100-2H7zm3 0a1 1 0 100 2h3a1 1 0 100-2h-3z"
      clipRule="evenodd"
    />
  </svg>
);

function Nav() {
  const { pathname } = useLocation();
  if (pathname.includes("/responses/view/")) {
    return <></>;
  }

  return (
    <div
      data-testid="nav"
      className="flex-col items-center flex-shrink-0 w-16 h-screen p-2 space-y-4 bg-black shadow-2xl"
    >
      <NavLink
        data-testid="home-link"
        to="/home"
        isActive={pathname.includes("/home")}
        icon={HomeIcon}
        tooltip="Home"
      />
      <NavLink
        data-testid="patients-link"
        to="/patients"
        isActive={pathname.includes("/patients")}
        icon={PatientsIcon}
        tooltip="Patients"
      />
      <NavLink
        data-testid="procedures-link"
        to="/procedures"
        isActive={pathname.includes("/procedures")}
        icon={ProceduresIcon}
        tooltip="Procedures"
      />
      <NavLink
        data-testid="responses-link"
        to="/responses"
        isActive={pathname.includes("/responses")}
        icon={ResponsesIcon}
        tooltip="Responses"
      />
      <NavLink
        data-testid="forms-link"
        to="/forms"
        isActive={pathname.includes("/forms")}
        icon={FormsIcon}
        tooltip="Forms"
      />
    </div>
  );
}

export default Nav;
