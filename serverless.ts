import type { AWS } from "@serverless/typescript";

import graphql from "@functions/graphql";

const serverlessConfiguration: AWS = {
  service: "aws-nodejs-typscript-graphql-serverless",
  frameworkVersion: "2",
  custom: {
    webpack: {
      webpackConfig: "webpack.config.js",
      keepOutputDirectory: true,
      includeModules: {
        forceExclude: [".prisma", "aws-sdk"],
      },
      packagerOptions: {
        scripts: [
          "find ./node_modules/.prisma/client -type f -not -name 'query-engine-rhel-*' -name 'query-engine-*' -delete",
        ],
      },
    },
  },
  plugins: ["serverless-webpack", "serverless-offline"],
  provider: {
    name: "aws",
    runtime: "nodejs14.x",
    apiGateway: {
      minimumCompressionSize: 1024,
      shouldStartNameWithService: true,
    },
    environment: {
      AWS_NODEJS_CONNECTION_REUSE_ENABLED: "1",
    },
    lambdaHashingVersion: "20201221",
  },

  functions: { graphql },
};

module.exports = serverlessConfiguration;
