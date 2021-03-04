import { observer } from 'mobx-react-lite'
import React from 'react'
import { Grid } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import TeamDetails from '../details/TeamDetails'
import TeamForm from '../form/TeamForm'
import TeamList from './TeamList'

const TeamDashboard = () => {
    const { teamStore } = useStore();
    const { selectedTeam, editing } = teamStore;

    return (
        <Grid>
            <Grid.Column width='10'>
                <TeamList />
            </Grid.Column>
            <Grid.Column width='6'>
                {selectedTeam && <TeamDetails />}
                {editing && <TeamForm key={selectedTeam ? selectedTeam.id : 0} />}
            </Grid.Column>
        </Grid>
    );
}

export default observer(TeamDashboard);
