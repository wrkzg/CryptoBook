//import contactFactory from "../contactFactory"
import Contact from "../Contact"
import { ethers } from "ethers"
import getContactFactory from "../contactFactory"


const getContactByAddress = async (provider, address) => {

    const contactFactory = getContactFactory(provider)

    const contactAddress = await contactFactory.ownerToContact(address)
    if (contactAddress === ethers.constants.AddressZero) {
        throw new Error("Такой контакт не найден")
    }
    const contact = Contact(provider, contactAddress)

    const telegram = await contact.telegram()
    const discord = await contact.discord()
    const desc = await contact.desc()
    return { telegram, discord, desc }
}

export default getContactByAddress