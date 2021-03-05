import NavBar from './NavBar'
import { Container } from 'semantic-ui-react'
import TeamDashboard from '../../features/teams/dashboard/TeamDashboard'
import { observer } from 'mobx-react-lite'
import { Route, useLocation } from 'react-router'
import HomPage from '../../features/home/HomPage'
import TeamForm from '../../features/teams/form/TeamForm'
import TeamDetails from '../../features/teams/details/TeamDetails'

const App = () => {
    // When the key changes, a new component instance will be created
    const { key } = useLocation()

    return (
        <>
            <Route path='/' component={HomPage} exact />
            <Route path={'/(.+)'} render={() => (
                <>
                    <NavBar />
                    <Container style={{ marginTop: '7em' }}>
                        <Route path='/teams'  component={TeamDashboard} exact />
                        <Route path='/teams/:id' component={TeamDetails} />
                        <Route path={['/createTeam', '/manage/:id']} component={TeamForm} key={key} />
                    </Container>
                </>
            )} />
        </>
    )
}

export default observer(App)
