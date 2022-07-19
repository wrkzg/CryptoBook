import { ethers } from "ethers";
import { useEffect, useRef, useState } from "react";
import { Button, Form, Input, Message } from "semantic-ui-react";
import Layout from "../components/Layout";
import getContactFactory from "../contactFactory";

const AddContact = () => {

    const [telegram, setTelegram] = useState("");
    const [discord, setDiscord] = useState("");
    const [successMessage, setSuccessMessage] = useState('');
    const [errorMessage, setErrorMessage] = useState('');
    const [provider, setProvider] = useState();
    const [metamask, setMetamask] = useState(true)
    const tgRef = useRef();


    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
            tgRef.current.focus()
        } else {
            setMetamask(false)
        }
    }, [])


    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrorMessage("")
        setSuccessMessage("")

        if (!telegram) {
            setErrorMessage("Телеграм - обязательное поле")
            return
        }

        const signer = provider.getSigner()
        const contactFactory = getContactFactory(provider)
        const contactFactoryWithSigner = contactFactory.connect(signer)
        console.log(contactFactoryWithSigner.functions)
        try {
            let response;
            if (discord) {
                response = await contactFactoryWithSigner["createContact(string,string)"](telegram, discord)
                console.log("tg, dc")
            } else {
                response = await contactFactoryWithSigner["createContact(string)"](telegram)
                console.log("tg only")
            }
            console.log({ response })
            setSuccessMessage("Хэш транзакции: " + response.hash)
        }
        catch (e) {
            console.error(e)
            setErrorMessage(e.message)
        }
    }

    return (<Layout>
        {!metamask && <h1>Установите Metamask в ваш браузер!</h1>}
        {metamask && <Form error={!!errorMessage} success={!!successMessage} onSubmit={handleSubmit}>
            <Form.Group widths='equal'>
                <Form.Field>
                    <label>Telegram</label>
                    <input ref={tgRef} 
                           placeholder='telegram @nickname' 
                           onChange={(e) => setTelegram(e.target.value)} 
                           value={telegram}/>
                </Form.Field>
                <Form.Field
                    control={Input}
                    value={discord}
                    onChange={(e) => setDiscord(e.target.value)}
                    label='Discord'
                    placeholder='Discord account'
                />
            </Form.Group>
            <Button primary>Сохранить</Button>
            <Message
                error
                style={{ wordBreak: "break-word" }}
                header='ОШИБКА!'
                content={errorMessage}
            />
            <Message
                success
                header='Успех!'
                content={successMessage}
            />
        </Form>}
    </Layout>);
}

export default AddContact;