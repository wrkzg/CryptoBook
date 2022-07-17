import Layout from "../components/Layout"
import getContactByAddress from "../utils/getContactByAddress";

const UserPage = () => {

    const [provider, setProvider] = useState();
    const [loading, setLoading] = useState(false);
    const [metamask, setMetamask] = useState(true)

    useEffect(() => {
        if (typeof window.ethereum !== "undefined") {
            setProvider(new ethers.providers.Web3Provider(window.ethereum))
        } else {
            setMetamask(false)
        }

        const savedAccount = localStorage.getItem('account')
        const contact = getContactByAddress(provider, savedAccount)
    }, [])


    return (<Layout>
        <h1>Ваши контактные данные</h1>
    </Layout>);
}

export default UserPage;