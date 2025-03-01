import { http, createConfig, createWalletClient } from '@wagmi/core';
import { flowMainnet } from '@wagmi/core/chains';
import { injected } from '@wagmi/connectors';
import { privateKeyToAccount } from 'viem/accounts';

// Define Flow EVM chain with official parameters
const flowEVMChain = {
  id: 747,
  name: 'Flow EVM',
  network: 'flow-evm',
  nativeCurrency: {
    name: 'Flow',
    symbol: 'FLOW',
    decimals: 18,
  },
  rpcUrls: {
    default: {
      http: ['https://mainnet.evm.nodes.onflow.org'],
    },
    public: {
      http: ['https://mainnet.evm.nodes.onflow.org'],
    },
  },
  blockExplorers: {
    default: {
      name: 'FlowScan',
      url: 'https://evm.flowscan.io',
    },
  },
};

// Load private key from environment (expecting 0x prefix in .env)
const privateKey = process.env.PRIVATE_KEY || undefined;

// Create account if private key exists
const account = privateKey ? privateKeyToAccount(privateKey) : undefined;

// Public client config with correct chain parameters
export const config = createConfig({
  chains: [flowEVMChain],
  connectors: [injected()],
  transports: {
    [flowEVMChain.id]: http(),
  },
});

// Wallet client for signing transactions
export const walletClient = privateKey 
  ? createWalletClient({
      account,
      chain: flowEVMChain,
      transport: http()
    })
  : undefined;

// Export chain definition for use elsewhere
export { flowEVMChain };