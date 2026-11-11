# DEMO: node:16 is end of life on purpose (base-image freshness and OS package findings).
FROM node:16-alpine

LABEL org.opencontainers.image.title="acme-checkout-web" \
      org.opencontainers.image.description="Acme Outdoor storefront" \
      org.opencontainers.image.source="https://github.com/DwaarAI/acme-checkout-web" \
      org.opencontainers.image.vendor="Acme (Dwaar demo)"

# The AWS Lambda Web Adapter lets the same image run on Lambda and on any container host.
COPY --from=public.ecr.aws/awsguru/aws-lambda-adapter:0.8.4 /lambda-adapter /opt/extensions/lambda-adapter

WORKDIR /srv
COPY package.json package-lock.json ./
RUN npm ci --omit=dev
COPY server.js ./
COPY public ./public
ENV PORT=8080 AWS_LWA_READINESS_CHECK_PATH=/health NODE_ENV=production
EXPOSE 8080
CMD ["node", "server.js"]
