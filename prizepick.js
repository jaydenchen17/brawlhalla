let matchups = [];
let currentMatchupIndex = 0;
let userBets = {};
let predictedStats = {}; // Declare the predictedStats variable here

function loadMatchupData() {
    fetch('assets/lebron_career.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n').slice(1062, 1134);
            matchups = rows.map(row => {
                const columns = row.split(',');
                return {
                    opponent: columns[4].trim(),
                };
            });
            displayMatchup();
        })
        .catch(error => {
            console.error('Error loading matchup data:', error);
        });
}

function displayMatchup() {
    const currentMatchup = matchups[currentMatchupIndex];
    document.getElementById('opponent').textContent = currentMatchup.opponent;
    document.getElementById('matchupNumber').textContent = `Matchup ${currentMatchupIndex + 1}`;
    predictStats(currentMatchup.opponent);
}

function nextMatchup() {
    currentMatchupIndex++;
    if (currentMatchupIndex >= matchups.length) {
        currentMatchupIndex = 0;
    }
    clearBets();
    resetActualStats();
    hideActualCategories();
    displayMatchup();
}

function hideActualCategories() {
    const actualCategories = document.querySelector('.actual-categories-popup');
    if (actualCategories) {
        actualCategories.classList.add('hidden');
    } else {
        console.error('Element with class "actual-categories" not found.');
    }
}

function predictStats(opponent) {
    const requestBody = {
        Abbreviation: opponent
    };
    fetch('http://127.0.0.1:8086/api/lebrons/', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Error fetching data: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        console.log(data);
        predictedStats = data.average_stats_rounded; // Assign the data to predictedStats
        displayPredictedStats(predictedStats);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('predictedPoints').textContent = 'Points: N/A';
        document.getElementById('predictedRebounds').textContent = 'Rebounds: N/A';
        document.getElementById('predictedAssists').textContent = 'Assists: N/A';
    });
}

function displayPredictedStats(stats) {
    document.getElementById('predictedPoints').textContent = `Points: ${stats.pts}`;
    document.getElementById('predictedRebounds').textContent = `Rebounds: ${stats.rebounds}`;
    document.getElementById('predictedAssists').textContent = `Assists: ${stats.ast}`;
}

loadMatchupData();

function placeBet(category, betType) {
    userBets[category] = betType;
    const overBtn = document.getElementById(`${category}OverBtn`);
    const underBtn = document.getElementById(`${category}UnderBtn`);
    overBtn.style.backgroundColor = '#6b3e91';
    underBtn.style.backgroundColor = '#6b3e91';
    if (betType === 'over') {
        overBtn.style.backgroundColor = 'green';
    } else if (betType === 'under') {
        underBtn.style.backgroundColor = 'green';
    }
    saveUserBet(category, betType);
}

function saveUserBet(category, betType) {
    console.log(`User bet for ${category}: ${betType}`);
}

function clearBets() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = '#6b3e91';
    });
}

function simulateGame() {
    const wagerAmountInput = document.getElementById('betInput').value;
    const wagerAmount = parseFloat(wagerAmountInput);
    if (isNaN(wagerAmount) || wagerAmount <= 0) {
        alert('Please enter a valid wager amount greater than 0.');
        return;
    }
    const currentMatchup = matchups[currentMatchupIndex];
    getActualStatsForMatchup(currentMatchup)
        .then(actualStats => {
            displayActualStats(actualStats);
            compareStats(actualStats);
            showActualCategories();
            const betOutcomes = determineBetOutcomes(actualStats);
            const totalWinnings = evaluateParlay(betOutcomes, wagerAmount, actualStats); // Pass actualStats here
            if (totalWinnings > 0) {
                // User wins
                rewardUser(totalWinnings);
            } else {
                // User loses
                updateBalanceOnLoss(wagerAmount);
            }
        })
        .catch(error => {
            console.error('Error simulating game:', error);
        });
}

function updateBalanceOnLoss(wagerAmount) {
    const balanceElement = document.getElementById('balance');
    const currentBalance = parseFloat(balanceElement.textContent.slice(1)); // Remove '$' sign
    const newBalance = currentBalance - wagerAmount; // Deduct the wager amount from the current balance
    balanceElement.textContent = `$${newBalance}`; // Update the balance text
}


