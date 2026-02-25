/*

# Sharing a link to a session

The agent starts a session and then shares a link with the
customer so they can join the session.

On the customer side, the web page should check for the session id
and use that to get the session:

```js
if (CobrowseIO.currentSession == null) {
    const searchParams = new URLSearchParams(window.location.search)
    const session = searchParams.get('session_id')
    if (session) {
        CobrowseIO.getSession(session);
    }
}
```

Sessions automatically expire after 15 minutes if the customer
does not join.

See DeviceLinkDemo.tsx when you want to schedule Cobrowse sessions
later.

*/
import type { default as CobrowseAPI, Session } from "cobrowse-agent-sdk";
import React from "react";
import { useCobrowse } from "./CobrowseContext.ts";
import ActiveSession from "./components/ActiveSession.tsx";
import ShareCobrowseLink from "./components/ShareCobrowseLink.tsx";
import WaitingScreen from "./components/WaitingScreen.tsx";

type SessionLinkDemoProps = {
	demoId: string;
	meetingUrl: string;
	meetingId: string;
};

// Sessions must be started within 15 minutes otherwise they will timeout
export default function SessionLinkDemo({
	demoId,
	meetingUrl,
	meetingId,
}: SessionLinkDemoProps) {
	const cobrowse = useCobrowse();
	const [session, setSession] = React.useState<null | Session>(null);

	React.useEffect(() => {
		// JWT tokens in the trial account can only join sessions
		// that have the same data used to request the token
		const customData = { demo_id: demoId, meeting_id: meetingId };
		cobrowse.sessions.create({ custom_data: customData }).then(setSession);
	}, [cobrowse, demoId, meetingId]);

	// Generate a link to the session that can be shared with the customer
	const url = new URL(meetingUrl);
	if (session) {
		url.searchParams.set("session_code", session.code);
	}

	return (
		<>
			<header>
				<h2>Cobrowse now</h2>
				<ShareCobrowseLink url={url.toString()} />
			</header>
			<SessionScreen cobrowse={cobrowse} session={session} />
		</>
	);
}

function SessionScreen({
	cobrowse,
	session,
}: {
	cobrowse: CobrowseAPI;
	session: null | Session;
}): React.JSX.Element {
	if (!session) {
		return <WaitingScreen text="Creating session..." />;
	}

	const sessionUrl = `${cobrowse.api}/session/${session.id}?token=${cobrowse.token}&end_action=none&session_details=none`;

	return <ActiveSession cobrowse={cobrowse} url={sessionUrl} />;
}
