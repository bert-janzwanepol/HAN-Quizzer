import produce from 'immer';

const initalState = {
    approved: [],
    denied: [
        {
            name: 'Team juan',
            approved: false,
            score: 0
        },
        {
            name: 'Team dos',
            approved: false,
            score: 0
        }
    ],
    started: false
}

export const TOGGLE_TEAM_STATUS = 'TOGGLE_TEAM_STATUS';
export const FILTER_TEAMS = 'FILTER_TEAMS';

export const toggleTeamStatusAction = (teamName) => {
    return { type: TOGGLE_TEAM_STATUS, teamName }
}

export const applicationReducer = produce((draft = initalState, action) => {
    switch (action.type) {
        case TOGGLE_TEAM_STATUS:
            draft.teams.map(team =>
                team.name === action.teamName ? { ...team, approved: !team.approved } : team
            )
            break;

        default:
            return draft;
    }
})