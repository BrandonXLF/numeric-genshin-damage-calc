import CalculatorForm from "./CalculatorForm";
import "../less/index.less";
import "reactjs-popup/dist/index.css";
import "../less/popup.less";
import { Footer } from "./Footer";
import { Route, Routes } from "react-router";
import HelpPage from "./HelpPage";

export default function App() {
	return <main className='center-items'>
		<h1>Numeric Genshin Damage Calculator</h1>
		<Routes>
			<Route path="/" element={<CalculatorForm />} />
			<Route path="/help" element={<HelpPage />} />
		</Routes>
		<Footer />
	</main>;
}
