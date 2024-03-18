---
toc: false
comments: true
layout: post
title: Machine Learning Project LEBRON JAMES
type: tangibles
courses: { compsci: {week: 3} }
permalink: /LEBRON
---

<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>LeBron MATCHUP Stat Predicter</title>
    <style>
        .container {
            max-width: 400px;
            margin: 0 auto;
            padding: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            background-color: #f9f9f9;
            color: black; /* Make text black */
        }
        h2, h3 {
            text-align: center;
            color: black; /* Make text black */
        }
        form {
            display: flex;
            flex-direction: column;
        }
        label {
            margin-bottom: 10px;
        }
        input[type="text"] {
            padding: 10px;
            margin-bottom: 20px;
            border: 1px solid #ccc;
            border-radius: 5px;
            font-size: 16px;
        }
        button {
            padding: 10px 20px;
            background-color: #007bff;
            color: #fff;
            border: none;
            border-radius: 5px;
            cursor: pointer;
            font-size: 16px;
        }
        button:hover {
            background-color: #0056b3;
        }
        table {
            width: 100%;
            border-collapse: collapse;
            margin-top: 20px;
        }
        th, td {
            border: 1px solid #ddd;
            padding: 8px;
            text-align: left;
        }
        th {
            background-color: #f2f2f2;
            color: black; /* Make text black */
        }
    </style>
</head>
<body>
    <div class="container">
        <h2>LeBron MATCHUP Stat Predicter</h2>
        <form action="process_form.py" method="post">
            <label for="opponent">WHO DARES STAND AGAINST OUR GLORIOUS KING!?</label>
            <input type="text" id="opponent" name="opponent" required>
            <button type="submit">Get Stats</button>
        </form>
        <h3>NBA Team Abbreviations</h3>
        <table>
            <tr>
                <th>Team</th>
                <th>Abbreviation</th>
            </tr>
            <tr>
                <td>Atlanta Hawks</td>
                <td>ATL</td>
            </tr>
            <tr>
                <td>Boston Celtics</td>
                <td>BOS</td>
            </tr>
            <tr>
                <td>Brooklyn Nets</td>
                <td>BKN</td>
            </tr>
            <tr>
                <td>Charlotte Hornets</td>
                <td>CHA</td>
            </tr>
            <tr>
                <td>Chicago Bulls</td>
                <td>CHI</td>
            </tr>
            <tr>
                <td>Cleveland Cavaliers</td>
                <td>CLE</td>
            </tr>
            <tr>
                <td>Dallas Mavericks</td>
                <td>DAL</td>
            </tr>
            <tr>
                <td>Denver Nuggets</td>
                <td>DEN</td>
            </tr>
            <tr>
                <td>Detroit Pistons</td>
                <td>DET</td>
            </tr>
            <tr>
                <td>Golden State Warriors</td>
                <td>GSW</td>
            </tr>
            <tr>
                <td>Houston Rockets</td>
                <td>HOU</td>
            </tr>
            <tr>
                <td>Indiana Pacers</td>
                <td>IND</td>
            </tr>
            <tr>
                <td>LA Clippers</td>
                <td>LAC</td>
            </tr>
            <tr>
                <td>Los Angeles Lakers</td>
                <td>LAL</td>
            </tr>
            <tr>
                <td>Memphis Grizzlies</td>
                <td>MEM</td>
            </tr>
            <tr>
                <td>Miami Heat</td>
                <td>MIA</td>
            </tr>
            <tr>
                <td>Milwaukee Bucks</td>
                <td>MIL</td>
            </tr>
            <tr>
                <td>Minnesota Timberwolves</td>
                <td>MIN</td>
            </tr>
            <tr>
                <td>New Orleans Pelicans</td>
                <td>NO</td>
            </tr>
            <tr>
                <td>New York Knicks</td>
                <td>NYK</td>
            </tr>
            <tr>
                <td>Oklahoma City Thunder</td>
                <td>OKC</td>
            </tr>
            <tr>
                <td>Orlando Magic</td>
                <td>ORL</td>
            </tr>
            <tr>
                <td>Philadelphia 76ers</td>
                <td>PHI</td>
            </tr>
            <tr>
                <td>Phoenix Suns</td>
                <td>PHX</td>
            </tr>
            <tr>
                <td>Portland Trail Blazers</td>
                <td>POR</td>
            </tr>
            <tr>
                <td>Sacramento Kings</td>
                <td>SAC</td>
            </tr>
            <tr>
                <td>San Antonio Spurs</td>
                <td>SAS</td>
            </tr>
            <tr>
                <td>Toronto Raptors</td>
                <td>TOR</td>
            </tr>
            <tr>
                <td>Utah Jazz</td>
                <td>UTA</td>
            </tr>
            <tr>
                <td>Washington Wizards</td>
                <td>WSH</td>
            </tr>
        </table>
    </div>
</body>
</html>