function determineBetOutcomes(actualStats) {
    const betOutcomes = {};
    for (const category in userBets) {
        const betType = userBets[category];
        if (betType === 'over') {
            betOutcomes[category] = actualStats[category] > predictedStats[category];
        } else if (betType === 'under') {
            betOutcomes[category] = actualStats[category] < predictedStats[category];
        }
    }
    return betOutcomes;
}

function evaluateParlay(betOutcomes, wagerAmount) {
    let totalWinnings = 0;

    // Check if all three buttons are flashing green
    const allBetsWon = Object.values(betOutcomes).every(outcome => outcome);

    if (allBetsWon) {
        totalWinnings = wagerAmount * 3; // Triple the wager amount if all bets are won
    } else {
        totalWinnings = -wagerAmount; // User loses the entire wager if any bet is lost
    }

    return totalWinnings;
}

function showActualCategories() {
    const popup = document.querySelector('.actual-categories-popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden');
    }, 3000);
}

function displayActualStats(actualStats) {
    document.getElementById('actualPoints').textContent = `Actual Points: ${actualStats.points}`;
    document.getElementById('actualRebounds').textContent = `Actual Rebounds: ${actualStats.rebounds}`;
    document.getElementById('actualAssists').textContent = `Actual Assists: ${actualStats.assists}`;
}

function getActualStatsForMatchup(matchup) {
    const rowIndex = 1062 + currentMatchupIndex;
    return fetch('assets/lebron_career.csv')
        .then(response => response.text())
        .then(csv => {
            const rows = csv.split('\n');
            const columns = rows[rowIndex].split(',');
            const actualStats = {
                points: parseFloat(columns[23]),
                rebounds: parseFloat(columns[18]),
                assists: parseFloat(columns[19])
            };
            return actualStats;
        })
        .catch(error => {
            console.error('Error loading matchup data:', error);
            return null;
        });
}

function compareStats(actualStats) {
    const predictedPoints = parseFloat(document.getElementById('predictedPoints').textContent.split(' ')[1]);
    const predictedRebounds = parseFloat(document.getElementById('predictedRebounds').textContent.split(' ')[1]);
    const predictedAssists = parseFloat(document.getElementById('predictedAssists').textContent.split(' ')[1]);
    compareStat('points', actualStats.points, predictedPoints);
    compareStat('rebounds', actualStats.rebounds, predictedRebounds);
    compareStat('assists', actualStats.assists, predictedAssists);
}

function compareStat(category, actualValue, predictedValue) {
    const overBtn = document.getElementById(`${category}OverBtn`);
    const underBtn = document.getElementById(`${category}UnderBtn`);
    const diff = actualValue - predictedValue;
    if (overBtn.style.backgroundColor === 'green' && diff > 0) {
        flashButton(overBtn, 'flash-green');
        flashButton(underBtn, 'flash-green');
    } else if (underBtn.style.backgroundColor === 'green' && diff < 0) {
        flashButton(overBtn, 'flash-green');
        flashButton(underBtn, 'flash-green');
    } else {
        flashButton(overBtn, 'flash-red');
        flashButton(underBtn, 'flash-red');
    }
}

function flashButton(button, className) {
    button.classList.add(className);
    setTimeout(() => {
        button.classList.remove(className);
    }, 1000);
}

function resetActualStats() {
    document.getElementById('actualPoints').textContent = '';
    document.getElementById('actualRebounds').textContent = '';
    document.getElementById('actualAssists').textContent = '';
}

function rewardUser(totalWinnings) {
    const wagerAmountInput = document.getElementById('betInput').value;
    const wagerAmount = parseFloat(wagerAmountInput);
    const balanceElement = document.getElementById('balance');
    const currentBalance = parseFloat(balanceElement.textContent.slice(1)); // Remove '$' sign
    let newBalance = currentBalance; // Initialize new balance
    if (totalWinnings > 0) {
        const winnings = totalWinnings - wagerAmount; // Deduct the original wager
        const reward = winnings + (wagerAmount * 5); // Add 5 times the original wager
        newBalance += reward; // Update the balance with the reward
    }
    balanceElement.textContent = `$${newBalance}`; // Update the balance text
}