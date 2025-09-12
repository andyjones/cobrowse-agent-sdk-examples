/*

# Scheduling a Cobrowse session later

The agent shares a link with the customer that will uniquely
identify the customer. The agent can use the Smart Connect button
to start a session when the customer comes online.

On the customer side, the web page should check for the meeting id
and tag the device so the agent can identify the customer.

```js
if (CobrowseIO.currentSession == null) {
    const searchParams = new URLSearchParams(window.location.search)
    const meeting_id = searchParams('meeting_id')
    if (meeting_id) CobrowseIO.customData['meeting_id'] = meeting_id
}
```

Your Cobrowse.io account must have device registration enabled to work.

See SessionLinkDemo.tsx when you want to schedule a Cobrowse session
right now.

*/

import type * as CobrowseAPI from "cobrowse-agent-sdk";
import { Device, SmartConnectButton } from "cobrowse-agent-ui";
import { useCallback, useEffect, useState } from "react";
import { useCobrowse } from "./CobrowseContext.ts";
import ActiveSession from "./components/ActiveSession.tsx";
import ShareCobrowseLink from "./components/ShareCobrowseLink.tsx";
import WaitingScreen from "./components/WaitingScreen.tsx";
import styles from "./DeviceLinkDemo.module.css";
import useInterval from "./useInterval.ts";
import * as units from "./util/units.ts";

type DeviceLinkDemoProps = {
	demoId: string;
	meetingUrl: string;
	meetingId: string;
};

type CustomData = Record<string, string>;

function serialiseCustomData(customData: CustomData) {
	return Object.entries(customData)
		.reduce((acc: string[], [key, val]: [string, string]) => {
			acc.push(`${key}:${val}`);
			return acc;
		}, [])
		.join(",");
}

export default function DeviceLinkDemo({
	demoId,
	meetingUrl,
	meetingId,
}: DeviceLinkDemoProps) {
	const cobrowse = useCobrowse();
	const [devices, setDevices] = useState<CobrowseAPI.Device[]>([]);
	const [deviceUrl, setDeviceUrl] = useState<null | string>(null);

	const url = new URL(meetingUrl);
	const customData: CustomData = {
		demo_id: demoId,
		meeting_id: meetingId,
	};
	url.searchParams.set("custom_data", serialiseCustomData(customData));

	const refreshDevices = useCallback(
		async (meetingId: string) => {
			const latest: CobrowseAPI.Device[] = await cobrowse.devices.list({
				filter_demo_id: demoId,
				filter_meeting_id: meetingId,
				seen_after: `${Date.now() - 30 * units.MINUTE}`,
			});

			setDevices((existing) => {
				// Compare the device ids to see if the device list
				// has changed to avoid unnecessary rerenders
				const existingIds = existing.map((d) => d.id).join(",");
				const latestIds = latest.map((d) => d.id).join(",");

				return existingIds === latestIds ? existing : latest;
			});
		},
		[demoId, cobrowse],
	);

	useEffect(() => {
		// Clear any existing session
		setDeviceUrl(null);

		// Monitor for the customer to come online
		refreshDevices(meetingId);
	}, [meetingId, refreshDevices]);

	// Refresh the device list to see if the customer is online
	const inSession = !!deviceUrl;
	useInterval(
		() => refreshDevices(meetingId),
		inSession ? null : 5 * units.SECOND,
	);

	const handleConnect = (device: CobrowseAPI.Device) => {
		setDeviceUrl(
			`${cobrowse.api}/connect/device/${device.id}?token=${cobrowse.token}&end_action=none&session_details=none`,
		);
	};

	return (
		<>
			<header>
				<h2>Cobrowse later</h2>
				<ShareCobrowseLink url={url.toString()} />
			</header>

			{cobrowse && deviceUrl ? (
				<ActiveSession cobrowse={cobrowse} url={deviceUrl} />
			) : (
				<DeviceList devices={devices} onConnect={handleConnect} />
			)}
		</>
	);
}

type DeviceListProps = {
	devices: CobrowseAPI.Device[];
	onConnect: (device: CobrowseAPI.Device) => void;
};

function DeviceList({ devices, onConnect }: DeviceListProps) {
	if (!devices.length) {
		return <WaitingScreen text="Waiting for customer to come online ..." />;
	}

	return (
		<ul className={styles.deviceList}>
			{devices.map((device) => (
				<DeviceItem key={device.id} device={device} onClick={onConnect} />
			))}
		</ul>
	);
}

type DeviceItemProps = {
	device: CobrowseAPI.Device;
	onClick: (device: CobrowseAPI.Device) => void;
};

function DeviceItem({ device, onClick }: DeviceItemProps) {
	const [, forceUpdate] = useState(0);

	useEffect(() => {
		device.subscribe();
		device.on("updated", () => {
			// The device variable has been updated but outside of React
			// so we need to force a rerender
			forceUpdate((value) => value + 1);
		});
		return () => {
			console.log(device.id, "unsubscribing");
			device.unsubscribe();
		};
	}, [device]);

	return (
		<li>
			<Device device={device}>
				<SmartConnectButton device={device} onClick={onClick} />
			</Device>
		</li>
	);
}
