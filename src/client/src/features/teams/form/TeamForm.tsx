import { observer } from 'mobx-react-lite'
import { ChangeEvent, useEffect, useState } from 'react'
import { useHistory, useParams } from 'react-router'
import { Button, Form, Segment } from 'semantic-ui-react'
import LoadingSpinner from '../../../app/layout/LoadingSpinner'
import { useStore } from '../../../app/stores/store'
import { v4 as uuid } from 'uuid'
import { Link } from 'react-router-dom'

const TeamForm = () => {
    const history = useHistory()
    const { teamStore } = useStore()

    const { 
        loading, 
        loadingEnabled, 
        createTeam, 
        updateTeam, 
        fetchTeam 
    } = teamStore

    const { id } = useParams<{id: string}>()

    const [team, setTeam] = useState({
        id: '',
        name: '',
        tagline: '',
        imageUrl: '',
        createdAt: new Date().toISOString().split('T')[0]
    })

    useEffect(() => {
        if (id) {
            fetchTeam(id).then(team => {
                setTeam(team!)
            })
        }
    }, [fetchTeam, id])

    const handleSubmitForm = () => {
        if (team.id.length === 0) {
            let newTeam = {...team, id: uuid()}
            createTeam(newTeam).then(() => {
                history.push(`/teams/${newTeam.id}`)
            })
        } else {
            updateTeam(team).then(() => {
                history.push(`/teams/${team.id}`)
            })
        }
    }

    const changeInput = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target
        setTeam({...team, [name]: value})
    }

    if (loadingEnabled) {
        return <LoadingSpinner />
    }

    return (
        <Segment clearing>
            <Form onSubmit={handleSubmitForm} autoComplete='off'>
                <Form.Input onChange={e => changeInput(e)} placeholder='Team name' value={team.name} name='name' />
                <Form.TextArea onChange={e => changeInput(e)} placeholder='Team slogan' value={team.tagline} name='tagline' />
                <Button as={Link} to='/teams' floated='right' content='Cancel' />
                <Button loading={loading} floated='right' type='submit' content='Submit' />
            </Form>
        </Segment>
    )
}

export default observer(TeamForm)