import { ethers } from "ethers";
import { useRouter } from "next/router";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Loader, Segment } from "semantic-ui-react";
import Layout from "../components/Layout"
import Contact from "../Contact";
import getContactFactory from "../contactFactory";
import getContactByAddress from "../utils/getContactByAddress";

const UserPage = () => {

    const [telegram, setTelegram] = useState("");
    const [discord, setDiscord] = useState("");
    const [desc, setDesc] = useState("");
    const [provider, setProvider] = useState();
    const [address, setAddress] = useState('');
    const [metamask, setMetamask] = useState(true)
    const [logon, setLogon] = useState(true)
    const [loading, setLoading] = useState(false)
    const tgRef = useRef()
    const dcRef = useRef()
    const descRef = useRef()
    const router = useRouter()


    const getContact = (async (provider, address) => {
        try {
            setLoading(true)
            const c = await getContactByAddress(provider, address)
            setTelegram(c.telegram)
            setDiscord(c.discord)
            setDesc(c.desc)
        }
        catch (e) {
            console.error(e.message)
            router.push("/add")
        }
        finally{
            setLoading(false)
        }
    })

    useEffect(() => {
        let p;
        let a;
        if (typeof window.ethereum !== "undefined") {
            p = new ethers.providers.Web3Provider(window.ethereum)
            setProvider(p)
            a = localStorage.getItem('account')
            if (a !== null)
            {
                setAddress(a)
                getContact(p, a)
                tgRef.current.focus()
            }
            else
            {
                setLogon(false)   
                router.push("/")
            }
        }  
        else 
        {
            setMetamask(false)      
            router.push("/")
        }
    }, [])
    
    const handleChange = async (e) =>{
        e.preventDefault();
        const contactFactory = getContactFactory(provider)
        const contactAddress = await contactFactory.ownerToContact(address)
        const signer = provider.getSigner()
        const contact = Contact(provider, contactAddress)
        const contactWithSigner = contact.connect(signer)
        const tg = tgRef.current.value
        const dc = dcRef.current.value
        const descr = descRef.current.value
        
        if (tg) {
            let response = await contactWithSigner.setTelegram(tg)
            console.log({response})
        }
        if (dc) {await contactWithSigner.setDiscord(dc)}
        if (descr) {await contactWithSigner.setDesc(descr)}
        getContact(provider, address)
    }

    return (<Layout>
        {!metamask && <h1>Установите Metamask в ваш браузер!</h1>}
        {metamask && !logon && <h1>Подключите метамаск</h1>}
        {metamask && logon && <>
        
        {loading && <Loader active inline="centered"/>}
        {!loading && <>
        <h1>Ваши контактные данные</h1>
        <Segment.Group>
            <Segment><strong>Адрес:</strong> {address}</Segment>
            {telegram && <Segment><strong>Telegram: </strong>: {telegram}</Segment>}
            {discord &&<Segment><strong>Discord:</strong> {discord}</Segment>}
            {desc && <Segment><strong>Описание:</strong> {desc}</Segment>}
        </Segment.Group>
        <Form>
            <h2>Изменение контактных данных</h2>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Telegram</label>
                    <input ref={tgRef} placeholder='Telegram' />
                </Form.Field>
                <Form.Field>
                    <label>Discord</label>
                    <input ref={dcRef} placeholder='Discord' />
                </Form.Field>
                <Form.Field>
                    <label>Описание</label>
                    <input ref={descRef} placeholder='Описание' />
                </Form.Field>
            </Form.Group>
            <Button type='submit' primary onClick={handleChange}>Изменить</Button>
        </Form>
        </>}
        </>}
    </Layout>);
}

export default UserPage;