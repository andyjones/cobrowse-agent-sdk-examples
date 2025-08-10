import styles from "./Screen.module.css"

export default function Screen({title, children}): React.JSX.Element {
  return (
    <div className={styles.container}>
        <h2 className={styles.title}>{title}</h2>

        <div className={styles.screen}>
            {children}
        </div>

    </div>
  )
}
