import React from "react"
import CobrowseAPI from 'cobrowse-agent-sdk'
import {Device, SmartConnectButton} from "cobrowse-agent-ui"
import { toast } from 'sonner'
import styles from "./SupportAgent.module.css"

type WaitingForCustomerProps = {
    onRefresh: () => void;
}

function WaitingForCustomer({ onRefresh }: WaitingForCustomerProps): React.JSX.Element {
  /*
  React.useEffect(() => {
    let timer = setInterval(onRefresh, 2500)
    return () => clearInterval(timer)
  })
  */

  return (
    <div className={`${styles.container} ${styles.waiting}`}>
      <p>Waiting for the customer to come online</p>

      <button onClick={() => onRefresh()}>Refresh now</button>
    </div>
  )
}

type SupportAgentProps = {
    cobrowse: any;
    device: CobrowseAPI.Device;
    onRefresh: () => void;
}

export default function SupportAgent({cobrowse, device, onRefresh}: SupportAgentProps): React.JSX.Element {
  const [sessionUrl, setSessionUrl] = React.useState<string>('')
  const [context, setContext] = React.useState(null)

  if (!device) return <WaitingForCustomer onRefresh={onRefresh} />

  const startSession = (device: CobrowseAPI.Device) => {
      setSessionUrl(`${cobrowse.api}/connect/device/${device.id}?token=${cobrowse.token}&end_action=none&session_details=none`)
  }

  async function onIframeRef(iframe: HTMLIFrameElement) {
     if (context) return
     if (!iframe) return

     const ctx = await cobrowse.attachContext(iframe)

     // Make the Cobrowse SDK available for troubleshooting
     window.cobrowse_ctx = ctx

     ctx.on('session.updated', (session: CobrowseAPI.Session) => {
        if (!session.isEnded()) return

        ctx.destroy()

        // Close the session frame after a pause so the agent is aware that it has ended
        setTimeout(() => {
            setContext(null)
            setSessionUrl('')
         }, 2500)
     })

     ctx.on('error', (err: Error) => {
         toast.error(`Session error: ${err}`)
     })

     setContext(ctx)
  }

  return (
      <div className={styles.container}>
          <Device key={device.id} device={device}>
               {sessionUrl
                   ? <span className="SmartConnectButton online">Connected</span>
                   : <SmartConnectButton device={device} onClick={() => startSession(device)} />
               }
          </Device>

          {sessionUrl && <iframe ref={onIframeRef} className={styles.iframe} src={sessionUrl} />}
      </div>
  )
}
