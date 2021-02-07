import React from 'react';
import ReactDOM from 'react-dom';
import './Style/style.css';
import App from './Components/App.js';
import * as serviceWorker from './serviceWorker';

const connection = {
  web3: null,
  contract: null,
  mask:true,
  users:{
    accounts: null,
    activeAccount:null,
  },
  macros:{
    formatAddy: (strng) => {
      let string;
      if(typeof strng !== 'string')
        string = strng.toString()
      else {string = strng}
      let formattedString = string.slice(0,4)+' ... '+(string.slice(-4))
      return formattedString
    },
    addCommaFormat: (num) => { // returns string
      let nn,run,index,check;
      let remainder = false;
      let n = num.toString();
      let i = n.indexOf('.')
      if(i > -1){
        remainder = n.slice(i+1)
        n = n.slice(0,i)
      }
      let iterate = n.length/3;
      check = Number(n.slice(0,3))
      if(n.length <= 3){
        if(remainder)
          n+=('.'+remainder);
        return n;
      }
      else if(check < 2 && check >= 1){
        console.log('Bring num in as a string *** ');
        return 111;
      }
      else if(iterate >= 1.3){
        run = 1;
        index = -3;
        nn = ',' + n.slice(index)
        iterate = iterate - 1;
      }
      else{ return false }

      while(iterate >= 1.3){
        run++;
        index = -3*run
        nn = ',' + n.slice(index,index+3) + nn
        iterate = iterate - 1
      }
      if(iterate >= .3){
        nn =  n.slice(0,Math.round(iterate*3)) + nn
      }
      if(remainder) nn += ('.'+remainder);

      return nn
    },
    getGasPrice: async () => {
      let Data;
      await fetch('https://ethgasstation.info/api/ethgasAPI.json?api-key=cf73897050eacb3922b5fd8c72e8732e1632cdb4dc5b5595b515b8dac183')
        .then(response => response.json())
        .then(data => Data = data)
        .catch((e) => {
          console.log('Could not connect to ethgasstation API')
          console.error(e);
          return false;
        })
      // divide by 10 to get number in GWEI
      return Data;
    },
    evalCost: async (gu) => { // gu =  gas used
      let ethValue = 1600;
      let Data;
      await fetch('https://ethgasstation.info/api/ethgasAPI.json?api-key=cf73897050eacb3922b5fd8c72e8732e1632cdb4dc5b5595b515b8dac183')
        .then(response => response.json())
        .then(data => Data = data)
        .catch((e) => {
          console.log('Could not connect to ethgasstation API')
          console.error(e);
          return false;
        })
      let gasPrice_wei = Data ? ((Data.average/10)*1000000000) : 120000000000;
      // let gasPrice_gwei = Data ? Data.average/10 : 120;
      let gasUsed = Number(gu);
      let gasCost_wei = gasUsed * gasPrice_wei;
      let gasCost_eth = gasCost_wei / 1000000000000000000;
      let gasCost_usd = gasCost_eth * ethValue;
      return{ gasCost_usd, gasCost_wei, gasCost_eth };
    }
  },
}

ReactDOM.render(
  <App c={ connection} />, document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
