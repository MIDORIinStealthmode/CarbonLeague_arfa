import React from 'react';
import './NFTMarketplace.css'; // Make sure to create a corresponding CSS file to style your components


// Mock data for NFT items
const nfts = [
  { id: 1, title: 'NIKE SuperGreen', price: '21.99', image: 'NIKE_sample.png', description: 'Made with super light fiber with less CO2 emissions. Only 250 available.', hashtag: ['Nike', '2022', 'Sports']},
  { id: 2, title: 'A Wildlife Supersuits', price: '40.99', image: 'Patagonia_sample.png', description:'A warm jacket that can sustain at top of Mount Everest', hashtag: ['Patagonia', '2022', 'Camp']},
  { id: 3, title: 'Kiss the Sky', price: '30.99', image: 'ANA_sample.webp', description : 'A ticket to the sky with ANA', hashtag: ['ANA', '2022', 'Travel']},
  { id: 4, title: 'EcoFuturist: The Urban Harmony', price: '60.99', image: 'TESLA_sample.webp', description : 'A cyberpunk mobility option in the suburbs', hashtag: ['Tesla', '2020', 'Car']},
  { id: 5, title: 'The ePhone', price: '60.99', image: 'Apple_sample.webp', description : ' Epitomizes environmental friendliness with its advanced, energy-efficient design', hashtag: ['Apple', '2023', 'Phone']},
  { id: 6, title: 'Gap Revival', price: '30.99', image: 'Gap_sample.webp', description : ' Hoody redifining lifestyle', hashtag: ['Gap', '2023', 'Apparel']},
  { id: 7, title: 'The Frontier', price: '120.99', image: 'Snowpeak_sample.webp', description : 'Where high-tech meets the great outdoors', hashtag: ['Snowpeak', '2023', 'Camp']},
  { id: 8, title: 'EcoVelocity Express', price: '80.99', image: 'JReast_sample.webp', description : 'Merging Speed with environmental stewardship', hashtag: ['JREast', '2023', 'Mobility']}
  // Add more NFT items here
];

// NFT Card Component
// @ts-ignore
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
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{nft.hashtag[0]}</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{nft.hashtag[1]}</span>
      <span className="inline-block bg-gray-200 rounded-full px-3 py-1 text-sm font-semibold text-gray-700 mr-2 mb-2">{nft.hashtag[2]}</span>
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
