import MenuItems from "./MenuItems";

const Dropdown = ({ submens, dropdown, depthLevel}) => {
    depthLevel = depthLevel + 1;
    const dropdownClass = depthLevel > 1 ? 'dropdown-submenu': '';
    return (
        <ul className={`dropdown ${dropdownClass} ${dropdown ? 'show': ''}`}>
            {submens.map((submenu, index) => (
                <MenuItems items= {submens} key={index} depthLevel={depthLevel} />
            ))}

        </ul>
    )

}

export default Dropdown;