import { MdOutlineMenu, MdShoppingCart, MdSearch } from "react-icons/md";
import { NavLink } from "react-router-dom";
import "./navbar.css";

export default function Header(props) {
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
      <div className='page-header d-flex justify-content-between align-items-center p-2'>
        <h3>Api details</h3>
        <div>
          <NavLink className='p-1'>Home</NavLink>
          <NavLink className='p-1'>Dashboard</NavLink>
          <NavLink className='p-1'>Profit</NavLink>
        </div>
      </div>
    </>
  );
}
