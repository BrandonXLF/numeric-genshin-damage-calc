import CalculatorForm from './CalculatorForm';

import '../css/index.css';
import '../css/input.css';
import 'reactjs-popup/dist/index.css';
import '../css/popup.css';

export default function App() {
	return <main className='center-items'>
		<h1>Genshin Impact Damage Calculator</h1>
		<CalculatorForm />
	</main>;
}
