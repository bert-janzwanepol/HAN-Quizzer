import React, { useState } from 'react';

const SignupForm = () => {

    const [teamName, setTeamName] = useState("");

    return (
        <form>
            <input value={teamName} onChange={e => setTeamName(e.target.value)} type="text" name="teamName" required />
            <small className='form-error-message'>Error text komt hier</small>
            <button type="submit">create team</button>
        </form>
    );
}

export default SignupForm;