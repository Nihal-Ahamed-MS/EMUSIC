import React from "react";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";

export const Header = () => {
  var user = {};
  const navigate = useNavigate();
  var localStorageJson = localStorage.getItem("user");

  if (typeof localStorageJson === "string") {
    user = JSON.parse(localStorageJson);
  }

  const signOut = (e: React.MouseEvent<HTMLElement>) => {
    e.preventDefault();
    localStorage.removeItem("user");
    navigate("/signin");
  };

  return (
    <div>
      <nav className="navbar navbar-expand-lg navbar-dark">
        <div className="container">
          <a className="navbar-brand fs-4" href="#banner">
            E MUSIC
          </a>
          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#navbarNavDropdown"
            aria-controls="navbarNavDropdown"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <MdMenu color="#fff" />
          </button>
          <div
            className="collapse navbar-collapse justify-content-between "
            id="navbarNavDropdown"
          >
            <ul className="navbar-nav m-auto">
              <li className="nav-item">
                <Link
                  className="nav-link active text-white ms-lg-5 banner-btn"
                  to="/"
                >
                  <span>Home</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white ms-lg-5" to="/library">
                  <span>Library</span>
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link text-white ms-lg-5" to="/explore">
                  <span>Explore</span>
                </Link>
              </li>
            </ul>
            <div className="mt-xs-3 mt-lg-0 contact-nav-btn">
              <Link className="nav-link text-white ms-lg-5" to="/signin">
                {Object.keys(user).length === 0 ? (
                  <span className="bg-light text-dark px-4 py-2 fw-bold">
                    LOGIN
                  </span>
                ) : (
                  <span
                    onClick={signOut}
                    className="bg-light text-dark px-4 py-2 fw-bold"
                  >
                    LOG OUT
                  </span>
                )}
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};
