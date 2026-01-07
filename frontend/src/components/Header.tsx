import Logo from "../imgs/Logo.webp"
import React from "react"

export default function Header({ showDeletedTricks }: { showDeletedTricks: () => void }) {

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
                    <li><button className="dropdown-btn">Reset</button></li>
                    <li><button className="dropdown-btn" onClick={showDeletedTricks}>See Deleted Tricks</button></li>
                    <li><button className="dropdown-btn">Help</button></li>
                </ul>
            </div>
        </header>
    )
}