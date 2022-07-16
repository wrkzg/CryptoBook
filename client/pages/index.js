import {useRouter} from "next/router";
import { Button } from "semantic-ui-react";
import Layout from "../components/Layout";

const Index = () => {

    const router = useRouter()
    return (<Layout>
        <h1>
            Здесь вы можете сохранить свои контакты и посмотреть их
        </h1>
        <Button.Group>
            <Button primary onClick={()=> router.push("/show")}>Посмотреть</Button>
            <Button.Or text="||"/>
            <Button positive onClick={()=> router.push("/add")}>Сохранить</Button>
        </Button.Group>
    </Layout>);
}

export default Index;