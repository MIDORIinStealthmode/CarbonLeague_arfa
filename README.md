# Install

1. 環境変数の設定

```zsh
cp backend/.env.template backend/.env
vim backend.env # 環境変数を入れる

cp web/.env.template web/.env.local
vim web/.env.local # 環境変数を入れる
```

3. Build&起動

```zsh
docker compose up -d
```

5. Metamaskの接続

https://docs.metamask.io/wallet/how-to/get-started-building/run-devnet/

6. 動作確認

- http://localhost:3000にアクセスしてみる
- コントラクトのテストを実行してみる
```zsh
docker compose run contract npm test
```

## 何か困ったら

Docker周りの全ての環境を削除するコマンド

```bash
docker compose down -v --rmi all --remove-orphans
```

## RemoteContainerを利用する進め
https://zenn.dev/yumemi_inc/articles/3d327557af3554#vscode%E3%81%A7node_modules%E3%82%92%E5%8F%82%E7%85%A7%E3%81%A7%E3%81%8D%E3%81%AA%E3%81%84%E5%95%8F%E9%A1%8C%E3%82%92%E8%A7%A3%E6%B1%BA%E3%81%99%E3%82%8B
