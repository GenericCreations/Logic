import Web3 from "web3";

const getWeb3 = () => new Promise( async (resolve, reject) => {
    // Modern dapp browsers...
    // if (window.ethereum) {
    //   console.log("Using window.ethereum");
    //   window.ethereum.autoRefreshOnNetworkChange = false
    //   const web3 = new Web3(window.ethereum);
    //   try {
    //     // Request account access if needed
    //     await window.ethereum.request({ method: 'eth_requestAccounts' });
    //     // Acccounts now exposed
    //     resolve(web3);
    //   } catch (error) {
    //     reject(error);
    //   }
    // }
    // // Legacy dapp browsers...
    // else if (window.web3) {
    //   // Use Mist/MetaMask's provider.
    //   const web3 = window.web3;
    //   console.log("Using window.web3");
    //   resolve(web3);
    // }
    // // Fallback to localhost; use dev console port by default...
    // else {
    //   console.log('Using local network');
    //   const provider = new Web3.providers.HttpProvider(
    //     "http://127.0.0.1:7545"
    //   );
    //   const web3 = new Web3(provider);
    //   console.log("No web3 instance injected, using Local web3.");
    //   resolve(web3);
    // }

    console.log('Using local network');
    const provider = new Web3.providers.HttpProvider(
      "http://127.0.0.1:7545"
    );
    const web3 = new Web3(provider);
    console.log("No web3 instance injected, using Local web3.");
    resolve(web3);
  });

export default getWeb3;
