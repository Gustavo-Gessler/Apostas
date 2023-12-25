"use strict";
var __spreadArray = (this && this.__spreadArray) || function (to, from, pack) {
    if (pack || arguments.length === 2) for (var i = 0, l = from.length, ar; i < l; i++) {
        if (ar || !(i in from)) {
            if (!ar) ar = Array.prototype.slice.call(from, 0, i);
            ar[i] = from[i];
        }
    }
    return to.concat(ar || Array.prototype.slice.call(from));
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.displayGames = exports.displaySports = void 0;
// Lista de jogos disponíveis
var games = [
    { id: 1, name: 'Futebol 1', odds: 1.5, sport: 'Futebol' },
    { id: 2, name: 'Futebol 2', odds: 2.0, sport: 'Futebol' },
    { id: 3, name: 'Futebol 3', odds: 1.8, sport: 'Futebol' },
    { id: 4, name: 'Futebol 4', odds: 1.7, sport: 'Futebol' },
    { id: 5, name: 'Futebol 5', odds: 1.6, sport: 'Futebol' },
    { id: 6, name: 'Basquete 1', odds: 1.7, sport: 'Basquete' },
    { id: 7, name: 'Basquete 2', odds: 2.2, sport: 'Basquete' },
    { id: 8, name: 'Basquete 3', odds: 1.9, sport: 'Basquete' },
    { id: 9, name: 'Basquete 4', odds: 1.8, sport: 'Basquete' },
    { id: 10, name: 'Basquete 5', odds: 2.1, sport: 'Basquete' },
    { id: 11, name: 'Tênis 1', odds: 1.8, sport: 'Tênis' },
    { id: 12, name: 'Tênis 2', odds: 2.1, sport: 'Tênis' },
    { id: 13, name: 'Tênis 3', odds: 1.9, sport: 'Tênis' },
    { id: 14, name: 'Tênis 4', odds: 2.0, sport: 'Tênis' },
    { id: 15, name: 'Tênis 5', odds: 2.2, sport: 'Tênis' },
];
// Extraindo uma lista de esportes únicos
var sportsList = __spreadArray([], new Set(games.map(function (game) { return game.sport; })), true);
// Função para exibir os esportes na página
function displaySports() {
    var sportsContainer = document.getElementById('sports-list');
    sportsList.forEach(function (sport) {
        var sportElement = document.createElement('div');
        sportElement.classList.add('sport');
        sportElement.textContent = sport;
        sportElement.onclick = function () { return redirectToSportPage(sport); };
        sportsContainer === null || sportsContainer === void 0 ? void 0 : sportsContainer.appendChild(sportElement);
    });
}
exports.displaySports = displaySports;
// Função para redirecionar o usuário para a lista de jogos de um esporte específico
function redirectToSportPage(sport) {
    var sportGames = games.filter(function (game) { return game.sport === sport; }).slice(0, 5);
    displayGames(sportGames);
}
// Função para exibir os jogos na página
function displayGames(gamesList) {
    if (gamesList === void 0) { gamesList = games; }
    var gamesContainer = document.getElementById('games-list');
    if (!gamesContainer) {
        console.error('Elemento "games-list" não encontrado no DOM.');
        return;
    }
    gamesContainer.innerHTML = '';
    gamesList.forEach(function (game) {
        var gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.innerHTML = "\n            <input type=\"checkbox\" id=\"game-".concat(game.id, "\">\n            <label for=\"game-").concat(game.id, "\">").concat(game.name, " (Odds: ").concat(game.odds, ")</label>\n        ");
        gamesContainer === null || gamesContainer === void 0 ? void 0 : gamesContainer.appendChild(gameElement);
    });
}
exports.displayGames = displayGames;
