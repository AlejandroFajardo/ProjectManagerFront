import MenuItems from "./MenuItems";
import { navItems } from "./navItems";
const Navbar = () => {
  return (
    <nav className="navbar">
      <ul className="menus">
        {navItems.map((menu, index) => {
          const depthLevel = 0;
          return <MenuItems items={menu} key={index} depthLevel={depthLevel} />;
        })}
      </ul>
    </nav>
  );
};

export default Navbar;
