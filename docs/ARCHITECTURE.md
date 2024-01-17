# 全体

```mermaid

flowchart LR
    運営用アドレス

    subgraph Aster
        ThirdwebWallet
        SuperpowerContract
        MarketplaceContract -- transfer --> Superpower
        Superpower
        ThirdwebWallet -- approve --> 操作用アドレス
        ThirdwebWallet -- has --> Superpower
        Superpower -- receive --> 運営用アドレス
    end

    subgraph Backend
        Nextjs -- use --> 操作用アドレス 
        Postgres
    end
    
    subgraph Client
        React
        Thirdweb -- create --> ThirdwebWallet
    end
    Postgres <-- query --> Nextjs 
    操作用アドレス -- Call Mint --> SuperpowerContract
    操作用アドレス -- NFTを動かす --> MarketplaceContract
    SuperpowerContract -- Mint --> Superpower
    Nextjs <-- call/render --> React
    React -- use --> Thirdweb
```

- マーケットプレイス
  - 買い手と売り手と金額の決定はWeb2で行いバックエンドの操作用アドレスでMarketplaceContractを操作する
  - MarketplaceContractはThirdwebWallet間でのSuperpowerの所有権の移転とAsterの移動を行う
- ThirdwebWallet
  - Thirdwebの組み込みウォレット
  - 操作用アドレスに対して所有するSuperpowerをApproveする
- Superpower
  - ERC721Royaltyを継承
    - ERC2981準拠
  - receiverとして運営用アドレスを設定
- 運営用アドレス
  - 人間が管理する
- 操作用アドレス
  - バックエンドが利用する
  - 鍵はKMSで管理

# Database

```mermaid
erDiagram
    companies {
        bigint id PK "運営会社ID"
        varchar name "名前"
        varchar image_url "画像URL"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    superpower {
        bigint id PK "NFTID"
        varchar name "名前"
        varchar rarity "レアリティ"
        varchar edition "エディションナンバー(1/100)"
        varchar image_url "画像URL"
        varchar description "説明"
        int score "スコア"
        bigint company_id FK "運営会社"

        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    categories {
        bigint id PK "カテゴリーID"
        varchar name "名前"
        varchar image_url "画像URL"
        bigint parent_id FK "親カテゴリー"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    treasure_categories {
        bigint id PK "ID"
        bigint treasure_id FK "トレジャーID"
        bigint category_id FK "カテゴリーID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    companies ||--o{ superpower: "運営会社"
    superpower ||--o{ treasure_categories: "カテゴリー"
    categories ||--o{ treasure_categories: "カテゴリー"

    users {
        bigint id PK "Metamask登録時に作成する"
        varchar ethereum_key UK "Metamaskのアドレス"
        varchar nonce "認証トークン"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    market_items {
        bigint id PK "出品"
        bigint treasure_id FK "トレジャーID"
        bigint seller_id FK "出品者ID"
        bigint purchaser_id FK "購入者ID"
        varchar price "価格"
        varchar sales_format "販売方式(オークション、即売)"
        varchar transaction_id "トランザクションID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    users ||--o{ market_items: "出品情報"

    competitions {
        bigint id PK "ID"
        varchar address "コントラクトアドレス"
        varchar name "名前"
        varchar image_url "画像URL"
        varchar description "説明"
        varchar status "ステータス"
        timestamp start_at "開始日時"
        timestamp end_at "終了日時"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    competition_entries {
        bigint id PK "ID"
        bigint competition_id FK "コンペティションID"
        bigint user_id FK "ユーザーID"
        int rank "順位"
        int score "スコア"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
    }

    competition_entry_superpower {
        bigint id PK "ID"
        bigint competition_entry_id FK "エントリーID"
        bigint treasure_id FK "トレジャーID"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    competition_rewards {
        bigint id PK "ID"
        bigint competition_id FK "コンペティションID"
        int rank "順位"
        bigint treasure_id FK "トレジャーID"
    }

    competitions ||--o{ competition_rewards: "報酬情報"
    superpower ||--o{ competition_rewards: "報酬情報"
    competitions ||--o{ competition_entries: "エントリー情報"
    competition_entries ||--o{ competition_entry_superpower: "エントリー情報"
    users ||--o{ competition_entries: "エントリー情報"
```
