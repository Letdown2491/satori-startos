import { i18n } from './i18n'
import { sdk } from './sdk'
import { uiPort } from './utils'

// One UI interface bound to Satori's internal HTTP port. StartOS attaches all the
// external addressing itself — the Tor .onion (private, key-gated by Satori's own
// login wall) plus LAN-HTTPS — and terminates TLS at its edge, so the container
// always receives plain HTTP. There is no bundled Tor daemon for inbound access.
export const setInterfaces = sdk.setupInterfaces(async ({ effects }) => {
  const uiMulti = sdk.MultiHost.of(effects, 'ui-multi')
  const uiMultiOrigin = await uiMulti.bindPort(uiPort, {
    protocol: 'http',
  })
  const ui = sdk.createInterface(effects, {
    name: i18n('Web UI'),
    id: 'ui',
    description: i18n('The web interface of Satori'),
    type: 'ui',
    masked: false,
    schemeOverride: null,
    username: null,
    path: '',
    query: {},
  })

  const uiReceipt = await uiMultiOrigin.export([ui])

  return [uiReceipt]
})
