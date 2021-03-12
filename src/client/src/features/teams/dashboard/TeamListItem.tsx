import { FC } from 'react'
import { Link } from 'react-router-dom'
import { Item, Button, Segment, Icon } from 'semantic-ui-react'
import { Team } from '../../../app/models/team'
import 'semantic-ui-css/semantic.min.css'

const TeamListItem: FC<{team: Team}> = ({ 
    team: {
        id, name, createdAt, tagline 
    } 
}) => {

    return (
        <Segment.Group>
            <Segment>
                <Item.Group>
                    <Item>
                        <Item.Image src='/assets/user.png' size='tiny' circular />
                        <Item.Content>
                            <Item.Header as={Link} to={`/teams/${id}`}>{name}</Item.Header>
                            <Item.Description>Created by Bob</Item.Description>
                        </Item.Content>
                    </Item>
                </Item.Group>
            </Segment>
            <Segment>
                <span>
                  <Icon name='clock' /> {createdAt}
                </span>
            </Segment>
            <Segment secondary>
                Team Members
            </Segment>
            <Segment clearing>
                <span>{tagline}</span>
                <Button
                    floated='right'
                    content='Details'
                    as={Link}
                    to={`/teams/${id}`}
                />
            </Segment>
        </Segment.Group>
    )
}

export default TeamListItem
