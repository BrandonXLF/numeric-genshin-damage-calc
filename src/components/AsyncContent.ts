import React, { useEffect } from "react";

export default function AsyncContent(props: Readonly<{
	promise: Promise<React.ReactNode>;
}>) {
    const [content, setContent] = React.useState<React.ReactNode | undefined>();
    
	useEffect(
		() => {
			(async () => setContent(await props.promise))()
		},
		[props.promise]
	);

    return content ?? '';
}