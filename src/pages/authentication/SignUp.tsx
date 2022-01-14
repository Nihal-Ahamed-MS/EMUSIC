import React, { useState } from "react";
import { Link } from "react-router-dom";
import { auth } from "../../config/firebaseConfig";
import { useNavigate } from "react-router-dom";

export const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const navigate = useNavigate();

  const handleSignUpSubmit = (event: React.MouseEvent<HTMLElement>) => {
    event.preventDefault();
    if (email && password && name) {
      auth
        .createUserWithEmailAndPassword(email, password)
        .then((res) => {
          localStorage.setItem("user", JSON.stringify(res.user));
          navigate("/");
        })
        .catch((err) => {
          console.log("Error:", err);
        });
    }
  };

  return (
    <div className="container fluid text-light">
      <div className="row">
        <div className="col-md-4 offset-md-4 mt-5">
          <section className="text-center">
            <h1>E-LEARN</h1>

            <h4 className="p-2">Create your account</h4>

            <p>
              Already have an account,
              <Link to="/signin">
                <span className="px-2 text-light fw-bolder">Sign In</span>
              </Link>
            </p>
          </section>

          <section className="p-4">
            <form action="">
              <label className="p-1" htmlFor="name">
                Name
              </label>
              <input
                type="text"
                name="name"
                id="name"
                className="form-control p-2"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
              <label className="p-1" htmlFor="email">
                Email
              </label>
              <input
                type="email"
                name="email"
                id="email"
                className="form-control p-2"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <label className="p-1 mt-2" htmlFor="password">
                Password
              </label>
              <input
                type="password"
                name="password"
                id="password"
                className="form-control p-2"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />

              <button
                type="button"
                className="btn btn-secondary w-100 rounded mt-3"
                onClick={handleSignUpSubmit}
              >
                Sign Up
              </button>
            </form>
          </section>
        </div>
      </div>
    </div>
  );
};
