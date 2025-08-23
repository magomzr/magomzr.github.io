import { headerNavLinks } from "../utils";
import { siteData } from "../config";
import { Link } from "react-router-dom";
import SearchButton from "./SearchButton";
import MobileNav from "./MobileNav";
import Logo from "./Logo";

const Header = () => {
  return (
    <header className="flex items-center justify-between py-3 fixed inset-x-0 top-0 z-40 bg-gray/80 shadow-sm saturate-100 backdrop-blur-[10px]">
      <div>
        <Link to="/" aria-label={siteData.headerTitle}>
          <div className="flex items-center justify-between">
            <div className="mr-3">
              <Logo />
            </div>
            {typeof siteData.headerTitle === "string" ? (
              <div className="hidden text-2xl font-semibold sm:block">
                {siteData.headerTitle}
              </div>
            ) : (
              siteData.headerTitle
            )}
            <span className="bg-purple-100 text-purple-800 text-xs font-medium mx-2 mt-1 px-2.5 py-0.5 rounded-full dark:bg-purple-900 dark:text-purple-300">
              Open to work
            </span>
          </div>
        </Link>
      </div>
      <div className="flex items-center leading-5 space-x-4 sm:space-x-6 mr-6">
        {headerNavLinks
          .filter((link) => link.href !== "/")
          .map((link) => (
            <Link
              key={link.title}
              to={link.href}
              className="hidden sm:block font-medium text-gray-900 dark:text-gray-100"
            >
              {link.title}
            </Link>
          ))}
        <SearchButton />
        <MobileNav />
      </div>
    </header>
  );
};

export default Header;
