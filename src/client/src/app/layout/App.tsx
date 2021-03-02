import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [teams, setTeams] = useState([]);

    useEffect(() => {
        axios.get('http://localhost:5000/api/teams').then(response => {
            setTeams(response.data);
        })
    }, []);

    return (
        <div>
            
        </div>
    )
}

export default App
