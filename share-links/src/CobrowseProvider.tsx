import CobrowseAPI from "cobrowse-agent-sdk";
import type { PropsWithChildren } from "react";
import { useEffect, useState } from "react";
import { CobrowseContext } from "./CobrowseContext.ts";

async function fetchToken(demoId: string): Promise<string> {
	// !! WARNING READ THIS !!
	// You should NOT use this endpoint to get your own token. This endpoint is
	// specific to the cobrowse.io hosted online demo. It will not work with your
	// account and devices.
	// You should fetch a token in an authenticated way from your own server for
	// the user. See our documentation on generating a JWT for cobrowse:
	// https://docs.cobrowse.io/agent-side-integrations/custom-iframe-integrations/json-web-tokens-jwts
	const res = await fetch(
		`https://cobrowse.io/api/1/demo/token?demo_id=${demoId}`,
	);
	const { token } = await res.json();
	return token;
}

type WithCobrowseProps = {
	demoId: string;
	token?: string;
	api?: string;
};

export default function CobrowseProvider({
	demoId,
	token,
	api,
	children,
}: PropsWithChildren<WithCobrowseProps>) {
	const options: Record<string, any> = {};
	if (api) options.api = api;
	const [cobrowse] = useState<CobrowseAPI>(() => new CobrowseAPI("", options));

	useEffect(() => {
		console.log(`CobrowseAPI: api=${api} token=${token} demoId=${demoId}`);
		async function setupClient() {
			cobrowse.token = token || (await fetchToken(demoId));
		}
		setupClient();
	}, [cobrowse, api, token, demoId]);

	return <CobrowseContext value={cobrowse}>{children}</CobrowseContext>;
}
