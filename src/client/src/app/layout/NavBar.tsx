import { observer } from 'mobx-react-lite';
import React from 'react';
import { Button, Container, Menu } from 'semantic-ui-react';
import { useStore } from '../stores/store';


const NavBar = () => {
    const { teamStore } = useStore();

    return (
        <Menu inverted fixed='top'>
            <Container>
                <Menu.Item>
                    <img src='./assets/logo.png' alt='logo' style={{ marginRight: 10 }}/>
                </Menu.Item>
                <Menu.Item name='Teams Dashboard' />
                <Menu.Item>
                    <Button onClick={() => teamStore.openForm()} content='Create Team' />
                </Menu.Item>
            </Container>
        </Menu>
    );
}
export default observer(NavBar);