import React from 'react';
import './NFTMarketplace.css'; // Make sure to create a corresponding CSS file to style your components


// Mock data for NFT items
const nfts = [
  { id: 1, title: 'NIKE SuperGreen', price: '9.99', image: 'NIKE_sample.png', description: 'Made with super light fiber with less CO2 emissions. Only 250 available.'},
  { id: 2, title: 'A Wildlife Supersuits', price: '9.99', image: 'Patagonia_sample.png', description:'A warm jacket that can sustain at top of Mount Everest' },
  { id: 3, title: 'Kiss the Sky', price: '9.99', image: 'ANA_sample.webp', description : 'A ticket to the sky with ANA' },
  // Add more NFT items here
];

// NFT Card Component
const NFTCard = ({ nft }) => (
  <div className="max-w-sm rounded overflow-hidden shadow-lg">
    <img src={nft.image} alt={nft.title} />
    <div className="px-6 py-4">
      <div className="font-bold text-xl mb-2">{nft.title}</div>
      <p className="text-gray-700 text-base">
      {nft.description}
    </p>
    <p>${nft.price}</p>
    </div>
    <div className="px-6 pt-4 pb-2">
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Nike</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#2022</span>
    <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">#Travel</span>
  </div>
  </div>
);


// NFT Marketplace Component
const NFTMarketplace = () => (
  <div className="nft-marketplace">
    <h2 className="font-bold text-xl mb-2">Trending NFTs</h2>
    <div className="nft-grid">
      {nfts.map(nft => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  </div>
);



export default NFTMarketplace;
