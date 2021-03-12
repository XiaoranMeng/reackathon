import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { Team } from './../models/team'

export default class TeamStore {
    teamRegistry = new Map<string, Team>() // A registry that stores team with the key set to id
    selectedTeam: Team | undefined = undefined
    editing = false // Controls whether the form is open or closed
    loading = false
    loadingEnabled = true

    constructor() {
        makeAutoObservable(this)
    }

    // An array of teams sorted by date created
    get teamsByDateCreated() {
        return Array.from(this.teamRegistry.values())
            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    }

    // An array of key/value pairs
    // K: date created of string
    // V: teams of Team[]
    get groupedTeams() {
        return Object.entries(
            this.teamsByDateCreated.reduce((teams, team) => {
                const dateCreated = team.createdAt
                teams[dateCreated] = teams[dateCreated] 
                    ? [...teams[dateCreated], team]
                    : [team]
                return teams
            }, {} as {[key: string]: Team[]})
        )
    }

    // Gets a single team from the registry by id
    private getTeam = (id: string) => {
        return this.teamRegistry.get(id)
    }

    // Puts a single team in the registry
    private setTeam = (team: Team) => {
        team.createdAt = team.createdAt.split('T')[0]
        this.teamRegistry.set(team.id, team)
    }

    // Turns on the loading spinner
    setLoadingEnabled = (enabled: boolean) => {
        this.loadingEnabled = enabled
    }

    // Sends a GET request to fetch a list of teams
    fetchTeams = async () => {
        this.setLoadingEnabled(true)
        try {
            const teams = await agent.Teams.list()
            teams.forEach(team => {
                this.setTeam(team)
            })
            this.setLoadingEnabled(false)
        } catch (error) {
            console.log(error)
            this.setLoadingEnabled(false)
        }
    }

    // Sends a GET request to fetch a single team by id
    fetchTeam = async (id: string) => {
        let team = this.getTeam(id)
        if (team) {
            this.selectedTeam = team
            return team
        } else {
            this.setLoadingEnabled(true)
            try {
                team = await agent.Teams.details(id)
                this.setTeam(team)
                this.setLoadingEnabled(false)
                runInAction(() => {
                    this.selectedTeam = team
                })
                return team
            } catch (error) {
                console.log(error)
                this.setLoadingEnabled(false)
            }
        }
    }

    // Sends a POST request to creates a single team
    createTeam = async (team: Team) => {
        this.loading = true
        try {
            await agent.Teams.create(team)
            runInAction(() => {
                this.teamRegistry.set(team.id, team)
                this.selectedTeam = team
                this.editing = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    // Sends a PUT request to update an existing team
    updateTeam = async (team: Team) => {
        this.loading = true
        try {
            await agent.Teams.update(team)
            runInAction(() => {
                this.teamRegistry.set(team.id, team)
                this.selectedTeam = team
                this.editing = false
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }

    // Sends a DELETE request to delete an existing team by id
    deleteTeam = async (id: string) => {
        this.loading = true
        try {
            await agent.Teams.delete(id)
            runInAction(() => {
                this.teamRegistry.delete(id)
                this.loading = false
            })
        } catch (error) {
            console.log(error)
            runInAction(() => {
                this.loading = false
            })
        }
    }   
}