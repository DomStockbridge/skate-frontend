import Logo from "../imgs/Logo.webp"
import React from "react"

export default function Header() {

    const [isMenuVisable, setIsMenuVisable] = React.useState(false)

    return (
        <header>
            <div className="logo-container">
                <img id="logo" src={Logo} alt="Skater Logo" />
            </div>
            <h1>Skate</h1>
            <div
                id="dropdown"
                onMouseLeave={() => setIsMenuVisable(false)}
            >
                <button
                    id="menu-btn"
                    onMouseEnter={() => setIsMenuVisable(true)}
                >Menu</button>
                <ul
                    className={isMenuVisable ? "show-menu" : ""}
                    onMouseEnter={() => setIsMenuVisable(true)}
                    onMouseLeave={() => setIsMenuVisable(false)}
                >
                    <li>Reset</li>
                </ul>
            </div>
        </header>
    )
}