import { Button, Menu } from 'semantic-ui-react'
import Link from 'next/link'
import { useState } from 'react'
const Header = () => {

    const [currentAccont, setCurrentAccount] = useState()

    const handleLoginClick = async () => {
        const { ethereum } = window
        if (!ethereum) {
            alert("У вас не установлен метамаск")
            return
        }
        try {
            const accounts = await ethereum.request({ method: "eth_requestAccounts" })
            setCurrentAccount(accounts[0])
        }
        catch (e) {
            console.error(e.message)
        }

    }

    return (
        <Menu style={{ marginTop: "20px" }}>
            <Link href="/">
                <Menu.Item>
                    Главная
                </Menu.Item>
            </Link>

            <Link href="/add">
                <Menu.Item>
                    Записать контакт
                </Menu.Item>
            </Link>

            <Link href="/show">
                <Menu.Item>
                    Посмотреть контакт
                </Menu.Item>
            </Link>
            <Menu.Item position='right'>
                {!currentAccont ? (
                    <Button primary onClick={handleLoginClick}>
                        Вход
                    </Button>
                ) : (
                    <Link href="/user">
                        <Button primary onClick={handleLoginClick}>{currentAccont}</Button>
                    </Link>
                )}
            </Menu.Item>
        </Menu>

    );
}

export default Header;