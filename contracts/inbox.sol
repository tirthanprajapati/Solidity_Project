// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

contract inbox {
    string public message;

    constructor(string memory InitMessage) {
        message = InitMessage;
    }

    function setMessage(string memory newMessage) public {
        message = newMessage;
    }
}
