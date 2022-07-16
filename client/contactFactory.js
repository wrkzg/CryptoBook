import { ethers } from "ethers";
import dynamic from "next/dynamic";
import { useEffect } from "react";
import { waitProvider } from "./provider";
//import provider from "./provider";
const address = "0x3c75cbcE0247cEbA80514f3941faecb468693820"

//const contactFactory = new ethers.Contract(address, abi, provider)

const ethAbi = [
    "function ownerToContact(address) view returns (address)",
    "function createContact(string, string)",
    "function createContact(string)"
]

const getContactFactory = (provider) => new ethers.Contract(address, ethAbi, provider)

export default getContactFactory