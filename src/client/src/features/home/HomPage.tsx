import { Link } from 'react-router-dom'
import { Button, Container, Header, Image, Segment } from 'semantic-ui-react'

const HomPage = () => {
    return (
        <Segment inverted textAlign='center' vertical className='masthead'>
            <Container text>
                <Header as='h1' inverted>
                    <Image 
                        size='massive' 
                        src='/assets/logo.png' 
                        alt='logo' 
                        style={{ marginBottom: 12 }}
                    /> Reackathon
                </Header>
                <Header as='h2' inverted content='Welcome to Reackathon' />
                <Button as={Link} to='/teams' size='huge' inverted>Teams Dashboard</Button>
            </Container>
        </Segment>
    )
}

export default HomPage
