import { MdOutlineMenu, MdShoppingCart, MdSearch } from "react-icons/md";
import { NavLink, useLocation } from "react-router-dom";
import "./navbar.css";

export default function Header(props) {
  const location = useLocation();
  const pathname = location.pathname;
  const pathArray = pathname.split("/");
  const currentPath = pathArray[pathArray.length - 1];

  function firstLatterUpperCase(str) {
    const lowerCase = str.toLowerCase();
    return lowerCase[0].toUpperCase() + lowerCase.slice(1);
  }

  return (
    <>
      <div
        className={`d-flex i-shadow-sm justify-content-between w-100 p-3 bg-${
          props.appTheme
        } text-${props.appTheme === "dark" ? "light" : "dark"} navbar-${
          props.appTheme
        }`}
      >
        <div>
          <span className='mx-1 my-auto' onClick={props.toggleSideBar}>
            <MdOutlineMenu />
          </span>
        </div>
        <div>
          <span>
            <MdShoppingCart />
          </span>
          <span>
            <MdSearch />
          </span>
        </div>
      </div>
      <div className='page-header d-flex justify-content-between align-items-center p-2 border-bottom'>
        <h3>
          {currentPath == "" ? "Dashboard" : firstLatterUpperCase(currentPath)}
        </h3>
        <div>
          {pathArray.map((pathname, key) => (
            <NavLink to={pathname} key={key} className='p-1'>
              {pathname == "" ? "Home" : firstLatterUpperCase(pathname)}
            </NavLink>
          ))}
          {/* <NavLink className='p-1'>Profit</NavLink> */}
        </div>
      </div>
    </>
  );
}
