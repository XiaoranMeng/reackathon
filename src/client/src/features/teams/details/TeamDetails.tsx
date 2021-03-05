import { observer } from 'mobx-react-lite'
import { useEffect } from 'react'
import { useParams } from 'react-router'
import { Link } from 'react-router-dom'
import { Button, Card, Image } from 'semantic-ui-react'
import LoadingSpinner from '../../../app/layout/LoadingSpinner'
import { useStore } from '../../../app/stores/store'

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
        <Card fluid>
            <Image src={`/assets/placeholder.png`} />
            <Card.Content>
                <Card.Header>{team.name}</Card.Header>
                <Card.Description>{team.tagline}</Card.Description>
            </Card.Content>
            <Card.Content extra>
                <Button.Group widths={2}>
                    <Button as={Link} to={`/manage/${team.id}`} content='Update' />
                    <Button as={Link} to={`/teams`} content='Cancel' />
                </Button.Group>
            </Card.Content>
        </Card>
    )
}

export default observer(TeamDetails)