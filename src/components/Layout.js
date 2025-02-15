// src/components/Layout.js
import React from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import { Outlet } from "react-router-dom";

function Layout() {
	return (
		<div className="App">
			<Navbar />
			<main>
				<Outlet />
			</main>
			<Footer />
		</div>
	);
}

export default Layout;
