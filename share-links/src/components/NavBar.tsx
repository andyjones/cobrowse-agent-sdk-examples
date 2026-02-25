import {
	faCalendarPlus,
	faShareFromSquare,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { Tab } from "../types.ts";
import styles from "./NavBar.module.css";

type NavBarProps = {
	meetingUrl: string;
	setMeetingUrl: (url: string) => void;
	setTab: (tab: Tab) => void;
};

export default function NavBar({
	meetingUrl,
	setMeetingUrl,
	setTab,
}: NavBarProps) {
	return (
		<nav className={styles.nav}>
			<input
				name="meetingUrl"
				type="text"
				className={styles.input}
				value={meetingUrl}
				onChange={(e) => setMeetingUrl(e.target.value)}
			/>
			<button
				className={styles.button}
				type="button"
				onClick={() => setTab("session")}
			>
				<FontAwesomeIcon icon={faShareFromSquare} title="Cobrowse now" />{" "}
				Cobrowse now
			</button>
			<button
				className={styles.button}
				type="button"
				onClick={() => setTab("device")}
			>
				<FontAwesomeIcon icon={faCalendarPlus} title="Cobrowse later" />{" "}
				Cobrowse later
			</button>
		</nav>
	);
}
