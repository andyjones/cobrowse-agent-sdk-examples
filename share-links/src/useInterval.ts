import React from "react";

type CallbackFn = () => void;

export default function useInterval(
	callback: CallbackFn,
	delay: null | number,
) {
	const savedCallback = React.useRef<CallbackFn>(null);

	React.useEffect(() => {
		savedCallback.current = callback;
	});

	React.useEffect(() => {
		function tick() {
			savedCallback.current?.();
		}

		if (delay !== null) {
			const id = setInterval(tick, delay);
			return () => clearInterval(id);
		}
	}, [delay]);
}
