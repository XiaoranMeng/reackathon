import { makeAutoObservable, runInAction } from 'mobx';
import agent from '../api/agent';
import { Team } from './../models/team';
import { v4 as uuid } from 'uuid';

export default class TeamStore {
    teamRegistry = new Map<string, Team>();
    selectedTeam: Team | undefined = undefined;
    editing = false; // Controls whether the form is open or closed
    loading = false;
    loadingEnabled = true;

    constructor() {
        makeAutoObservable(this);
    }

    get teamsByDateCreated() {
        return Array.from(this.teamRegistry.values())
            .sort((a, b) => Date.parse(a.createdAt) - Date.parse(b.createdAt))
    }

    // Fetches a list of teams
    fetchTeams = async () => {
        try {
            const teams = await agent.Teams.list();
            teams.forEach(x => {
                x.createdAt = x.createdAt.split('T')[0];
                this.teamRegistry.set(x.id, x);
            });
            this.setLoadingEnabled(false);
        } catch (error) {
            console.log(error);
            this.setLoadingEnabled(false);
        }
    }

    setLoadingEnabled = (enabled: boolean) => {
        this.loadingEnabled = enabled;
    }

    // Select team by id
    selectTeam = (id: string) => {
        this.selectedTeam = this.teamRegistry.get(id);
    }

    deselectTeam = () => {
        this.selectedTeam = undefined;
        this.editing = false;
    }

    // Open form with id to edit or without id to create
    openForm = (id?: string) => {
        id ? this.selectTeam(id) : this.deselectTeam();
        this.editing = true;
    }

    closeForm = () => {
        this.editing = false;
    }

    createTeam = async (team: Team) => {
        this.loading = true;
        team.id = uuid();
        try {
            await agent.Teams.create(team);
            runInAction(() => {
                this.teamRegistry.set(team.id, team);
                this.selectedTeam = team;
                this.editing = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    updateTeam = async (team: Team) => {
        this.loading = true;
        try {
            await agent.Teams.update(team);
            runInAction(() => {
                this.teamRegistry.set(team.id, team);
                this.selectedTeam = team;
                this.editing = false;
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }

    deleteTeam = async (id: string) => {
        this.loading = true;
        try {
            await agent.Teams.delete(id);
            runInAction(() => {
                this.teamRegistry.delete(id);
                if (this.selectedTeam?.id === id) {
                    this.deselectTeam();
                }
                this.loading = false;
            });
        } catch (error) {
            console.log(error);
            runInAction(() => {
                this.loading = false;
            });
        }
    }
}