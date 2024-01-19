```bash
# nodeの実行
docker compose up -d
> 

# コンテナでnodeにデプロイ
docker compose exec hardhat npx hardhat run --network localhost scripts/deploy.ts
> Lock with 0.001ETH and unlock timestamp 1705619288 deployed to 0x6dc9fd99392947c52385d4e020b6a072c9a8d1e4

```