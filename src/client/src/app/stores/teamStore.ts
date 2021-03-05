import { makeAutoObservable, runInAction } from 'mobx'
import agent from '../api/agent'
import { Team } from './../models/team'

export default class TeamStore {
    teamRegistry = new Map<string, Team>()
    selectedTeam: Team | undefined = undefined
    editing = false // Controls whether the form is open or closed
    loading = false
    loadingEnabled = true

    constructor() {
        makeAutoObservable(this)
    }

    get teamsByDateCreated() {
        return Array.from(this.teamRegistry.values())
            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    }

    // Fetches a list of teams
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

    private getTeam = (id: string) => {
        return this.teamRegistry.get(id)
    }

    private setTeam = (team: Team) => {
        team.createdAt = team.createdAt.split('T')[0]
        this.teamRegistry.set(team.id, team)
    }

    setLoadingEnabled = (enabled: boolean) => {
        this.loadingEnabled = enabled
    }

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