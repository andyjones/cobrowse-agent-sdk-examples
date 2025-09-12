import { nanoid } from "nanoid";
import React from "react";
import CobrowseProvider from "./CobrowseProvider.tsx";
import NavBar from "./components/NavBar.tsx";
import DeviceLinkDemo from "./DeviceLinkDemo.tsx";
import SessionLinkDemo from "./SessionLinkDemo.tsx";
import type { Tab } from "./types.ts";
import { getSearchParam, setSearchParam } from "./util/searchParams.ts";
import "./App.css";

const DEMO_ID =
	getSearchParam("demo_id") || setSearchParam("demo_id", nanoid());
const DEFAULT_URL =
	"https://cobrowse-sdk-js-examples.cbrws.io/web-example/demo";
const DEFAULT_TOKEN = getSearchParam("token") || "";
const DEFAULT_API = getSearchParam("api") || "";

function App({
	demoId = DEMO_ID,
	token = DEFAULT_TOKEN,
	api = DEFAULT_API,
} = {}) {
	const [activeTab, setActiveTab] = React.useState<Tab>("");
	const [meetingUrl, setMeetingUrl] = React.useState<string>(() => {
		return getSearchParam("meeting_url") || DEFAULT_URL;
	});
	const [meetingId, setMeetingId] = React.useState<string>(nanoid);

	function handleClick(tab: Tab) {
		setMeetingId(nanoid());
		setActiveTab(tab);
	}

	return (
		<CobrowseProvider demoId={demoId} token={token} api={api}>
			<NavBar
				meetingUrl={meetingUrl}
				setMeetingUrl={setMeetingUrl}
				setTab={handleClick}
			/>
			<main>
				{activeTab === "session" && (
					<SessionLinkDemo
						demoId={demoId}
						meetingUrl={meetingUrl}
						meetingId={meetingId}
					/>
				)}
				{activeTab === "device" && (
					<DeviceLinkDemo
						demoId={demoId}
						meetingUrl={meetingUrl}
						meetingId={meetingId}
					/>
				)}
			</main>
		</CobrowseProvider>
	);
}

export default App;
