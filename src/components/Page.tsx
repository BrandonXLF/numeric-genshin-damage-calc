const baseTitle = document.title; // Load from index.html

export default function Page(props: Readonly<{
	title?: string;
	children?: React.ReactNode;
}>) {
	document.title = props.title ? `${props.title} - ${baseTitle}` : baseTitle;
	return props.children;
};