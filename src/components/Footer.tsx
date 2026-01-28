import '../less/Footer.less';

export function Footer() {
	return <footer>
		<div>
			Calculate in-game character damage for Genshin Impact based off of numeric stat values. 
		</div>
		<div>
			Developed by Brandon Fowler (<a href="https://www.brandonfowler.me/genshin-tools/">other tools</a>).
			{' '}<a href="https://github.com/BrandonXLF/numeric-genshin-damage-calc">View source code</a>.
		</div>
	</footer>;
}