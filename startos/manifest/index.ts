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
  // No service dependencies. Inbound Tor (the .onion address) is provided by StartOS
  // itself, and outbound Tor uses the host's Tor SOCKS proxy (tor.startos:9050, set
  // in main.ts) — neither is modeled as a package dependency here.
  dependencies: {},
})
