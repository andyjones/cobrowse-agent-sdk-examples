# Cobrowse.io Agent SDK Examples

Full documentation available at https://docs.cobrowse.io/agent-side-integrations/agent-sdk.

## Overview

Our Agent API can be used to build 100% customized agent-side integrations into your own products and services.

## Live demo links

- [Agent JS API Demo Page](https://cobrowseio.github.io/cobrowse-agent-sdk-examples/react-example/)
- [Custom Agent Demo Page](https://cobrowseio.github.io/cobrowse-agent-sdk-examples/custom-agent-demo/)

## React Components Example

Our [React example](https://cobrowseio.github.io/cobrowse-agent-sdk-examples/react-example/) demonstrates custom widgets to show how you can completely customize your Cobrowse.io experience. [Read more](./react-example) about how to run this example.


## Custom Agent Demo

Our [custom agent demo](https://cobrowseio.github.io/cobrowse-agent-sdk-examples/custom-agent-demo/) allows you to view and interact with a completely replaced agent user interface. [Read more](./custom-agent-demo) about how to run this example.

## Custom CRM (TypeScript)
A custom CRM showcasing how Cobrowse can easily be added into your own CRM or single pane of glass.

## Agent Present

Our [Agent Present demo](https://cobrowseio.github.io/cobrowse-agent-sdk-examples/agent-present/) demonstrates how to provide your own UI for the agent present mode.

#### Setup

To run this demo please clone this repo or download [this file](https://cobrowseio.github.io/cobrowse-agent-sdk-examples/agent-present/index.html) and make the edits below.

1. Add your own license key to line 16.
2. Add an agent JWT generated using your public and private key pair.
3. Replace the partial private key seen on line 91 with your private key. WE DO NOT RECOMMEND COMMITING YOUR PRIVATE KEY. THIS IS ONLY FOR DEMO PURPOSES.

With those changes made you can now launch the agent present demo.

#### Running the demo

1. Open the `index.html` page in your browser that can be found in the `agent-present` folder.
2. Copy the present URL and open in a new tab.
3. Click the *Share my desktop* button and choose what to present.
4. See the agents screen now presented to the viewer in the tab that was opened in step 2.

## Recording Samples

In [recordings](recordings/) you can find useful scripts to programatically download or delete session recordings from your account.

## Add custom data to session

The example seen in [custom-data/index.html](custom-data/index.html) requires an Agent JWT Token to be passed as the `token` query parameter. Once set the dashboard should load and allow custom data to be added or deleted to an active session.

### To add custom data

Start a Cobrowse session and use the key and value input fields and click **Apply**.

### To remove custom data

Hover over the key you wish to delete and click the delete button.

## Questions?
Any questions at all? Please email us directly at [hello@cobrowse.io](mailto:hello@cobrowse.io).
