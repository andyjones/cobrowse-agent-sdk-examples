import { faCheck, faCopy } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";

interface CopyToClipboardProps {
	sourceRef: React.RefObject<null | HTMLElement>;
}

function getText(el: HTMLElement): string {
	if (el instanceof HTMLInputElement) {
		return el.value;
	}
	return el.innerText;
}

export default function CopyToClipboard({
	sourceRef,
}: CopyToClipboardProps): React.JSX.Element {
	const [copied, setCopied] = React.useState<boolean>(false);

	const handleClick = () => {
		if (sourceRef === null) return;
		if (!sourceRef.current) return;

		const text = getText(sourceRef.current);
		navigator.clipboard.writeText(text);

		setCopied(true);

		setTimeout(() => setCopied(false), 2500);
	};

	return (
		<button type="button" onClick={handleClick}>
			<FontAwesomeIcon icon={copied ? faCheck : faCopy} />
		</button>
	);
}
