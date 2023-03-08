import CalculatorForm from './CalculatorForm';
import '../less/index.less';
import 'reactjs-popup/dist/index.css';
import '../less/popup.less';
import { Footer } from './Footer';

export default function App() {
	return <main className='center-items'>
		<h1>Numeric Genshin Damage Calculator</h1>
		<CalculatorForm />
		<Footer />
	</main>;
}
