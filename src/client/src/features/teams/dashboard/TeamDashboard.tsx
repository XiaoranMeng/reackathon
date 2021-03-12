import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { Grid } from 'semantic-ui-react'
import LoadingSpinner from '../../../app/layout/LoadingSpinner'
import { useStore } from '../../../app/stores/store'
import TeamFilters from './TeamFilters'
import TeamList from './TeamList'

const TeamDashboard = () => {
    const { teamStore } = useStore()
    const { teamRegistry, loadingEnabled, fetchTeams } = teamStore

    useEffect(() => {
        if (teamRegistry.size <= 1) {
            fetchTeams()
        }
    }, [fetchTeams, teamRegistry.size])

    if (loadingEnabled) {
        return <LoadingSpinner />
    }

    return (
        <Grid>
            <Grid.Column width='10'>
                <TeamList />
            </Grid.Column>
            <Grid.Column width='6'>
               <TeamFilters />
            </Grid.Column>
        </Grid>
    )
}

export default observer(TeamDashboard)
