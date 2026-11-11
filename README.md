# Acme Outdoor storefront

The web front end of Acme Checkout. It serves the shop page and reads the catalogue from
[acme-checkout-api](https://github.com/DwaarAI/acme-checkout-api).

> **Dwaar demo.** Acme is fictional. This repository is part of a security demo for
> [Dwaar](https://dwaar.ai) and is **deliberately insecure**: old dependencies, an end-of-life base image,
> a planted fake secret, an insecure workflow (GitHub Actions is disabled here) and a public, unauthenticated
> function URL. Do not reuse any of it.

| Path | What |
|---|---|
| `server.js`, `public/` | Express server and the shop page |
| `Dockerfile` | Image published to `ghcr.io/dwaarai/acme-checkout-web` and Amazon ECR; runs on Lambda through the Lambda Web Adapter |
| `deploy/stack.yaml` | CloudFormation: the Lambda function and its public URL |
| `.github/workflows/build.yml` | How the image is built, pushed and deployed |

Run it locally:

```sh
docker build -t acme-checkout-web . && docker run --rm -p 8080:8080 -e API_URL=http://host.docker.internal:8081 acme-checkout-web
```
