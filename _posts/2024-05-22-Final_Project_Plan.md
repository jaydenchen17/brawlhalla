---
toc: False
comments: True
layout: post
title: Trimester 3 Final Project Planning
type: tangibles
courses: {'compsci': {'week': 3}}
---

# Final Project Plans

- Incorporate LEBRON Stat prediction algorithm for "predicted stats" category each matchup
- Finish the prizepicks simulator by implementing an interactice currency system that allows the user to successfully wager a selected amount of money and either win or lose based on a three leg parlay.
- Improve aesthetics by theming the website more LeBron focused
- Add algorithm to track the user's balance
- fix algorithm for simulate game to save user balance and move to next matchup


# Overall Idea

- Our feature on the CPT is a 3 leg parlay game simulation for LeBron James and his in-game statistics. The "PrizePicks" simulator allows the user to choose over or under on points, rebounds, and assists.
- We are in the progress of adding a currency system in which the user can wager a certain amount of fake money on each bet, gaining or losing as a result.
* We plan on adding a search bar for the user to specifically choose what team they want to bet against.

# Loops/Iteration:

- Each time a user bets correctly the system records this action and updates the user's balance count
* This involves iterating through user actions to identify if the user was successful in their bet to update
- The algorithm iterates over the statistics of LeBron vs. other teams to locate the one that is being evaluated
* For each upvoted message, the system increments the user's balance count proportional to the user's bet.

# Sorting/Big O:

- The algorithm sorts the list of teams based on the alphabetical order of the teams' names in descending order
* This sorting step rearranges the teams so that those with the earliest first letters appear at the top
* Sorting involves iterating through the list of teams to compare names and arrange them accordingly