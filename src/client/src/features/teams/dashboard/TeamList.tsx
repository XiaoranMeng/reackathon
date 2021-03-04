import { observer } from 'mobx-react-lite';
import React, { SyntheticEvent, useState } from 'react';
import { Button, Item, Segment } from 'semantic-ui-react';
import { useStore } from '../../../app/stores/store';

const TeamList = () => {
    const { teamStore } = useStore();
    const { teamsByDateCreated, loading, selectTeam, deleteTeam } = teamStore;
    const [target, setTarget] = useState('');

    const handleDeleteTeam = (e: SyntheticEvent<HTMLButtonElement>, id: string) => {
        setTarget(e.currentTarget.name);
        deleteTeam(id);
    };

    return (
        <Segment>
            <Item.Group divided>
                {teamsByDateCreated.map(({ id, createdAt, name, tagline })=> (
                    <Item key={id}>
                        <Item.Content>
                            <Item.Header as='a'>{name}</Item.Header>
                            <Item.Meta>{createdAt}</Item.Meta>
                            <Item.Description>
                                <div>{tagline}</div>
                            </Item.Description>
                            <Item.Extra>
                                <Button
                                    negative
                                    loading={loading && target === id} 
                                    onClick={e => handleDeleteTeam(e, id!)}
                                    name={id}
                                    floated='right' 
                                    content='Delete' 
                                />
                                <Button 
                                    primary 
                                    onClick={() => selectTeam(id!)} 
                                    floated='right' 
                                    content='Details' 
                                />
                            </Item.Extra>
                        </Item.Content>
                    </Item>
                ))}
            </Item.Group>
        </Segment>
    );
};

export default observer(TeamList);
