import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, HashRouter } from "react-router-dom";
import Layout from "./components/Layout";
import Pocetna from "./pages/Pocetna";
import { Biografija } from "./components/Biografija";
import { Radovi } from "./components/Radovi";
import { Nastava } from "./components/Nastava";
import { Obavestenja } from "./components/Obavestenja";
import { Blog } from "./components/Blog";
import { JedanBlog } from "./components/JedanBlog";

function RedirectHandler() {
	const navigate = useNavigate();

	useEffect(() => {
		const params = new URLSearchParams(window.location.search);
		const redirectPath = params.get("redirect");
		if (redirectPath) {
			navigate(redirectPath, { replace: true });
		}
	}, [navigate]);

	return null;
}

function App() {
	return (
		<HashRouter>
			<RedirectHandler />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Pocetna />} />
					<Route path="biografija" element={<Biografija />} />
					<Route path="nastava" element={<Nastava />} />
					<Route path="obavestenja" element={<Obavestenja />} />
					<Route path="radovi" element={<Radovi />} />
					<Route path="blog" element={<Blog />} />
					<Route path="blog/:id" element={<JedanBlog />} />
				</Route>
			</Routes>
		</HashRouter>
	);
}

export default App;
