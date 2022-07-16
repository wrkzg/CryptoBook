//import contactFactory from "../contactFactory"
import Contact from "../Contact"
import { ethers } from "ethers"
import getContactFactory from "../contactFactory"


const getContactByAddress = async (provider, address) => {

    const contactFactory = getContactFactory(provider)

    const contactAddess = await contactFactory.ownerToContact(address)
    if (contactAddess === ethers.constants.AddressZero) {
        throw new Error("Такой контакт не найден")
    }
    const contact = Contact(contactAddess)
    console.log({ contactAddess })

    const telegram = await contact.telegram()
    const discord = await contact.discord()
    const desc = await contact.desc()
    console.log({ telegram }, { discord }, { desc })
    return { telegram, discord, desc }
}

export default getContactByAddress