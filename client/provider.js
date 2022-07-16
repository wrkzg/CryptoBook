import { ethers } from "ethers";
let provider;

if (typeof window !== "undefined" && typeof window.ethereum !== "undefined") {
    provider = new ethers.providers.Web3Provider(window.ethereum)
}
provider = new ethers.providers.JsonRpcProvider("https://rinkeby.infura.io/v3/e2ea658822064f318630832c4930fac1");
//provider = new ethers.providers.InfuraProvider("rinkeby");
//provider = ethers.getDefaultProvider()

export function waitProvider() {
    return new ethers.providers.Web3Provider(window.ethereum)
}



export default provider