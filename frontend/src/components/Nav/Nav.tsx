import { Link, useLocation } from "react-router-dom";

function Nav() {
  const { pathname } = useLocation();

  return (
    <div
      data-testid="nav"
      className="flex-col flex-shrink-0 items-center space-y-4 w-16 p-2 h-screen bg-black shadow-2xl"
    >
      <Link
        data-testid="search-link"
        to="/search"
        className={`p-2 rounded-md block text-white ${
          pathname.includes("/search")
            ? "bg-purple-400"
            : "hover:text-purple-400"
        }`}
      >
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
      </Link>

      <Link
        data-testid="home-link"
        to="/home"
        className={`p-2 rounded-md block text-white ${
          pathname.includes("/home") ? "bg-purple-400" : "hover:text-purple-400"
        }`}
      >
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
      </Link>

      <Link
        data-testid="responses-link"
        to="/responses"
        className={`p-2 rounded-md block text-white ${
          pathname.includes("/responses")
            ? "bg-purple-400"
            : "hover:text-purple-400"
        }`}
      >
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
      </Link>

      <Link
        data-testid="forms-link"
        to="/forms"
        className={`p-2 rounded-md block text-white ${
          pathname.includes("/forms")
            ? "bg-purple-400"
            : "hover:text-purple-400"
        }`}
      >
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
      </Link>
    </div>
  );
}

export default Nav;
