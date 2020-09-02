# DebugBear Netlify Build Plugin

This Build Plugin automatically tests each Netlify deployment with DebugBear. This allows you to see how the changes you've made affect page performance and Lighthouse scores.

You need a [DebugBear](https://www.debugbear.com) account to use this plugin.

![DebugBear build result](https://user-images.githubusercontent.com/1303660/91853352-f97a2e80-ec59-11ea-8003-51c57571b4b2.png)

## Setup

1. Install DebugBear Build Plugin

```yarn add netlify-build-plugin-debugbear```

2. Add the plugin in your netlify.toml file:

```
[[plugins]]
  package = "netlify-build-plugin-debugbear"
```

3. Set environment variables

You need to set two environment variables in your [Netlify build settings](https://docs.netlify.com/configure-builds/environment-variables/).

1. DEBUGBEAR_API_KEY – [API key for your DebugBear project](https://www.debugbear.com/docs/getting-started-api-cli)
2. DEBUGBEAR_PAGE_IDS – Comma-separated list of [page IDs](https://www.debugbear.com/docs/getting-started-api-cli#) for pages that should be tested after each deployment

![Netlify environment variables](https://user-images.githubusercontent.com/1303660/91851003-6095e400-ec56-11ea-90e2-ccced761eddb.png)

You can find the test results in the Builds tab on DebugBear, or via the links in your Netlify build logs.

![Netlify build logs](https://user-images.githubusercontent.com/1303660/91857427-cdfa4280-ec5f-11ea-9b8f-16e134f90983.png)

## Reporting build results to GitHub

Install the [DebugBear GitHub integration](https://www.debugbear.com/docs/github-integration) to create statuses on your pull requests.

Set up a [Performance budget](https://www.debugbear.com/docs/performance-budgets) to make your test finish in a pass or fail state.

![DebugBear data on GitHub](https://user-images.githubusercontent.com/1303660/91853520-36debc00-ec5a-11ea-90eb-7fb88c35e5e6.png)

