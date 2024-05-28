let matchups = [];
let userBets = {};
let predictedStats = {};

// Load matchup data from the CSV file
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
        })
        .catch(error => {
            console.error('Error loading matchup data:', error);
        });
}

// Search for an opponent and display their matchup
function searchOpponent() {
    const searchInput = document.getElementById('searchOpponentInput').value.toLowerCase();
    const matchup = findMatchupByName(searchInput);
    if (matchup) {
        displayMatchup(matchup);
    } else {
        alert('Opponent not found!');
    }
}

// Find a matchup by opponent's name
function findMatchupByName(opponentName) {
    return matchups.find(matchup => matchup.opponent.toLowerCase() === opponentName) || null;
}

// Display the selected matchup
function displayMatchup(matchup) {
    document.getElementById('opponent').textContent = matchup.opponent;
    predictStats(matchup.opponent);
}

// Predict stats for the selected opponent
function predictStats(opponent) {
    const requestBody = { Abbreviation: opponent };
    fetch('http://127.0.0.1:8086/api/lebrons/', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(requestBody)
    })
    .then(response => {
        if (!response.ok) throw new Error('Error fetching data: ' + response.statusText);
        return response.json();
    })
    .then(data => {
        predictedStats = data.average_stats_rounded;
        displayPredictedStats(predictedStats);
    })
    .catch(error => {
        console.error('Error fetching data:', error);
        document.getElementById('predictedPoints').textContent = 'Points: N/A';
        document.getElementById('predictedRebounds').textContent = 'Rebounds: N/A';
        document.getElementById('predictedAssists').textContent = 'Assists: N/A';
    });
}

// Display predicted stats on the page
function displayPredictedStats(stats) {
    document.getElementById('predictedPoints').textContent = `Points: ${stats.pts}`;
    document.getElementById('predictedRebounds').textContent = `Rebounds: ${stats.rebounds}`;
    document.getElementById('predictedAssists').textContent = `Assists: ${stats.ast}`;
}

loadMatchupData();

// Place a bet on a category
function placeBet(category, betType) {
    userBets[category] = betType;
    const overBtn = document.getElementById(`${category}OverBtn`);
    const underBtn = document.getElementById(`${category}UnderBtn`);
    overBtn.style.backgroundColor = '#6b3e91';
    underBtn.style.backgroundColor = '#6b3e91';
    if (betType === 'over') {
        overBtn.style.backgroundColor = 'green';
    } else {
        underBtn.style.backgroundColor = 'green';
    }
}

// Clear bets
function clearBets() {
    const buttons = document.querySelectorAll('button');
    buttons.forEach(button => {
        button.style.backgroundColor = '#6b3e91';
    });
}

// Simulate the game and determine the outcome
function simulateGame() {
    const wagerAmountInput = document.getElementById('betInput').value;
    const wagerAmount = parseFloat(wagerAmountInput);
    if (isNaN(wagerAmount) || wagerAmount <= 0) {
        alert('Please enter a valid wager amount greater than 0.');
        return;
    }
    const currentMatchup = matchups.find(matchup => matchup.opponent.toLowerCase() === document.getElementById('opponent').textContent.toLowerCase());
    if (!currentMatchup) {
        alert('No opponent selected!');
        return;
    }
    getActualStatsForMatchup(currentMatchup)
        .then(actualStats => {
            displayActualStats(actualStats);
            compareStats(actualStats);
            showActualCategories();
            const betOutcomes = determineBetOutcomes(actualStats);
            const totalWinnings = evaluateParlay(betOutcomes, wagerAmount);
            if (totalWinnings > 0) {
                rewardUser(totalWinnings);
            } else {
                updateBalanceOnLoss(wagerAmount);
            }
        })
        .catch(error => {
            console.error('Error simulating game:', error);
        });
}

// Update balance on loss
function updateBalanceOnLoss(wagerAmount) {
    const balanceElement = document.getElementById('balance');
    const currentBalance = parseFloat(balanceElement.textContent.slice(1));
    const newBalance = currentBalance - wagerAmount;
    balanceElement.textContent = `$${newBalance}`;
}

// Determine the outcomes of the bets
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

// Evaluate the parlay and determine winnings
function evaluateParlay(betOutcomes, wagerAmount) {
    let totalWinnings = 0;
    let allBetsWon = true;
    for (const category in betOutcomes) {
        if (!betOutcomes[category]) {
            allBetsWon = false;
            break;
        }
    }
    if (allBetsWon) {
        totalWinnings = wagerAmount * 3;
    }
    return totalWinnings;
}

// Show actual categories popup and proceed to the next matchup
function showActualCategories() {
    const popup = document.querySelector('.actual-categories-popup');
    popup.classList.remove('hidden');
    setTimeout(() => {
        popup.classList.add('hidden');
        clearBets();
    }, 3000);
}

// Display actual stats on the page
function displayActualStats(actualStats) {
    document.getElementById('actualPoints').textContent = `Actual Points: ${actualStats.points}`;
    document.getElementById('actualRebounds').textContent = `Actual Rebounds: ${actualStats.rebounds}`;
    document.getElementById('actualAssists').textContent = `Actual Assists: ${actualStats.assists}`;
}

// Get actual stats for a given matchup from the CSV file
function getActualStatsForMatchup(matchup) {
    // Generate random stats within the specified ranges
    const actualStats = {
        points: getRandomNumberInRange(23, 40),
        rebounds: getRandomNumberInRange(0, 10),
        assists: getRandomNumberInRange(5, 15)
    };
    return Promise.resolve(actualStats);
}

// Helper function to generate a random number within a specified range
function getRandomNumberInRange(min, max) {
    return Math.floor(Math.random() * (max - min + 1)) + min;
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
    const balanceElement = document.getElementById('balance');
    const currentBalance = parseFloat(balanceElement.textContent.slice(1));
    const newBalance = currentBalance + totalWinnings;
    balanceElement.textContent = `$${newBalance}`;
}
