import { observer } from 'mobx-react-lite';
import { Segment, Grid, Icon } from 'semantic-ui-react'
import { Team} from "../../../app/models/team";

interface Props {
    team: Team
}

const TeamDetailsContent = ({ team }: Props) => {
    return (
        <Segment.Group>
            <Segment attached='top'>
                <Grid>
                    <Grid.Column width={1}>
                        <Icon size='large' name='info' color='red'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>Slogan: {team.tagline}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
            <Segment attached>
                <Grid verticalAlign='middle'>
                    <Grid.Column width={1}>
                        <Icon name='calendar' size='large' color='red'/>
                    </Grid.Column>
                    <Grid.Column width={15}>
                        <span>Date created: {team.createdAt}</span>
                    </Grid.Column>
                </Grid>
            </Segment>
        </Segment.Group>
    )
}

export default observer(TeamDetailsContent)
