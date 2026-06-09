import logo_01 from "@/assets/images/icons/logo-01.png";
import { useCartStore } from "@/store/useCartStore.js";
import { useState } from "react";
import { Link } from "react-router-dom";

const Header = () => {

    const cartCount = useCartStore((state) => state.cartCount());
    const [showMobileMenu, setShowMobileMenu] = useState(false);

    const toggleMobileMenu = () => {
        console.log("Toggling mobile menu");
        console.log(showMobileMenu);
        setShowMobileMenu(!showMobileMenu);
    }

    return (
        <>
            <header>
                <div className="container-menu-desktop">
                    <div className="top-bar">
                        <div className="content-topbar flex-sb-m h-full container">
                            <div className="left-top-bar">
                                Free shipping for standard order over $100
                            </div>
                        </div>
                    </div>

                    <div className="wrap-menu-desktop">
                        <nav className="limiter-menu-desktop container">

                            <Link to="/" className="logo">
                                <img src="/frontend/images/icons/logo-01.png" alt="IMG-LOGO" />
                            </Link>

                            <div className="menu-desktop">
                                <ul className="main-menu">
                                    <li className="active-menu">
                                        <Link to="/">Home</Link>
                                    </li>

                                    <li>
                                        <Link to="/shop">Shop</Link>
                                    </li>
                                </ul>
                            </div>

                            <div className="wrap-icon-header flex-w flex-r-m">
                                <Link to="/cart">
                                    <span
                                        className="icon-header-item cl2 hov-cl1 trans-04 p-l-22 p-r-11 icon-header-noti js-show-cart"
                                        data-notify={cartCount}>

                                        <i className="zmdi zmdi-shopping-cart"></i>
                                    </span>
                                </Link>
                            </div>
                        </nav>
                    </div>
                </div>

                <div className="wrap-header-mobile">
                    <div className="logo-mobile">
                        {/* <Link to="/"><img src="images/icons/logo-01.png" alt="IMG-LOGO" /></Link> */}
                    </div>

                    <div className="wrap-icon-header flex-w flex-r-m m-r-15">
                        <Link to="/cart">
                            <div className="icon-header-item cl2 hov-cl1 trans-04 p-r-11 p-l-10 icon-header-noti js-show-cart" data-notify={cartCount}>
                                <i className="zmdi zmdi-shopping-cart"></i>
                            </div>
                        </Link>
                    </div>

                    <div onClick={toggleMobileMenu} className={`btn-show-menu-mobile hamburger hamburger--squeeze ${showMobileMenu ? 'is-active' : ''}`}>
                        <span className="hamburger-box">
                            <span className="hamburger-inner"></span>
                        </span>
                    </div>
                </div>

                <div className="wrap-header-mobile">
                    <div className="logo-mobile">
                        <Link to="/"> <img src={logo_01} alt="IMG-LOGO" /></Link>
                    </div>

                </div>


                <div className="menu-mobile" style={{ display: showMobileMenu ? 'block' : 'none' }}>
                    <ul className="main-menu-m">
                        <li>
                            <Link to="/">Home</Link>
                        </li>

                        <li>
                            <Link to="/shop">Shop</Link>
                        </li>
                    </ul>
                </div>

                <div className="modal-search-header flex-c-m trans-04 js-hide-modal-search">
                    <div className="container-search-header">
                        <button className="flex-c-m btn-hide-modal-search trans-04 js-hide-modal-search">
                            <img src="images/icons/icon-close2.png" alt="CLOSE" />
                        </button>
                    </div>
                </div>
            </header>
        </>
    )
}
export default Header
