import React, { createContext, useContext, useState, ReactNode, useCallback } from 'react';
import { toast } from 'sonner';

interface WalletContextType {
  connected: boolean;
  connecting: boolean;
  address: string | null;
  connect: () => Promise<void>;
  disconnect: () => void;
  shortAddress: string | null;
}

const WalletContext = createContext<WalletContextType | undefined>(undefined);

// Simulated wallet for demo purposes
const DEMO_ADDRESSES = [
  '7xKXtg2CW87d97TXJSDpbD5jBkheTqA83TZRuJosgAsU',
  '9WzDXwBbmPEi4GBqNmhLkjzE7sXZKWsv8Y2Xp6K3DHGY',
  'DYw8jCTfwHNRJhhmFcbXvVDTqWMEVFBX6ZKUmG5CNSKK',
];

export function WalletProvider({ children }: { children: ReactNode }) {
  const [connected, setConnected] = useState(false);
  const [connecting, setConnecting] = useState(false);
  const [address, setAddress] = useState<string | null>(null);

  const connect = useCallback(async () => {
    setConnecting(true);
    
    // Simulate wallet connection delay
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    // For demo, randomly select an address
    const randomAddress = DEMO_ADDRESSES[Math.floor(Math.random() * DEMO_ADDRESSES.length)];
    
    setAddress(randomAddress);
    setConnected(true);
    setConnecting(false);
    
    toast.success('Wallet Connected! 🎉', {
      description: `Connected to ${randomAddress.slice(0, 8)}...${randomAddress.slice(-4)}`,
    });
  }, []);

  const disconnect = useCallback(() => {
    setConnected(false);
    setAddress(null);
    toast.info('Wallet disconnected');
  }, []);

  const shortAddress = address 
    ? `${address.slice(0, 8)}...${address.slice(-4)}`
    : null;

  return (
    <WalletContext.Provider
      value={{
        connected,
        connecting,
        address,
        connect,
        disconnect,
        shortAddress,
      }}
    >
      {children}
    </WalletContext.Provider>
  );
}

export function useWallet() {
  const context = useContext(WalletContext);
  if (context === undefined) {
    throw new Error('useWallet must be used within a WalletProvider');
  }
  return context;
}
