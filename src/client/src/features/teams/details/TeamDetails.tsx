import React from 'react'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingSpinner from '../../../app/layout/LoadingSpinner';
import { useStore } from '../../../app/stores/store';

const TeamDetails = () => {
    const { teamStore } = useStore();
    const { selectedTeam: team, openForm, deselectTeam } = teamStore;

    if (!team) return <LoadingSpinner />;

    return (
        <Card fluid>
            <Image src={`/assets/placeholder.png`} />
            <Card.Content>
                <Card.Header>{team.name}</Card.Header>
                <Card.Description>{team.tagline}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button primary onClick={() => openForm(team.id!)} content='Update' />
                    <Button onClick={deselectTeam} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default TeamDetails;