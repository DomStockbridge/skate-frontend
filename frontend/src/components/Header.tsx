import Logo from "../imgs/Logo.webp"
import React from "react"

export default function Header() {

    const [isDropdownVisable, setIsDropdownVisable] = React.useState(false)

    return (
        <header>
            <div className="logo-container">
                <img id="logo" src={Logo} alt="Skater Logo" />
            </div>
            <h1>Skate</h1>
            <div
                id="dropdown"
                onMouseLeave={() => setIsDropdownVisable(false)}
                onMouseEnter={() => setIsDropdownVisable(true)}
            >
                <button id="menu-btn">Menu</button>
                <ul
                    className={isDropdownVisable ? "show-menu" : ""}
                    onMouseEnter={() => setIsDropdownVisable(true)}
                    onMouseLeave={() => setIsDropdownVisable(false)}
                >
                    <li>Reset</li>
                    <li>See Deleted Tricks</li>
                    <li>Help</li>
                </ul>
            </div>
        </header>
    )
}