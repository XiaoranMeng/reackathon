import { Header, Menu } from 'semantic-ui-react'
import Calendar from 'react-calendar'

const TeamFilters = () => {
    return (
        <>
            <Menu vertical size='large' style={{ width: '100%', marginTop: 27 }}>
                <Header icon='filter' attached color='blue' content='Filters' />
                <Menu.Item content='All teams' />
                <Menu.Item content="My Team" />
            </Menu>
            <Header />
            <Calendar />
        </>
    )
}

export default TeamFilters
