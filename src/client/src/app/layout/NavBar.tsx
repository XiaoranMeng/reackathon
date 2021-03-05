import { observer } from 'mobx-react-lite'
import { NavLink } from 'react-router-dom'
import { Button, Container, Menu } from 'semantic-ui-react'

const NavBar = () => {
    return (
        <Menu fixed='top'>
            <Container>
                <Menu.Item as={NavLink} to='/' exact header>
                    <img src='./assets/logo.png' alt='logo' style={{ marginRight: 10 }}/>
                    REACKATHON
                </Menu.Item>
                <Menu.Item as={NavLink} to='/teams' name='Teams Dashboard' />
                <Menu.Item>
                    <Button as={NavLink} to='/createTeam' content='Create Team' />
                </Menu.Item>
            </Container>
        </Menu>
    )
}
export default observer(NavBar)