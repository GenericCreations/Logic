// SPDX-License-Identifier: MIT
pragma solidity >=0.4.21 <0.7.0;

contract SimpleStorage {
  uint public storedData;

  function set(uint x) public {
    storedData = x;
  }
}
