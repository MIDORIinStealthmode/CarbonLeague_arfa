# Install

1. ThirdwebのAPIキーを取得

2. 環境変数の設定

```zsh
cp contract/.env.template contract/.env
vim contract/.env # 環境変数を入れる

cp web/.env.template web/.env.local
vim web/.env.local # 環境変数を入れる
```

3. Build&起動

```zsh
docker compose up -d
```

4. 動作確認

- http://localhost:3000にアクセスしてみる
　　- Metamask接続してみる
- コントラクトのテストを実行してみる
    ```zsh
    docker compose run hardhat npm test
    ```
- コントラクトをデプロイしてみる
    ```
    docker compose exec contract npx hardhat run --network localhost scripts/deploy.ts
    ```

## 何か困ったら

Docker周りの全ての環境を削除するコマンド

```bash
docker compose down -v --rmi all --remove-orphans
```
