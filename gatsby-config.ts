import type { GatsbyConfig } from "gatsby";
import path from "path";
import { config } from "dotenv";

config({
  path: `.env.${process.env.NODE_ENV}`,
});

const gatsbyConfig: GatsbyConfig = {
  flags: {
    DEV_SSR: true,
  },
  siteMetadata: {
    title: `stimulsoft-issue`,
    siteUrl: `https://www.yourdomain.tld`,
  },
  // More easily incorporate content into your pages through automatic TypeScript type generation and better GraphQL IntelliSense.
  // If you use VSCode you can also use the GraphQL plugin
  // Learn more at: https://gatsby.dev/graphql-typegen
  graphqlTypegen: true,
  plugins: [
    {
      resolve: `gatsby-plugin-gatsby-cloud`,
      options: {
        headers: {
          "/*": [`Referrer-Policy: strict-origin`],
        },
      },
    },
    {
      resolve: `gatsby-source-filesystem`,
      options: {
        name: `images`,
        path: path.resolve(`./src/images`),
      },
    },
    `gatsby-transformer-sharp`,
    `gatsby-plugin-sharp`,
  ],
};

export default gatsbyConfig;
