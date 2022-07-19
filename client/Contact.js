import { ethers } from "ethers";
//import provider from "./provider";

const ethAbi = [
    "function owner() view returns (string)",
    "function telegram() view returns (string)",
    "function discord() view returns (string)",
    "function desc() view returns (string)",
    "function setTelegram (string)",
    "function setDiscord (string)",
    "function setDesc (string)"
]

const Contact = (provider, address) => new ethers.Contract(address, ethAbi, provider)

export default Contact;