# NFT Dutch Auction Project

A decentralized Dutch auction platform for NFTs built with **Hardhat**, **TypeScript**, and **Wagmi**. This project implements a descending price auction mechanism where NFT prices start high and decrease over time until a buyer purchases the item.

## Project Structure

### Root Directory

```
auction/
├── artifacts/                 # Compiled contract artifacts
├── cache/                    # Hardhat compilation cache
├── contracts/                # Solidity smart contracts
│   ├── Auction.sol          # Main Dutch auction contract
│   └── PrizeNFT.sol         # ERC721 NFT contract for auction items
├── coverage/                 # Test coverage reports
├── frontend/                 # React/Next.js frontend application
├── node_modules/             # Project dependencies
├── scripts/                  # Deployment and utility scripts
│   ├── deploy.ts            # Contract deployment script
│   └── saveFrontend.ts      # Frontend artifact saving script
├── test/                     # Test suite
│   ├── Auction.ts           # Auction contract tests
│   └── PrizeNFT.ts          # NFT contract tests
├── typechain-types/          # TypeScript type definitions
├── coverage.json            # Coverage configuration
├── hardhat.config.ts        # Hardhat configuration
├── package-lock.json        # NPM lock file
├── package.json             # Project dependencies
├── README.md                # Project documentation
└── tsconfig.json           # TypeScript configuration
```

### Frontend Structure

```
frontend/
├── next/                    # Next.js framework files
├── node_modules/           # Frontend dependencies
├── public/                 # Static assets
└── src/
    ├── app/                # Next.js app router pages
    ├── components/         # Reusable React components
    ├── config/             # Application configuration
    ├── constants/          # Constant values and enums
    ├── contracts/          # Contract ABIs and addresses
    ├── lib/                # Utility libraries
    ├── queries/            # React Query hooks
    ├── services/           # API and external services
    ├── types/              # TypeScript type definitions
    ├── utils/              # Utility functions
    └── .env                # Frontend environment variables
```

## ✨ Features

- **Dutch Auction Mechanism**: Descending price auctions with automatic price reduction
- **ERC721 NFT Support**: Compatible with standard NFT contracts
- **Gas Optimization**: Efficient contract design for minimal transaction costs
- **Refund System**: Automatic refunds for overpayments
- **Security**: Protection against common vulnerabilities and exploits
- **React Frontend**: Modern UI with Wagmi integration for wallet connectivity
- **Multi-Network Support**: Deployable to local, testnet, and mainnet environments

## 🛠️ Prerequisites

- **Node.js** >= 18.x
- **Yarn** or **npm**
- **MetaMask** or another EVM-compatible wallet
- **Hardhat** development environment

## 📦 Installation

```bash
# Install root dependencies
npm install

# Install frontend dependencies
cd frontend
npm install
```

## 🔧 Configuration

### Frontend Environment (frontend/.env)

```env
NEXT_PUBLIC_WALLET_CONNECT_ID=your-wallet-connect-id
NEXT_PUBLIC_IPFS_GATEWAY=https://gateway.pinata.cloud/ipfs

PINATA_API_KEY=your-pinata-api-key
PINATA_API_SECRET=your-pinata-api-secret
PINATA_URL=https://api.pinata.cloud
```

### Root Environment (.env)

```env
INFURA_PROJECT_ID=your-project-id
PRIVATE_KEY=your-private-key-here
```

### Hardhat Configuration (hardhat.config.ts)

Configure networks directly in the config file:

```typescript
import { HardhatUserConfig } from "hardhat/config";

const config: HardhatUserConfig = {
  networks: {
    localhost: {
      url: "http://127.0.0.1:8545",
      chainId: 31337,
    },
    sepolia: {
      url: "https://sepolia.infura.io/v3/your-project-id", // Add your Infura/Alchemy URL
      accounts: ["your-private-key-here"], // Add your wallet private key
      chainId: 11155111,
    },
  },
};
```

## 🏭 Compile Contracts

```bash
npm run compile
```

## 🚀 Deployment

### Local Development Network

```bash
# Start local Hardhat node
npx hardhat node

# Deploy contracts to local network (in separate terminal)
npx hardhat run scripts/deploy.ts --network localhost
```

### Sepolia Testnet

```bash
# Deploy to Sepolia
npx hardhat run scripts/deploy.ts --network sepolia
```

## 🧪 Testing

```bash
# Run tests
npm run test

# Run tests with gas reporting
REPORT_GAS=true npm run test

# Run specific test files
npm run test test/Auction.ts
npm run test test/PrizeNFT.ts
```

### Test Coverage

- ✅ Auction creation and configuration
- ✅ NFT purchase functionality
- ✅ Automatic refund system
- ✅ Security protections
- ✅ Auction ending and fund withdrawal
- ✅ Price decay mechanism

## 🌐 Frontend Application

### Start Development Server

```bash
cd frontend
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Frontend Features

- **Wallet Connectivity**: MetaMask, WalletConnect, Coinbase Wallet
- **Auction Browsing**: Real-time pricing and active auctions
- **NFT Metadata**: IPFS integration for NFT images and data
- **Bid Management**: Easy auction participation interface

## 📖 Usage Guide

### Creating an Auction

    1. Deploy NFT contract (if needed)
    2. Approve auction contract to transfer NFTs
    3. Call `createAuction` with parameters:
    - `startPrice`: Initial price (wei)
    - `duration`: Auction duration (seconds)
    - `nftAddress`: NFT contract address
    - `tokenId`: NFT token ID
    - `tokenURI`: NFT token URI

### Participating in Auction

    1. Connect wallet to frontend
    2. Browse active auctions
    3. View current price and bid
    4. Receive NFT instantly upon purchase
    5. Get automatic refund for overpayment

## 🔒 Security Features

- Reentrancy protection
- Access control
- Input validation
- Overflow protection
- Emergency stoppage

## 📊 Gas Optimization

- Minimal storage operations
- Efficient event emission
- Optimized price calculations

## 🛣️ Roadmap

- [ ] Multi-item auctions
- [ ] Reserve price functionality
- [ ] Auction extensions
- [ ] Advanced bidding strategies
- [ ] Mobile application
- [ ] Cross-chain compatibility

## 🤝 Contributing

Contributions welcome! Please follow standard contributing guidelines.

## 📄 License

MIT License - see LICENSE file for details.

## 🆘 Support

    1. Check documentation
    2. Search existing issues
    3. Create new issue with details

## 🙏 Acknowledgments

- Hardhat team
- Wagmi team
- OpenZeppelin
- Ethereum community

---

**Disclaimer**: For educational purposes only. Conduct security audits before production use.
