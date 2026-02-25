# Share links demo

It is often useful for an agent to share a link with a customer to start a Cobrowse session.

This demo shows two ways to do that using the Cobrowse Agent SDK.

Use session links when you wish to start a Cobrowse session immediately. The agent shares a link to their current session with the customer. The customer clicks on the link and joins the Cobrowse session immediately. These links automatically expire after 15 minutes.

When the agent wants to schedule a Cobrowse session later, they should share a device link instead. Device links tag the customer so the agent can use the smart connect feature to connect when the customer comes online.

This example uses the Cobrowse Agent SDK, Vite, React and Typescript.

## Running the demo

```sh
npm install
npm run dev
```

## Sharing a link to a session

The agent starts a session and then shares a link with the
customer so they can join the session.

On the customer side, the web page should check for the session id
and use that to get the session:

```js
if (CobrowseIO.currentSession == null) {
    const searchParams = new URLSearchParams(window.location.search)
    const session = searchParams.get('session_id')
    if (session) {
        CobrowseIO.getSession(session);
    }
}
```

Sessions automatically expire after 15 minutes if the customer
does not join.

## Scheduling a Cobrowse session later

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
