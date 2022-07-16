import { useEffect, useRef, useState } from "react";
import { Form, Button, Message } from "semantic-ui-react";
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

    useEffect(() => setProvider(new ethers.providers.Web3Provider(window.ethereum)), [])

    const handleSubmit = async (e) => {
        e.preventDefault();
        const address = addressRef.current.value;
        setErrorMessage('');
        setTelegram('')
        setDiscord('')
        setDesc('')
        setLoading(true)
        console.log({ address });
        if (!address) {
            setErrorMessage("Не введен адрес пользователя");
            return
        }
        try {
            const contact = await getContactByAddress(provider, address);
            setTelegram(contact.telegram)
            setDiscord(contact.discord)
            setDesc(contact.desc)
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
        <Form error={!!errorMessage} onSubmit={handleSubmit}>
            <Form.Field>
                <label>Введите адрес здесь</label>
                <input ref={addressRef} placeholder='адрес' />
            </Form.Field>
            <Button primary type='submit' loading={loading} >Посмотреть</Button>
            <Message
                error
                style={{wordBreak:"break-word"}}
                header='ОШИБКА!'
                content={errorMessage}
            />
        </Form>
        {telegram && <h2>Telegram: {telegram}</h2>}
        {discord && <h2>Discord: {discord}</h2>}
        {desc && <h2>Description: {desc}</h2>}
    </Layout>);
}

export default ShowContact;