import { observer } from 'mobx-react-lite'
import { Button, Header, Item, Segment, Image } from 'semantic-ui-react'
import { Team } from "../../../app/models/team";

const teamImageStyle = {
    filter: 'brightness(40%)'
};

const teamImageTextStyle = {
    position: 'absolute',
    bottom: '5%',
    left: '5%',
    width: '100%',
    height: 'auto',
    color: 'white'
};

interface Props {
    team: Team
}

const TeamDetailsHeader = ({ team }: Props) => {
    return (
        <Segment.Group>
            <Segment basic attached='top' style={{ padding: '0' }}>
                <Image src={`/assets/placeholder.png`} fluid style={teamImageStyle}/>
                <Segment style={teamImageTextStyle} basic>
                    <Item.Group>
                        <Item>
                            <Item.Content>
                                <Header size='huge' content={team.name} style={{color: 'white'}} />
                                <p>{team.createdAt}</p>
                                <p>Created by <strong>Bob</strong></p>
                            </Item.Content>
                        </Item>
                    </Item.Group>
                </Segment>
            </Segment>
            <Segment clearing attached='bottom'>
                <Button color='blue'>Count me in</Button>
                <Button>Leave team</Button>
                <Button color='orange' floated='right'>
                    Manage Team
                </Button>
            </Segment>
        </Segment.Group>
    )
}

export default observer(TeamDetailsHeader)