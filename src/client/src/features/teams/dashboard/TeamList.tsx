import { observer } from 'mobx-react-lite';
import { Fragment } from 'react';
import { Header } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store'
import TeamListItem from './TeamListItem'

const TeamList = () => {
    const { teamStore } = useStore()
    const { groupedTeams } = teamStore

    return (
        <>
            {groupedTeams.map(([dateCreated, teams]) => (
                <Fragment key={dateCreated}>
                    <Header sub color='pink'>{dateCreated}</Header>
                    {teams.map(team => (
                        <TeamListItem key={team.id} team={team} />
                    ))}
                </Fragment>
            ))}
        </>
        
    );
};

export default observer(TeamList);
