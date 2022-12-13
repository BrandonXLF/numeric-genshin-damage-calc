import CalculatorForm from './CalculatorForm';
import '../css/index.css';
import 'reactjs-popup/dist/index.css';
import '../css/popup.css';
import { Footer } from './Footer';

export default function App() {
	return <main className='center-items'>
		<h1>Numeric Genshin Damage Calculator</h1>
		<CalculatorForm />
		<Footer />
	</main>;
}
