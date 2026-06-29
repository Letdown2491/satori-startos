# Multi-arch image for the Satori daemon on StartOS.
#
# Build context is this repo's root (manifest images.satori.source.dockerBuild.workdir
# = '.'). Rather than vendoring Satori as a submodule, this Dockerfile clones the
# upstream source at a pinned ref so the package stays self-contained. Bump SATORI_REF
# to take a new upstream version. Pinned to a tag for reproducible builds; keep this in
# step with the package version in startos/versions/current.ts.
#
# Satori has no build step: Node runs the TypeScript directly via type-stripping, so the
# runtime only needs the production npm deps. Multi-arch is handled by the StartOS builder
# (one pass per manifest arch); node:24-alpine is a multi-arch manifest, so each arch
# builds natively.
FROM node:24-alpine

ARG SATORI_REF=v0.3.0

# git to fetch the source; tzdata so Node/ICU can resolve the TZ env (set by StartOS via
# the Timezone action) — used when parsing/formatting scheduled-post local times.
RUN apk add --no-cache git tzdata

WORKDIR /app

# Clone upstream at the pinned ref. A full clone keeps it simple and lets SATORI_REF be a
# branch, tag, or commit sha. The repo's .gitignore keeps .data and node_modules out.
RUN git clone https://github.com/Letdown2491/satori.git . \
 && git checkout "$SATORI_REF" \
 && rm -rf .git

# Runtime deps only (nostr-tools, ws, socks-proxy-agent); typescript/@types are dev-only.
RUN npm ci --omit=dev

EXPOSE 8787

# StartOS sets HOST/PORT/TOR_SOCKS/TZ (and optionally SATORI_OWNER) via the daemon env in
# startos/main.ts, which also pins cwd to /app. CMD is a fallback for direct `docker run`.
ENV HOST=0.0.0.0 PORT=8787
CMD ["node", "--experimental-strip-types", "src/server.ts"]
