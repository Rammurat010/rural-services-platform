// // src/components/Navbar.jsx
// import React from "react";
// import { Link } from "react-router-dom";

// const Navbar = () => {
//   return (
//     <nav className="navbar">
//       <div className="container">
//         <div className="logo">
//           <Link to="/">RuralServices</Link>
//         </div>
//         <ul className="nav-links">
//           <li>
//             <Link to="/">Home</Link>
//           </li>
//           <li>
//             <Link to="/services">Services</Link>
//           </li>
//           <li>
//             <Link to="/products">Products</Link>
//           </li>
//           <li>
//             <Link to="/contact">Contact</Link>
//           </li>
//           <li>
//             <Link to="/login">Login</Link>
//           </li>
//           <li>
//             <Link to="/register">Register</Link>
//           </li>
//         </ul>
//       </div>
//     </nav>
//   );
// };

// export default Navbar;

/////////////////////////////////////////////////////////

// src/components/Navbar.jsx
import React from "react";
import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { user, logout } = useAuth();
  const location = useLocation();

  const handleLogout = () => {
    logout();
  };

  return (
    <nav className="navbar">
      <div className="container">
        <div className="logo">
          <Link to="/">RuralServices</Link>
        </div>
        <ul className="nav-links">
          <li>
            <Link to="/" className={location.pathname === "/" ? "active" : ""}>
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/services"
              className={location.pathname === "/services" ? "active" : ""}
            >
              Services
            </Link>
          </li>
          <li>
            <Link
              to="/products"
              className={location.pathname === "/products" ? "active" : ""}
            >
              Products
            </Link>
          </li>
          <li>
            <Link
              to="/contact"
              className={location.pathname === "/contact" ? "active" : ""}
            >
              Contact
            </Link>
          </li>
          {user ? (
            <>
              <li>
                <Link
                  to="/dashboard"
                  className={location.pathname === "/dashboard" ? "active" : ""}
                >
                  Dashboard
                </Link>
              </li>
              <li>
                <button onClick={handleLogout} className="logout-btn">
                  Logout
                </button>
              </li>
            </>
          ) : (
            <>
              <li>
                <Link
                  to="/login"
                  className={location.pathname === "/login" ? "active" : ""}
                >
                  Login
                </Link>
              </li>
              <li>
                <Link
                  to="/register"
                  className={location.pathname === "/register" ? "active" : ""}
                >
                  Register
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
