import { useState, useEffect } from "react";
import detectEthereumProvider from "@metamask/detect-provider";

export const LoginBox = ({}: Window) => {
  //@ts-ignore
  const [hasProvider, setHasProvider] = useState<boolean | null>(null);
  const initialState = { accounts: [] };
  //@ts-ignore
  const [wallet, setWallet] = useState(initialState);

  useEffect(() => {
    const refreshAccounts = (accounts: any) => {
      /* New */
      if (accounts.length > 0) {
        /* New */
        updateWallet(accounts); /* New */
      } else {
        /* New */
        // if length 0, user is disconnected                    /* New */
        setWallet(initialState); /* New */
      } /* New */
    }; /* New */

    const getProvider = async () => {
      const provider = await detectEthereumProvider({ silent: true });
      setHasProvider(Boolean(provider));

      if (provider) {
        /* New */
        //@ts-ignore
        const accounts = await window.ethereum.request(
          /* New */
          { method: "eth_accounts" } /* New */
        ); /* New */
        refreshAccounts(accounts); /* New */
        //@ts-ignore
        window.ethereum.on("accountsChanged", refreshAccounts); /* New */
      } /* New */
    };

    getProvider();
    return () => {
      /* New */
      //@ts-ignore
      window.ethereum?.removeListener("accountsChanged", refreshAccounts);
    }; /* New */
  }, []);

  const updateWallet = async (accounts: any) => {
    setWallet({ accounts });
  };

  const handleConnect = async () => {
    //@ts-ignore
    let accounts = await window.ethereum.request({
      method: "eth_requestAccounts",
    });
    updateWallet(accounts);
  };

  return (
    <>
      <div className="w-72 bg-[#B7D9F2] flex flex-col items-center rounded-md bg-opacity-80">
        <span className="text-gray-900 font-roboto font-semibold text-2xl pt-4 underline underline-offset-2">
          Sign In
        </span>
        <span className="w-4/5 font-roboto text-center pt-8">
          Signup with your metamask wallet and create turn your stories into
          NFTs
        </span>
        <div className="py-8">
          <button
            onClick={handleConnect}
            className="bg-white text-black font-poppins font-semibold px-4 py-2 rounded-md"
          >
            {wallet.accounts.length > 0
              ? //@ts-ignore
                wallet.accounts[0].substring(0, 15)
              : "Connect Wallet"}
          </button>
        </div>
      </div>
    </>
  );
};
