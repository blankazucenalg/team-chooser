'use strict';

let teams = [];
let teamsPool = [];
let peopleInTeams = [];
let peopleByTeams = {};

const defineTeams = (event) => {
  event.preventDefault();
  const teamsQuantity = document.getElementById('teams-quantity').value;
  console.log(teamsQuantity);
  const teamsContainer = document.getElementById('teams-container');
  reset();
  const selectedTeamElement = document.querySelector('.selected-team');
  selectedTeamElement.style.backgroundColor = 'transparent';
  for (let i = 0; i < teamsQuantity; i++) {
    const element = document.createElement('div');
    element.className = `generated-team team${i}`
    const teamColor = generateColor();
    element.style.backgroundColor = teamColor;
    element.innerHTML = i + 1;
    teams.push(teamColor);
    teamsContainer.appendChild(element);
  }
  teamsPool = [...teams].sort(() => Math.random() - 0.5);
}

function reset() {
  const teamsContainer = document.getElementById('teams-container');
  teams = [];
  teamsContainer.innerHTML = '';
  peopleInTeams = [];
  peopleByTeams = {};
  const peopleByTeam = document.getElementById('people-by-team');
  peopleByTeam.innerHTML = '';
  const totalPeople = document.getElementById('total-people');
  totalPeople.innerHTML = '';
  const peopleContainer = document.querySelector('.people-in-teams');
  peopleContainer.innerHTML = '';
  const selectedTeamElement = document.querySelector('.selected-team');
  selectedTeamElement.innerHTML = '';
}

const getATeam = () => {
  if (teams.length === 0) {
    return;
  }
  const selectedTeamElement = document.querySelector('.selected-team');
  selectedTeamElement.style.backgroundColor = 'transparent';
  setTimeout(() => {
    const selectedTeamColor = getFromTeamPool();
    selectedTeamElement.style.backgroundColor = selectedTeamColor;
    selectedTeamElement.innerHTML = teams.findIndex(el => el === selectedTeamColor) + 1;
    peopleInTeams.push(selectedTeamColor)
    peopleByTeams[selectedTeamColor] = peopleByTeams[selectedTeamColor] ? peopleByTeams[selectedTeamColor] + 1 : 1;
    const peopleContainer = document.querySelector('.people-in-teams');
    const peopleElement = document.createElement('div');
    peopleElement.className = 'people';
    peopleElement.style.backgroundColor = selectedTeamColor;
    peopleContainer.appendChild(peopleElement);

    const totalPeople = document.getElementById('total-people');
    totalPeople.innerHTML = peopleInTeams.length;
    const peopleByTeam = document.getElementById('people-by-team');
    peopleByTeam.innerHTML = '';
    for (let i = 0; i < teams.length; i++) {
      const el = document.createElement('div');
      el.className = 'people-team'
      el.innerHTML = `(${peopleByTeams[teams[i]] || 0})`;
      peopleByTeam.append(el);
    }
  }, 100);
}

function getFromTeamPool() {
  if (teamsPool.length === 0) {
    teamsPool = [...teams].sort(() => Math.random() - 0.5);
  }
  return teamsPool.shift();
}

function generateColor() {
  let color = '#';
  let digits = '0123456789ABCDEF';
  for (let i = 0; i < 6; i++) {
    // generate a random number between 0 and 15
    let randomDigit = Math.floor(Math.random() * 16);
    // append the random number to the color string
    color += digits[randomDigit];
  }
  return color;
}