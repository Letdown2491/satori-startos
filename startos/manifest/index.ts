import { setupManifest } from '@start9labs/start-sdk'
import { long, short } from './i18n'

export const manifest = setupManifest({
  id: 'satori',
  title: 'Satori',
  license: 'MIT',
  packageRepo: 'https://github.com/Letdown2491/satori-startos',
  upstreamRepo: 'https://github.com/Letdown2491/satori',
  marketingUrl: 'https://github.com/Letdown2491/satori',
  donationUrl: null,
  description: { short, long },
  volumes: ['main'],
  images: {
    satori: {
      // Built from Satori's source, which the Dockerfile clones from the upstream
      // repo at a pinned ref (see ./Dockerfile, ARG SATORI_REF). The build context
      // is this repo's root, so there is no submodule to keep in sync — bump the
      // ref in the Dockerfile to take a new upstream version.
      source: {
        dockerBuild: {
          workdir: '.',
          dockerfile: './Dockerfile',
        },
      },
      arch: ['x86_64', 'aarch64'],
    },
  },
  alerts: {
    install: null,
    update: null,
    uninstall: null,
    restore: null,
    start: null,
    stop: null,
  },
  // Tor is required. In StartOS 0.4.0 Tor is a service (package id `tor`), and Satori
  // needs it both ways: StartOS publishes Satori's private .onion through it, and Satori
  // routes its own outbound traffic (.onion relays + Privacy Mode) through Tor's SOCKS
  // proxy at `tor.startos:9050` (set in main.ts — `tor.startos` is this dependency's
  // internal address). `optional: false` makes it a hard requirement shown in the UI;
  // the runtime requirement (kind/versionRange) lives in dependencies.ts. `s9pk: null`
  // sources Tor's title/icon from its registry package.
  dependencies: {
    tor: {
      description:
        'Publishes Satori as a private .onion service and provides the SOCKS proxy ' +
        'Satori uses to reach .onion relays and route Privacy Mode traffic.',
      optional: false,
      s9pk: null,
    },
  },
})
