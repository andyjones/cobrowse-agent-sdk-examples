import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./WaitingScreen.module.css";

export default function WaitingScreen({ text }: { text: string }) {
	return (
		<div className={styles.waitingScreen}>
			<FontAwesomeIcon icon={faSpinner} size="2xl" spin />

			<p className={styles.waitingText}>{text}</p>
		</div>
	);
}
