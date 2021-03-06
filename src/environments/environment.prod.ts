// `.env.ts` is generated by the `npm run env` command
import env from './.env';

export const environment = {
  production: true,
  version: env.npm_package_version,
  serverUrl: 'https://api.chucknorris.io',
  cloudWatchDomain: 'https://console.aws.amazon.com/cloudwatch/home?region=us-east-1#logEventViewer:group=',
  ecsUtilitiesUrl: 'https://ecs-utilities.preprod.amer.amway.net',
  systemActivitiesUrl: 'https://system-activities.preprod.amer.amway.net',
  kafkaUtilitiesUrl: 'http://kafka-rest-proxy-preprod.preprod.amer.amway.net',
  applyChanges: true,
  searchForceUrl: 'http://search-force.preprod.amer.amway.net',
  defaultLanguage: 'en-US',
  supportedLanguages: [
    'en-US',
    'fr-FR'
  ],
  oktaConfig: {
    issuer: 'https://amway.okta.com/oauth2/default',
    clientId: '0oa1gtlqctglEWoDc0h8',
    redirectUri: 'https://d16oqznw8ujhcj.cloudfront.net/implicit/callback'
  }
};
