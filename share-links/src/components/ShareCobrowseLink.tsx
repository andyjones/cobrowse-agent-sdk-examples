import { useRef } from "react";
import CopyToClipboard from "./CopyToClipboard.tsx";

type ShareCobrowseLinkProps = {
	url: string;
};

export default function ShareCobrowseLink({ url }: ShareCobrowseLinkProps) {
	const customerUrlRef = useRef<HTMLInputElement | null>(null);

	return (
		<fieldset>
			<input
				name="share"
				type="text"
				className="font-mono"
				ref={customerUrlRef}
				value={url}
				disabled
			/>
			<CopyToClipboard sourceRef={customerUrlRef} />
		</fieldset>
	);
}
