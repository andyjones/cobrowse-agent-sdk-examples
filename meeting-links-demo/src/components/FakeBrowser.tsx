import React from "react"
import {QRCodeSVG} from 'qrcode.react';
import styles from './FakeBrowser.module.css'

type FakeBrowserProps = {
    webUrl: string;
    qrUrl: string;
}

const TAB_WEB = 'web'
const TAB_ANDROID = 'android'
const TAB_IOS = 'ios'
const TAB_QR = 'qr'

type Tabs = TAB_WEB | TAB_ANDROID | TAB_IOS | TAB_QR

export default function FakeBrowser({webUrl, qrUrl}: FakeBrowserProps): React.JSX.Element {
  const [tab, setTab] = React.useState<Tabs>(TAB_WEB)

  const displayUrl = tab === TAB_WEB ? webUrl : qrUrl

  return (
    <div className={styles.browser}>
        <nav>
            <input type="text" className={styles.url} value={displayUrl} disabled />
            <button className={tab === TAB_WEB ? styles.active : styles.inactive} onClick={() => setTab(TAB_WEB)}>Web</button>
            <button className={tab === TAB_QR ? styles.active : styles.inactive} onClick={() => setTab(TAB_QR)}>QR</button>
        </nav>

        <iframe
           className={tab === TAB_WEB ? "" : styles.hidden}
           src={webUrl}
           scrolling="yes"
        />
        <figure className={tab === TAB_QR ? "" : styles.hidden}>
            <QRCodeSVG value={qrUrl} title={qrUrl} />
            <figcaption>Scan to open <a href={qrUrl}>{qrUrl}</a></figcaption>
        </figure>
    </div>
  )
}
