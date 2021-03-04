import React, { useEffect } from 'react';
import NavBar from './NavBar';
import { Container } from 'semantic-ui-react';
import TeamDashboard from '../../features/teams/dashboard/TeamDashboard';
import LoadingSpinner from './LoadingSpinner';
import { useStore } from '../stores/store';
import { observer } from 'mobx-react-lite';

const App = () => {
    const { teamStore } = useStore();
    const { loadingEnabled, fetchTeams } = teamStore;

    useEffect(() => {
        fetchTeams();
    }, [fetchTeams]);

    if (loadingEnabled) {
        return <LoadingSpinner />;
    }

    return (
        <>
            <NavBar />
            <Container style={{ marginTop: '7em' }}>
                <TeamDashboard />
            </Container>
        </>
    );
};

export default observer(App);
