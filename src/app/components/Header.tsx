"use client";

import Link from "next/link";
import Image from "next/image";
import { useState } from "react";
import "../globals.css";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { userId, logout } = useAuth();

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <header
      className="border-bottom"
      style={{ backgroundColor: "rgba(35, 170, 170, 1.00" }}
    >
      <div
        className="container d-flex justify-content-between align-items-center"
        style={{
          maxWidth: 960
        }}
      >
        <Link href="/">
          <Image
            src="https://divin2sy6ce0b.cloudfront.net/images/2017-11-06/whiteLogo2-min.png"
            alt="CareLuLu Logo"
            width={150}
            height={50}
          />
        </Link>
        <form className="d-flex">
          <input
            className="form-control"
            type="search"
            placeholder="Search"
            aria-label="Search"
            style={{
              borderRadius: 0
            }}
          />
          <button className="ZipSearch__button" type="submit">
            <span
              style={{
                padding: 10
              }}
            >
              Search
            </span>
          </button>
        </form>
        <div
          style={{
            width: "150px",
            height: "40px",
            display: "flex",
            flexDirection: "column",
            alignItems: "flex-end"
          }}
          className={`dropdown`}
          onMouseEnter={() => setIsOpen(true)}
          onMouseLeave={() => setIsOpen(false)}
        >
          <div
            style={{
              position: "absolute"
            }}
          >
            <div
              style={{
                display: "flex",
                width: "150px",
                flexDirection: "column",
                alignItems: "flex-end"
              }}
            >
              <button
                className={`btn dropdown-toggle`}
                type="button"
                id="dropdownMenuButton"
                aria-expanded={isOpen}
                style={{
                  backgroundColor: "#ffcc00",
                  borderColor: "#ffcc00",
                  color: "#FFFFFF",
                  borderRadius: "2px",
                  height: "40px"
                }}
              >
                <span
                  style={{
                    paddingRight: "22px"
                  }}
                >
                  Menu
                </span>
                <svg
                  viewBox="0 0 20 20"
                  width="20"
                  height="20"
                  fill="#FFFFFF"
                  style={{
                    position: "absolute",
                    top: "10px",
                    right: "5px"
                  }}
                >
                  <path d="M4.516 7.548c0.436-0.446 1.043-0.481 1.576 0l3.908 3.747 3.908-3.747c0.533-0.481 1.141-0.446 1.574 0 0.436 0.445 0.408 1.197 0 1.615-0.406 0.418-4.695 4.502-4.695 4.502-0.217 0.223-0.502 0.335-0.787 0.335s-0.57-0.112-0.789-0.335c0 0-4.287-4.084-4.695-4.502s-0.436-1.17 0-1.615z"></path>
                </svg>
              </button>
              <ul
                className={`dropdown-menu ${isOpen ? "show" : ""}`}
                aria-labelledby="dropdownMenuButton"
              >
                <li>
                  <Link href="/">
                    <p className={`dropdown-item`}>Home</p>
                  </Link>
                </li>
                {userId ? (
                  <li onClick={logout}>
                    <p className={`dropdown-item`}>Logout</p>
                  </li>
                ) : (
                  <>
                    <li>
                      <Link href="/login">
                        <p className={`dropdown-item`}>Login</p>
                      </Link>
                    </li>
                    <li>
                      <Link href="/sign-up">
                        <p className={`dropdown-item`}>Sign Up</p>
                      </Link>
                    </li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
