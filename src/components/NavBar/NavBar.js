import { navItems } from "./navItems";
import MenuItems from "./MenuItems";

const NavBar = () => {
  return (
    <nav className="navbar">
      <ul className="nav-items">
        {navItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default NavBar;
