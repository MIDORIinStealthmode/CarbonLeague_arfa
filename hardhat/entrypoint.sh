#!/bin/sh

npm install;

# Start hardhat node as a background process
npm run dev &

# Wait for hardhat node to initialize and then deploy contracts
npx wait-on http://127.0.0.1:8545 && yarn deploy:local;

sed -i "s|NEXT_PUBLIC_SUPERPOWER_ADDRESS=.*|NEXT_PUBLIC_SUPERPOWER_ADDRESS=$(cat .contract)|g" ./web/.env && \
sed -i "s|OWNER_ADDRESS=.*|OWNER_ADDRESS=$(cat .ownerAddress)|g" ./web/.env && \
sed -i "s|ADMIN_ADDRESS=.*|ADMIN_ADDRESS=$(cat .adminAddress)|g" ./web/.env;

# The hardhat node process never completes
# Waiting prevents the container from pausing
wait $!