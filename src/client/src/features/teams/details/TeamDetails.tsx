import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import TeamDetailsChat from './TeamDetailsChat'
import TeamDetailsContent from './TeamDetailsContent'
import TeamDetailsHeader from './TeamDetailsHeader'
import TeamDetailsSidebar from './TeamDetailsSidebar'
import LoadingSpinner from '../../../app/layout/LoadingSpinner'

const TeamDetails = () => {
    const { teamStore } = useStore()
    const { selectedTeam: team, fetchTeam, loadingEnabled } = teamStore
    const { id } = useParams<{id: string}>()

    useEffect(() => {
        if (id) {
            fetchTeam(id)
        }
    }, [fetchTeam, id])

    if (loadingEnabled || !team) {
        return <LoadingSpinner />
    }

    return (
        <Grid>
            <Grid.Column width={10}>
                <TeamDetailsHeader team={team} />
                <TeamDetailsContent team={team} />
                <TeamDetailsChat />
            </Grid.Column>
            <Grid.Column width={6}>
                <TeamDetailsSidebar />
            </Grid.Column>
        </Grid>
    )
}

export default observer(TeamDetails)