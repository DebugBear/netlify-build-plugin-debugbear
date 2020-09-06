const { DebugBear } = require('debugbear');

const {
    DEBUGBEAR_API_KEY,
    DEBUGBEAR_PAGE_IDS,
    COMMIT_REF,
    HEAD,
    PULL_REQUEST,
    DEPLOY_URL,
    REPOSITORY_URL
} = process.env


module.exports = {
    async onSuccess({ utils }) {
        if (!DEBUGBEAR_API_KEY) {
            utils.build.failPlugin("DEBUGBEAR_API_KEY environment variable needs to be set. Learn how to generate an API key for your project here: https://www.debugbear.com/docs/getting-started-api-cli")
            return
        }
        if (!DEBUGBEAR_PAGE_IDS) {
            utils.build.failPlugin("DEBUGBEAR_PAGE_IDS environment variable needs to be set. Learn how to set find page IDs here: https://www.debugbear.com/docs/getting-started-api-cli#finding-the-page-id")
            return
        }
        if (!/^[0-9,]+$/.test(DEBUGBEAR_PAGE_IDS)) {
            utils.build.failPlugin(`DEBUGBEAR_PAGE_IDS needs to be a list of comma-separated numbers, but found '${DEBUGBEAR_PAGE_IDS}'`)
            return
        }

        const dbb = new DebugBear(DEBUGBEAR_API_KEY)
        const pageIds = DEBUGBEAR_PAGE_IDS.split(",")

        // If possible, detect GitHub repo to update pull request status if GitHub integration is installed
        let repoOwner, repoName
        if (REPOSITORY_URL && REPOSITORY_URL.startsWith("https://github.com")) {
            let matches = REPOSITORY_URL.match(/github\.com\/(.*)\/(.*)/)
            if (matches) {
                repoOwner = matches[1]
                repoName = matches[2]
                console.log(`Detected GitHub repo: ${repoOwner}/${repoName}`)
            }
        }

        let baseUrl
        if (PULL_REQUEST === "true") {
            baseUrl = DEPLOY_URL
        }
        let pageMessages = []
        try {
            await Promise.all(pageIds.map(async pageId => {
                const r = await dbb.pages.analyze(pageId, {
                    commitHash: COMMIT_REF,
                    commitBranch: HEAD,
                    channel: "netlify",
                    baseUrl,
                    repoName,
                    repoOwner
                })
                console.log(`Started DebugBear test for page ${pageId}: ${r.url}`)
                pageMessages.push(`- Page ${pageId}: ${r.url}`)
            }))
        } catch (err) {
            utils.build.failPlugin(`Triggering DebugBear test failed: ${err.message}`)
            return
        }

        utils.status.show({
            summary: `${pageIds.length} DebugBear tests in progress`,
            text: pageMessages.join("\n")
        })

        console.log("DebugBear tests are running, results will be available in a few minutes.")
    }
}