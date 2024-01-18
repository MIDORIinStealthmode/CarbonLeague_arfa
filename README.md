# Install

1. 環境変数の設定

```zsh
cp backend/.env.template backend/.env
vim backend.env # 環境変数を入れる
```

3. Build

```zsh
docker compose build
```

4. Hardhat Networkの起動

```zsh
docker compose up ethereum
```

5. Metamaskの接続

https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/

6. Testの実行

```zsh
docker compose run backend npm test
```

## 何か困ったら

Docker周りの全ての環境を削除するコマンド

```bash
docker compose down -v -rmi all --remove-orphans
```

