import type {
	default as CobrowseAPI,
	RemoteContext,
	Session,
} from "cobrowse-agent-sdk";
import React from "react";
import styles from "./ActiveSession.module.css";

export default function ActiveSession({
	cobrowse,
	url,
	title = "Cobrowse Session",
}: {
	cobrowse: CobrowseAPI;
	url: string;
	title?: string;
}): React.JSX.Element {
	const [context, setContext] = React.useState<null | RemoteContext>(null);

	const onIframeRef: React.RefCallback<HTMLIFrameElement> = React.useCallback(
		(iframe) => {
			if (context) return;
			if (!iframe) return;

			cobrowse.attachContext(iframe).then((ctx: RemoteContext) => {
				ctx.on("session.updated", (session: Session) => {
					if (!session.isEnded()) return;

					ctx.destroy();

					// Close the session frame after a pause so the agent is aware that it has ended
					setTimeout(() => {
						setContext(null);
					}, 2500);
				});

				ctx.on("error", (err: Error) => {
					console.error(`Session error: ${err}`);
				});

				setContext(ctx);
			});
		},
		[context, cobrowse.attachContext],
	);

	return (
		<iframe
			ref={onIframeRef}
			title={title}
			src={url}
			className={styles.session}
		/>
	);
}
