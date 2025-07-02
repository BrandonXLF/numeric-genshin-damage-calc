import "./less/index.less";
import "reactjs-popup/dist/index.css";
import "./less/popup.less";
import { Footer } from "./components/Footer";
import { Route, Routes } from "react-router";
import HelpPage from "./pages/HelpPage";
import CalculatorPage from "./pages/CalculatorPage";

export default function App() {
	return <main className='center-items'>
		<h1>Numeric Genshin Damage Calculator</h1>
		<Routes>
			<Route path="/" Component={CalculatorPage} />
			<Route path="/help" Component={HelpPage} />
		</Routes>
		<Footer />
	</main>;
}
