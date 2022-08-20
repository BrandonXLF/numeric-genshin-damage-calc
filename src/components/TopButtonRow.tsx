import InputDetails from "../types/InputDetails";
import createInputDetails from "../utils/CreateInputDetails";

export default function TopButtonRow(props: {
	allInputDetails: InputDetails[];
	setAllInputDetails: React.Dispatch<React.SetStateAction<InputDetails[]>>;
}) {
	return <div className="form-top">
		<button type="button" onClick={() => {
			props.setAllInputDetails([createInputDetails()])
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" fill="currentColor">
				<path d="M496 48V192c0 17.69-14.31 32-32 32H320c-17.69 0-32-14.31-32-32s14.31-32 32-32h63.39c-29.97-39.7-77.25-63.78-127.6-63.78C167.7 96.22 96 167.9 96 256s71.69 159.8 159.8 159.8c34.88 0 68.03-11.03 95.88-31.94c14.22-10.53 34.22-7.75 44.81 6.375c10.59 14.16 7.75 34.22-6.375 44.81c-39.03 29.28-85.36 44.86-134.2 44.86C132.5 479.9 32 379.4 32 256s100.5-223.9 223.9-223.9c69.15 0 134 32.47 176.1 86.12V48c0-17.69 14.31-32 32-32S496 30.31 496 48z" />
			</svg> <span>Reset</span>
		</button>
		<button type="button" onClick={() => {
			props.setAllInputDetails(prevAllInputDetails => [...prevAllInputDetails, createInputDetails(props.allInputDetails[0])])
		}}>
			<svg xmlns="http://www.w3.org/2000/svg" className="pos" fill="currentColor" viewBox="0 0 448 512">
				<path d="M432 256c0 17.69-14.33 32.01-32 32.01H256v144c0 17.69-14.33 31.99-32 31.99s-32-14.3-32-31.99v-144H48c-17.67 0-32-14.32-32-32.01s14.33-31.99 32-31.99H192v-144c0-17.69 14.33-32.01 32-32.01s32 14.32 32 32.01v144h144C417.7 224 432 238.3 432 256z" />
			</svg> <span>Add Column</span>
		</button>
	</div>;
}