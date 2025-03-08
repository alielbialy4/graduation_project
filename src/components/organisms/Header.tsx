import { Link } from "react-router-dom";
import { useState } from "react";
import { Burger, Drawer } from "@mantine/core";

const Header = () => {
  const [opened, setOpened] = useState(false);

  return (
    <div className="container mx-auto fixed top-0 left-0 right-0 z-50 bg-inherit">
      <div className="flex justify-between items-center py-4 px-6 text-white">
        {/* Logo */}
        <Link to="/">
          <div className="flex items-center gap-4">
            <p className="text-3xl font-bold text-emerald-500">Ever Green</p>
          </div>
        </Link>

        {/* Desktop Menu */}
        <div className="hidden md:flex items-center gap-6 ">
          <Link to="/" className="text-xl font-bold">Home</Link>
          <Link to="/about" className="text-xl font-bold">About</Link>
          <Link to="/login" className="text-xl font-bold">Login</Link>
          <Link to="/sign-up" className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold">
            Sign Up
          </Link>
        </div>

        {/* Mobile Menu */}
        <div className="md:hidden block">
          <Burger opened={opened} onClick={() => setOpened(!opened)} aria-label="Toggle navigation" color="#10b981" />
        </div>
      </div>

      {/* Drawer for Mobile Menu */}
      <Drawer opened={opened} onClose={() => setOpened(false)} padding="md" size="md">
        <div className="flex flex-col gap-4">
          <Link to="/" className="text-xl font-bold" onClick={() => setOpened(false)}>Home</Link>
          <Link to="/about" className="text-xl font-bold" onClick={() => setOpened(false)}>About</Link>
          <Link to="/login" className="text-xl font-bold" onClick={() => setOpened(false)}>Login</Link>
          <Link to="/sign-up" className="bg-emerald-500 text-white px-4 py-2 rounded-xl font-bold text-center" onClick={() => setOpened(false)}>
            Sign Up
          </Link>
        </div>
      </Drawer>
    </div>
  );
};

export default Header;
