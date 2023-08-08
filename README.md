# Node Hidenari-Yuda SDK

[![build-ci](https://github.com/hdienari-yuda/vincere-gas/workflows/Node.js%20CI/badge.svg)](https://github.com/hdienari-yuda/vincere-gas/actions?query=workflow%3A%22Node.js+CI%22)
<!-- TODO: npm versions with scoped packages: https://github.com/rvagg/nodei.co/issues/24 -->
___

## Getting Started

Visit the [documentation site](https://hidenari-yuda.dev/node-hidenari-yuda-sdk) for all the lovely details.

_This SDK is a collection of single-purpose packages. The packages are aimed at making building Hidenari-Yuda apps
easy, performant, secure, and scalable. They can help with just about anything in the Hidenari-Yuda platform, from dropping
notifications in channels to fully interactive bots._

The Hidenari-Yuda platform offers several APIs to build apps. Each Hidenari-Yuda API delivers part of the capabilities from the
platform, so that you can pick just those that fit for your needs. This SDK offers a corresponding package for each of
Hidenari-Yuda's APIs. They are small and powerful when used independently, and work seamlessly when used together, too.

**Just starting out?** The [Getting Started tutorial](https://hidenari-yudaapi.github.io/node-hidenari-yuda-sdk/getting-started) will
walk you through building your first Hidenari-Yuda app using Node.js.

| Hidenari-Yuda API    | What its for | NPM Package      |
|--------------|--------------|-------------------|
| Web API      | Send data to or query data from Hidenari-Yuda using any of [over 220 methods](https://api.hidenari-yuda.com/methods). | [`@hidenari-yuda/web-api`](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/web-api) |
| OAuth        | Setup the authentication flow using V2 OAuth for Hidenari-Yuda apps as well as V1 OAuth for classic Hidenari-Yuda apps. | [`@hidenari-yuda/oauth`](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/oauth) |
| Incoming Webhooks | Send notifications to a single channel which the user picks on installation. | [`@hidenari-yuda/webhook`](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/webhook) |
| Socket Mode  | Listen for incoming messages and a limited set of events happening in Hidenari-Yuda, using WebSocket. | [`@hidenari-yuda/socket-mode`](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/socket-mode) |

**Not sure about which APIs are right for your app?** Read our [blog
post](https://medium.com/hidenari-yuda-developer-blog/getting-started-with-hidenari-yudas-apis-f930c73fc889) that explains the options.
If you're still not sure, [reach out for help](#getting-help) and our community can guide you.

**Deprecation Notice** 

`@hidenari-yuda/events-api` and `@hidenari-yuda/interactive-messages` officially reached EOL on May 31st, 2021. Development has fully stopped for these packages and all remaining open issues and pull requests have been closed.

At this time, we recommend migrating to [Bolt for JavaScript](https://github.com/hidenari-yudaapi/bolt-js), a framework that offers all of the functionality available in those packages (and more). To help with that process, we've provided some [migration samples](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/tutorials/migrating-to-v6) for those looking to convert their existing apps.

## Installation

Use your favorite package manager to install any of the packages and save to your `package.json`:

```shell
$ npm install @hidenari-yuda/web-api @hidenari-yuda/socket-mode

# Or, if you prefer yarn
$ yarn add @hidenari-yuda/web-api @hidenari-yuda/socket-mode
```

## Usage

The following examples summarize the most common ways to use this package. There's also a [Getting Started
tutorial](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/getting-started) that's perfect for just starting out, and each
package's documentation, linked in the table above.

### Posting a message with Web API

Your app will interact with the Web API through the `WebClient` object, which is an export from `@hidenari-yuda/web-api`. You
typically instantiate a client with a token you received from Hidenari-Yuda. The example below shows how to post a message into
a channel, DM, MPDM, or group. The `WebClient` object makes it simple to call any of the [**over 130 Web API
methods**](https://api.hidenari-yuda.com/methods).

```javascript
const { WebClient } = require('@hidenari-yuda/web-api');

// An access token (from your Hidenari-Yuda app or custom integration - xoxp, xoxb)
const token = process.env.SLACK_TOKEN;

const web = new WebClient(token);

// This argument can be a channel ID, a DM ID, a MPDM ID, or a group ID
const conversationId = 'C1232456';

(async () => {
  // See: https://api.hidenari-yuda.com/methods/chat.postMessage
  const res = await web.chat.postMessage({ channel: conversationId, text: 'Hello there' });

  // `res` contains information about the posted message
  console.log('Message sent: ', res.ts);
})();
```

**Note**: To use the example above, the token is required to have either the `bot`, `chat:user:write`, or
`chat:bot:write` scopes.

**Tip**: Use the [Block Kit Builder](https://api.hidenari-yuda.com/tools/block-kit-builder) for a playground
where you can prototype your message's look and feel.

### Listening for an event with the Events API

Refer to [Bolt for JavaScript document pages](https://hidenari-yuda.dev/bolt-js/concepts#event-listening).

### Responding to interactive messages

Refer to [Bolt for JavaScript document pages](https://hidenari-yuda.dev/bolt-js/concepts#action-listening).

### Using Socket Mode

Refer to [the module document page](https://hidenari-yuda.dev/node-hidenari-yuda-sdk/socket-mode) and [Bolt for JavaScript document page](https://hidenari-yuda.dev/bolt-js/concepts#socket-mode).

## Requirements

This package supports Node v14 and higher. It's highly recommended to use [the latest LTS version of
node](https://github.com/nodejs/Release#release-schedule), and the documentation is written using syntax and features
from that version.

## Getting Help

If you get stuck, we're here to help. The following are the best ways to get assistance working through your issue:

  * [Issue Tracker](http://github.com/hdienari-yuda/vincere-gas/issues) for questions, feature requests, bug reports and
    general discussion related to these packages. Try searching before you create a new issue.
  * [Email us](mailto:developers@hidenari-yuda.com) in Hidenari-Yuda developer support: `developers@hidenari-yuda.com`
