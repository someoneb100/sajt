import React, { useEffect } from "react";
import { HashRouter as Router, Routes, Route, useNavigate, useLocation } from "react-router-dom";
import Layout from "./components/Layout";
import Pocetna from "./pages/Pocetna";
import { Biografija } from "./components/Biografija";
import { Radovi } from "./components/Radovi";
import { Nastava } from "./components/Nastava";
import { Obavestenja } from "./components/Obavestenja";
import { Blog } from "./components/Blog";
import { JedanBlog } from "./components/JedanBlog";
import { JednoObavestenje} from "./components/JednoObavestenje";

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

function TitleUpdater() {
	const location = useLocation();

	useEffect(() => {
		const titles = {
			"/": "Почетна | Петар Ђорђевић - Математички факултет",
			"/biografija": "Биографија | Петар Ђорђевић - Математички факултет",
			"/nastava": "Настава | Петар Ђорђевић - Математички факултет",
			"/obavestenja": "Обавештења | Петар Ђорђевић - Математички факултет",
			"/radovi": "Радови | Петар Ђорђевић - Математички факултет",
			"/blog": "Блог | Петар Ђорђевић - Математички факултет"
		};

		// Dohvati dinamički naslov ili postavi podrazumevani
		document.title = titles[location.pathname] || "Петар Ђорђевић - Математички факултет";
	}, [location]);

	return null;
}

function App() {
	return (
		<Router>
			<RedirectHandler />
			<TitleUpdater />
			<Routes>
				<Route path="/" element={<Layout />}>
					<Route index element={<Pocetna />} />
					<Route path="biografija" element={<Biografija />} />
					<Route path="nastava" element={<Nastava />} />
					<Route path="obavestenja" element={<Obavestenja />} />
					<Route path="radovi" element={<Radovi />} />
					<Route path="blog" element={<Blog />} />
					<Route path="blog/:id" element={<JedanBlog />} />
					<Route path="obavestenja/:id" element={< JednoObavestenje />} />
				</Route>
			</Routes>
		</Router>
	);
}

export default App;
