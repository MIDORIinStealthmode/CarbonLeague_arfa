import { NFTMarketplace } from '@/components/ui/nftmarketplace';

export default function Home() {
  return (
    <div className="MainComponent">
      <h1 className="font-bold text-xl mb-2">Carbon League</h1>
      <p>Carbon League is a game that rewards you for supporting real-world heros reducing carbon emmisions.</p>
      <NFTMarketplace />
    </div>
  )
}
