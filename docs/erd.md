# ER図

```mermaid
erDiagram
    companies {
        bigint id PK "Treasureの運営会社"
        varchar name "名前"
        varchar image_url "画像URL"
        timestamp created_at "作成日時"
        timestamp updated_at "更新日時"
        timestamp deleted_at "削除日時"
    }

    superpower {
        bigint id PK "NFTのID"
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
        bigint id PK "カテゴリー"
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
        varchar nonce "ワンタイムトークン"
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

- Superpowerコントラクト
  - ERC721Royaltyを継承
    - ERC2981準拠
  - receiverとして運営用アドレスを設定
- デポジット用コントラクト
  - ユーザーごとにウォレットを作成
  - マネーロンダリング対策
    - 出金時にマルチシグ承認を挟む
- マーケットプレイスコントラクト
  - 購入者と出品者のマッピングはオフチェーン
  - 所有権の移転はオンチェーン(transferHoge)
    - 手数料を運営用コントラクトに送る
    - バックエンドからのみ呼び出し可能
- 操作用アドレス
    - バックエンドのサービスが使うアドレス
- 運営用アドレス
  - 手数料を受け取る
  - Superpowerの発行/譲渡

- 気になること
- 

- メタマスク認証の仕組み
- 法人(事業者)で管理するアドレス
- 
