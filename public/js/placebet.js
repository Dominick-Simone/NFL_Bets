async function betHandler(event) {
    event.preventDefault();

    const bet_pick = document.querySelector('select[name="bet-pick"]').value.trim();

    const game_id = window.location.toString().split('/')[
        window.location.toString().split('/').length - 1
    ];

    console.log(bet_pick)
    console.log(game_id)

    if (bet_pick) {
        const response = await fetch('/api/bets', {
            method: 'POST',
            body: JSON.stringify({
                game_id,
                bet_pick
            }),
            headers: {
                'Content-Type': 'application/json'
            }
        });

        if (response.ok) {
            document.location.reload();
        } else {
            console.log(response.statusText)
        }
    }
}

document.querySelector('.bet-form').addEventListener('submit', betHandler);