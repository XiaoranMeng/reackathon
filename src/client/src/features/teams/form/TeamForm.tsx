import { observer } from 'mobx-react-lite';
import React, { ChangeEvent, useState } from 'react'
import { Button, Form, Segment } from 'semantic-ui-react'
import { useStore } from '../../../app/stores/store';



const TeamForm = () => {
    const { teamStore } = useStore();
    const { selectedTeam, loading, closeForm, createTeam, updateTeam } = teamStore;

    const state = selectedTeam ?? {
        id: '',
        name: '',
        tagline: '',
        imageUrl: '',
        createdAt: new Date().toISOString().split('T')[0]
    };

    const [team, setTeam] = useState(state);

    const handleSubmitForm = () => {
        team.id ? updateTeam(team) : createTeam(team);
    }

    const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setTeam({...team, [name]: value});
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmitForm} autoComplete='off'>
                <Form.Input onChange={e => changeInput(e)} placeholder='Team name' value={team.name} name='name' />
                <Form.TextArea onChange={e => changeInput(e)} placeholder='Team slogan' value={team.tagline} name='tagline' />
                <Button onClick={closeForm} floated='right' content='Cancel' />
                <Button positive loading={loading} floated='right' type='submit' content='Submit' />
            </Form>
        </Segment>
    )
}

export default observer(TeamForm);