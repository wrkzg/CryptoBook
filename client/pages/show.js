import { useEffect, useRef, useState } from "react";
import { Form, Button, Message, Segment } from "semantic-ui-react";
import Layout from "../components/Layout";
import getContactByAddress from "../utils/getContactByAddress";
import { ethers } from "ethers";

const ShowContact = () => {

    const [telegram, setTelegram] = useState("");
    const [discord, setDiscord] = useState("");
    const [desc, setDesc] = useState("");
    const addressRef = useRef();
    const [errorMessage, setErrorMessage] = useState('');
    const [provider, setProvider] = useState();
    const [loading, setLoading] = useState(false);
    const [metamask, setMetamask] = useState(true)
    const [show, setShow] = useState(false)

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
            addressRef.current.focus()
        } else {
            setMetamask(false)
        }
    }, [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = addressRef.current.value;
        setErrorMessage('');
        setTelegram('')
        setDiscord('')
        setDesc('')
        setShow(false)
        if (!address) {
            setErrorMessage("Не введен адрес пользователя");
            return
        }
        setLoading(true)
        try {
            const contact = await getContactByAddress(provider, address);
            setTelegram(contact.telegram)
            setDiscord(contact.discord)
            setDesc(contact.desc)
            setShow(true)
        }
        catch (e) {
            console.error(e)
            setErrorMessage(e.message)
        }
        finally {
            setLoading(false)
        }
    }

    return (<Layout>
        {!metamask && <h1>Установите Metamask в ваш браузер!</h1>}
        {metamask && <Form error={!!errorMessage} onSubmit={handleSubmit}>
            <Form.Field>
                <label>Введите адрес здесь</label>
                <input ref={addressRef} placeholder='адрес' />
            </Form.Field>
            <Button primary type='submit' loading={loading} >Посмотреть</Button>
            <Message
                error
                style={{ wordBreak: "break-word" }}
                header='ОШИБКА!'
                content={errorMessage}
            />
        </Form>}
        {show && <>
        <h1>Ваши контактные данные</h1>
        <Segment.Group>
            {telegram && <Segment><strong>Telegram: </strong>: {telegram}</Segment>}
            {discord &&<Segment><strong>Discord:</strong> {discord}</Segment>}
            {desc && <Segment><strong>Описание:</strong> {desc}</Segment>}
        </Segment.Group>
        </>}
    </Layout>);
}

export default ShowContact;