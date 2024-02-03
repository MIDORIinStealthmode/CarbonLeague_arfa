import React from 'react';
import './NFTMarketplace.css'; // Make sure to create a corresponding CSS file to style your components

// Mock data for NFT items
const nfts = [
  { id: 1, title: 'Carbon offset project', price: '9.99', image: '../../public/next.svg' },
  { id: 2, title: 'Ocean conservation', price: '9.99', image: '../../public/next.svg' },
  { id: 3, title: 'Protect wildlife habitats', price: '9.99', image: '../../public/next.svg' },
  // Add more NFT items here
];

// NFT Card Component
const NFTCard = ({ nft }) => (
  <div className="nft-card">
    <img src={nft.image} alt={nft.title} />
    <h3>{nft.title}</h3>
    <p>${nft.price}</p>
    <button>Add to favorites</button>
  </div>
);

// NFT Marketplace Component
const NFTMarketplace = () => (
  <div className="nft-marketplace">
    <h2>Trending NFTs</h2>
    <div className="nft-grid">
      {nfts.map(nft => (
        <NFTCard key={nft.id} nft={nft} />
      ))}
    </div>
  </div>
);

export default NFTMarketplace;
