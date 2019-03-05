# Gatsby Source Github Feed

[![npm version](https://badge.fury.io/js/gatsby-source-github-feed.svg)](https://badge.fury.io/js/gatsby-source-github-feed)

Source plugin for pulling data into Gatsby from RSS feed.

## Install

```bash
npm install --save gatsby-source-github-feed
```

or

```bash
yarn add gatsby-source-github-feed
```

## How to use

```js
// In your gatsby-config.js
module.exports = {
  plugins: [
    {
      resolve: `gatsby-source-github-feed`,
      options: {
        profile: `gregorskii`,
        name: `GithubProfile`,
      }
    }
  ]
}
```

## How to query

Query is `Feed${name}`.

When name of options is `GithubProfile`, query named as `FeedGithubProfile`.

```graphql
query allFeedGithubProfile {
    allFeedGithubProfile {
      edges {
        node {
          id
          type
          actor {
            display_login
            avatar_url
          }
          repo {
            name
            url
          }
          payload {
            action
            issue {
              title
              body
            }
          }
        }
      }
    }
```

TODO:

Authentication option