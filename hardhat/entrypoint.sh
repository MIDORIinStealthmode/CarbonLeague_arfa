#!/bin/sh

npm install;

# Start hardhat node as a background process
npm run dev &

# Wait for hardhat node to initialize and then deploy contracts
npx wait-on http://127.0.0.1:8545 && yarn deploy:local;

sed -i "s|CONTRACT_ADDR=.*|CONTRACT_ADDR=$(cat .contract)|g" .env && \
sed -i "s|OWNER_ADDR=.*|OWNER_ADDR=$(cat .ownerAddress)|g" .env && \
sed -i "s|ADMIN_ADDR=.*|ADMIN_ADDR=$(cat .adminAddress)|g" .env;

# The hardhat node process never completes
# Waiting prevents the container from pausing
wait $!