async function signupForm(event) {
    event.preventDefault();

    const name = document.querySelector('#signupInputUsername').value.trim();
    const email = document.querySelector('#signupInputEmail').value.trim();
    const password = document.querySelector('#signupInputPassword').value.trim();
    const fav_team = document.querySelector('#signupInputFavTeam').value.trim();

    console.log(name)
    console.log(password)
    console.log(email)
    console.log(fav_team)

    if (name && email && password) {
        const response = await fetch('/api/users/signup', {
            method: 'POST',
            body: JSON.stringify({
                name, 
                email, 
                password,
                fav_team
            }),
            headers: { 'Content-Type': 'application/json' }
        });

        if (response.ok) {
            console.log("Successfully created new user!");
            document.location.replace('/leaderboard');
        } else {
            alert(response.statusText);
            console.log(response)
        }
    }
}

document.querySelector('.signup-form').addEventListener('submit', signupForm);