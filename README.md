# Install

1. 

```zsh
cp backend/.env.template backend/.env
vim backend.env # 環境変数を入れる
```

2. Build

```zsh
docker compose build
```

2. Hardhat Networkの起動

```zsh
docker compose up ethereum
```

3. Metamaskの接続

https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/

