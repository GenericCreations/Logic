import React, { useState } from "react";
import SimpleStorageContract from "../contracts/SimpleStorage.json";
import getWeb3 from "../getWeb3";
import dotsLoading from "./Imgs/dotsLoading.gif";

import "../Style/style.css";

const App = (props) => { // .c available
  const [ v , setV ] = useState(null);
  const [ loading, setLoading ] = useState(false);

  window.onload = async () => {
    console.log('window loaded ... ');
    console.log('fetching contract ... ');
    try {
      props.c.web3 = await getWeb3();
      props.c.users.accounts = await props.c.web3.eth.getAccounts();
      props.c.users.activeAccount = props.c.users.accounts[0];
      const networkId = await props.c.web3.eth.net.getId();
      const deployedNetwork = SimpleStorageContract.networks[networkId];
      props.c.contract = new props.c.web3.eth.Contract(
        SimpleStorageContract.abi,
        deployedNetwork && deployedNetwork.address,
      );
    } catch (error) {
      // Catch any errors for any of the above operations.
      console.log(
        `Failed to load web3, accounts, or contract. Check console for details.`,
      );
      console.error(error);
    }

    setV(await props.c.contract.methods.storedData().call());
  }

  const updated = () => {
    return (
      <div className="UserInput">
        <input id="newValInput" type="text" placeholder="Modify Value"/>
        <input type="button" value="Set" onClick={ async () => {
            setLoading(true);
            const i = document.getElementById('newValInput');
            const v = i.value ? Number(i.value) : null;
            if(v <= 0 || v >= 100000000000000000000|| typeof(v) != 'number' ){
              throw 'Must enter a valid number';
            }

            await props.c.contract.methods.set(v).send({from:props.c.users.activeAccount}).then( async r => {
              const cost = r.cumulativeGasUsed ?( await props.c.macros.evalCost(r.cumulativeGasUsed)).gasCost_usd : 'Txn Failure';
              console.log('cost: $',Number(cost.toFixed(3)));
              console.log(r.cumulativeGasUsed);
            });
            let d = await props.c.contract.methods.storedData().call().then( r => {
              return Number(r.toString());
            })
            setV(d);
            setLoading(false);
          }}/>
      </div>
    )
  }
  const updating = () => {
    return (
      <div className="UserInput">
        <img src={dotsLoading} alt="loading..."/>
      </div>
    )
  }
  const showThis = loading ? updating() : updated();

  return (
    <div className="App">
      <h1>Heart is beating</h1>
      <div>The stored value is: {v}</div>
      {showThis}
    </div>
  )
}

// class App extends Component {
//   const [c,setC] = useState(null);
//   state = { storageValue: 0, web3: null, accounts: null, contract: null };
//
  // componentDidMount = async () => {
  //   try {
  //     const web3 = await getWeb3();
  //     const accounts = await web3.eth.getAccounts();
  //     const networkId = await web3.eth.net.getId();
  //     const deployedNetwork = SimpleStorageContract.networks[networkId];
  //     const instance = new web3.eth.Contract(
  //       SimpleStorageContract.abi,
  //       deployedNetwork && deployedNetwork.address,
  //     );
  //
  //     // Set web3, accounts, and contract to the state, and then proceed with an
  //     // example of interacting with the contract's methods.
  //     this.setState({ web3, accounts, contract: instance }, this.runExample);
  //   } catch (error) {
  //     // Catch any errors for any of the above operations.
  //     console.log(
  //       `Failed to load web3, accounts, or contract. Check console for details.`,
  //     );
  //     console.error(error);
  //   }
  // };
//   runExample = async () => {
//     const { accounts, contract } = this.state;
//
//     // Stores a given value, 5 by default.
//     await contract.methods.set(5).send({ from: accounts[0] });
//
//     // Get the value from the contract to prove it worked.
//     const response = await contract.methods.get().call();
//
//     // Update state with the result.
//     this.setState({ storageValue: response });
//   };
//
//   render() {
//     if (!this.state.web3) {
//       return <div>Loading Web3, accounts, and contract...</div>;
//     }
//     return (
//       <div className="App">
//         <h1>Good to Go!</h1>
//         <p>Your Truffle Box is installed and ready.</p>
//         <h2>Smart Contract Example</h2>
//         <p>
//           If your contracts compiled and migrated successfully, below will show
//           a stored value of 5 (by default).
//         </p>
//         <p>
//           Try changing the value stored on <strong>line 40</strong> of App.js.
//         </p>
//         <div>The stored value is: {this.state.storageValue}</div>
//       </div>
//     );
//   }
// }

export default App;
