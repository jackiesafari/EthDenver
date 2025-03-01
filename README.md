# Onchain Agent Powered by AgentKit

This is a [Next.js](https://nextjs.org) project bootstrapped with `create-onchain-agent`.  

It integrates [AgentKit](https://github.com/coinbase/agentkit) to provide AI-driven interactions with on-chain capabilities.


## Generate a private key with viem

Create a file called flow-config.ts

Generation Script to input in file
```import { http, createConfig, createWalletClient } from '@wagmi/core';
import { flowMainnet } from '@wagmi/core/chains';
import { injected } from '@wagmi/connectors';
import { privateKeyToAccount } from 'viem/accounts';

// Load private key from environment
const privateKey = process.env.PRIVATE_KEY
  ? `0x${process.env.PRIVATE_KEY}`
  : undefined;

// Create account if private key exists
const account = privateKey ? privateKeyToAccount(privateKey) : undefined;

// Public client config
export const config = createConfig({
  chains: [flowMainnet],
  connectors: [injected()],
  transports: {
    [flowMainnet.id]: http(),
  },
});

// Wallet client for signing transactions
export const walletClient = privateKey 
  ? createWalletClient({
      account,
      chain: flowMainnet,
      transport: http()
    })
  : undefined;
```

Run the script to generate a private key and account address
```bash
node flow-setup.js
```

## Getting Started

First, install dependencies:

```sh
npm install
```

Then, configure your environment variables:

```sh
mv .env.local .env
```

Run the development server:

```sh
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser to see the project.


## Configuring Your Agent

You can [modify your configuration](https://github.com/coinbase/agentkit/tree/main/typescript/agentkit#usage) of the agent. By default, your agent configuration occurs in the `/api/agent/route.ts` file.

### 1. Select Your LLM  
Modify the `ChatOpenAI` instantiation to use the model of your choice.

### 2. Select Your Wallet Provider  
AgentKit requires a **Wallet Provider** to interact with blockchain networks.

### 3. Select Your Action Providers  
Action Providers define what your agent can do. You can use built-in providers or create your own.

---

## Next Steps

- Explore the AgentKit README: [AgentKit Documentation](https://github.com/coinbase/agentkit)
- Learn more about available Wallet Providers & Action Providers.
- Experiment with custom Action Providers for your specific use case.

---

## Learn More

- [Learn more about CDP](https://docs.cdp.coinbase.com/)
- [Learn more about AgentKit](https://docs.cdp.coinbase.com/agentkit/docs/welcome)
- [Learn more about Next.js](https://nextjs.org/docs)
- [Learn more about Tailwind CSS](https://tailwindcss.com/docs)

---

## Contributing

Interested in contributing to AgentKit? Follow the contribution guide:

- [Contribution Guide](https://github.com/coinbase/agentkit/blob/main/CONTRIBUTING.md)
- Join the discussion on [Discord](https://discord.gg/CDP)
