import type CobrowseAPI from "cobrowse-agent-sdk";
import { createContext, useContext } from "react";

export const CobrowseContext = createContext<null | CobrowseAPI>(null);

export function useCobrowse(): CobrowseAPI {
	const ctx = useContext(CobrowseContext);
	if (ctx === null) {
		throw new Error("useCobrowse must be used within an CobrowseProvider");
	}
	return ctx;
}
