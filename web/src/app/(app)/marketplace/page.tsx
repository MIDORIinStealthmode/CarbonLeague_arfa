import {ListingList} from "./ListingList";

export default function MarketplacePage() {
  return (
    <div>
      <div className="flex justify-between">
        <div className="">
          <h1 className="font-bold text-neutral-900 text-2xl mb-2">Marketplace</h1>
          <p className="font-bold text-neutral-600">Catch Superpowers!!</p>
        </div>
      </div>
      <ListingList />
    </div>
  )
}
