import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import Logo from "../shared/logo.png";

function Navbar() {
	const [isOpen, setIsOpen] = useState(false);

	const toggleMenu = () => {
		setIsOpen(!isOpen);
	};

	return (
		<nav className="bg-[rgba(247, 248, 249, 1)] text-[#8c8c8c] px-4 md:px-[15%] bg-[#F7F8F9] pb-5 pt-2">
			{/* Logo and Burger Menu - Visible Only on Small Devices */}
			<div className="container mx-auto flex items-center justify-between py-4 lg:hidden">
				<div className="flex items-center space-x-4">
					<button onClick={toggleMenu} className="focus:outline-none">
						<svg
							className="w-6 h-6"
							fill="none"
							stroke="currentColor"
							viewBox="0 0 24 24"
							xmlns="http://www.w3.org/2000/svg">
							{isOpen ? (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M6 18L18 6M6 6l12 12"
								/>
							) : (
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									strokeWidth="2"
									d="M4 6h16M4 12h16M4 18h16"
								/>
							)}
						</svg>
					</button>
				</div>
			</div>

			{/* Navigation Links */}
			<div
				className={`${
					isOpen ? "flex flex-col items-center space-y-4" : "hidden"
				} lg:flex lg:flex-row lg:items-center lg:space-x-8 lg:justify-center w-full`}>
				{/* Logo aligned to the start */}
				<a href="http://www.matf.bg.ac.rs/" className="lg:flex-shrink-0">
					<img src={Logo} className="h-10 w-auto" alt="Logo" />
				</a>

				{/* Navigation links centered */}
				<div
					className={`${
						isOpen ? "flex flex-col items-center space-y-4" : "hidden"
					} lg:flex lg:flex-row lg:items-center lg:space-x-8 lg:justify-center w-full`}>
					<NavLink
						to="/"
						className={({ isActive }) =>
							isActive
								? "text-[#1e1818] hover:text-[#8c8c8c] font-semibold text-base"
								: "text-[#8c8c8c] hover:text-[#666666]"
						}>
						Почетна
					</NavLink>
					<NavLink
						to="/biografija"
						className={({ isActive }) =>
							isActive
								? "text-[#1e1818] hover:text-[#8c8c8c] font-semibold text-base"
								: "text-[#8c8c8c] hover:text-[#666666]"
						}>
						Биографија
					</NavLink>
					<NavLink
						to="/nastava"
						className={({ isActive }) =>
							isActive
								? "text-[#1e1818] hover:text-[#8c8c8c] font-semibold text-base"
								: "text-[#8c8c8c] hover:text-[#666666]"
						}>
						Настава
					</NavLink>
					<NavLink
						to="/obavestenja"
						className={({ isActive }) =>
							isActive
								? "text-[#1e1818] hover:text-[#8c8c8c] font-semibold text-base"
								: "text-[#8c8c8c] hover:text-[#666666]"
						}>
						Обавештења
					</NavLink>
					<NavLink
						to="/radovi"
						className={({ isActive }) =>
							isActive
								? "text-[#1e1818] hover:text-[#8c8c8c] font-semibold text-base"
								: "text-[#8c8c8c] hover:text-[#666666]"
						}>
						Радови
					</NavLink>
					<NavLink
						to="/blog"
						className={({ isActive }) =>
							isActive
								? "text-[#1e1818] hover:text-[#8c8c8c] font-semibold text-base"
								: "text-[#8c8c8c] hover:text-[#666666]"
						}>
						Блог
					</NavLink>
				</div>
			</div>
		</nav>
	);
}

export default Navbar;
