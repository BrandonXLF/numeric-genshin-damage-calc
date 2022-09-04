import CalculatorForm from './CalculatorForm';

import '../css/index.css';
import 'reactjs-popup/dist/index.css';
import '../css/popup.css';

export default function App() {
	return <main className='center-items'>
		<h1>Numeric Genshin Damage Calculator</h1>
		<CalculatorForm />
		<footer>
			<div>
				Calculate in-game character damage for Genshin Impact based off of numeric stat values. 
			</div>
			<div>
				<a href="https://github.com/BrandonXLF/numeric-genshin-damage-calc">Source code</a>
			</div>
		</footer>
	</main>;
}
