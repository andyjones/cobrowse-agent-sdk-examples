import { useEffect, useState } from 'react'
import { nanoid } from 'nanoid'
import { Toaster, toast } from 'sonner'
import CobrowseAPI from 'cobrowse-agent-sdk';
import FakeBrowser from '@components/FakeBrowser'
import Header from '@components/Header'
import Screen from '@components/Screen'
import SupportAgent from '@components/SupportAgent'
import styles from './App.module.css'

// TODO: move to useContext?
// TODO: let people store their private key in local storage for demo purposes?
const token = 'eyJhbGciOiJSUzI1NiIsInR5cCI6IkpXVCJ9.eyJpYXQiOjE3NTIwNDg5NDYsImV4cCI6MTc1MjA4MTM0NiwiYXVkIjoiaHR0cHM6Ly9jb2Jyb3dzZS5pbyIsImlzcyI6IlNQR3FQSWNWbnNPRUpRIiwic3ViIjoiYW5keS5qb25lc0Bjb2Jyb3dzZS5pbyIsImRpc3BsYXlOYW1lIjoiQW5keSBKb25lcyAoU3VwcG9ydCBBZ2VudCkifQ.BptpcWJDN56x60gn6ffagPHW7klRxz8kl854b0aJ252mb77OjRUAOvc6n8IkWdl6ja2hnEUfJ8J7KRqcJA3AiRfrNdMP99Yb4xZM7v_C3lNR1A8t-hpzCc2zWuNgi8biMvVvp-s5qJN-kxdqdopuqtBXy7w6HH9DN-rVOoSbiq5UysmuyZ_lhnGhfqfUwMW5N4nRd4mBsgGVh5VhqLsyXg1cPnu418Sb9yP-P3J9VmZLR-haEz_1z706vxpzCy0AUk8SOrUWVEItpcaGAqf9ViJNujXocl8PEw2MauOrlyd8VUOVlFj4IAW4eMCyAR736FeLeatBNjE_L7wi_0h5-L4eL3IQA_j8zXcSsp6He4iKktuXuL9vcVFh1IKLguQj9ehnDfIJ4OCLgui8AWxtwjBRow82pcxhmB2OnsPY8b3ZGnKQtJ4o5ADV1_Etwy-7Rp8b8lGqLTrCrT6jJNXyX5GiFtZBGj5UNiPoZf_SB8rh-1CmrLBOPXBFJjk47pTAYyKmbEULboLL3zILTY7YuZKETMk9kBIJlVvAwnrUqlT0ehGbSNcJwb6ciTnzZiJMOVjFh9QzW2RacWrFSc-H7GPRylS18-uoW6L2kkNskQj51fs6Dzk8JQlqOmAIbffKjAnktAttJTMMUcoMAT_lQPSxbBTOvxerLz2Xyv1LBZM';
const cobrowse = token ? new CobrowseAPI() : {token: ""}
cobrowse.token = token

// To make troubleshooting easier!
window.cobrowse = cobrowse

const catchError = (promise: Promise<any>) => promise.catch(handleError)
const handleError = (e: Error) => toast.error(`${e}`)

function App () {
  const [meetingId] = useState(nanoid())
  const [device, setDevice] = useState<CobrowseAPI.Device>(null)

  const qrUrl = meetingId ? `https://cbrws.io/demo/${meetingId}?license=SPGqPIcVnsOEJQ&demo_id=${meetingId}` : ''
  const webUrl = meetingId ? `https://cobrowse-sdk-js-examples.cbrws.io/web-example/demo?license=SPGqPIcVnsOEJQ&custom_data=demo_id:${meetingId}` : ''

  async function fetchDevices() {
      // filter so we only see devices with our meeting id
      // Our meeting id is unique so we should get 0 or 1 devices returned
      const [customerDevice]: CobrowseAPI.Device = await cobrowse.devices.list({filter_demo_id: meetingId})

      if (customerDevice === device) return

      device?.unsubscribe()

      // Subscribe to presence notifications
      customerDevice?.subscribe()
      customerDevice?.on('updated', setDevice)
  }

  useEffect(() => {
      catchError(fetchDevices())

      return () => device?.unubscribe()
  }, [meetingId])

  return (
    <>
      <Toaster richColors />
      <Header meetingId={meetingId} />

      <main className={styles.main}>
        <Screen title="Support agent view">
            <SupportAgent cobrowse={cobrowse} device={device} onRefresh={() => catchError(fetchDevices())} />
        </Screen>
        <Screen title="Customer view">
            <FakeBrowser webUrl={webUrl} qrUrl={qrUrl} />
        </Screen>
      </main>
    </>
  )
}

export default App
