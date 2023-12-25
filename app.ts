interface Game {
    id: number;
    teams: string[];
    odds: number[];
    sport: string;
}

interface BetData {
    selections: { team: string; odds: number }[];
    accumulatedOdd: number;
    totalBetValue: number;
}

// Lista de jogos disponíveis
const games: Game[] = [
    { id: 1, teams: ['Flamengo', 'Empate', 'Corinthians'], odds: [1.7, 2.2, 1.9], sport: 'Futebol' },
    { id: 2, teams: ['Palmeiras', 'Empate', 'Bahia'], odds: [1.3, 2.8, 4.7], sport: 'Futebol' },
    { id: 3, teams: ['Inter', 'Empate', 'São Paulo'], odds: [1.9, 2.5, 2.5], sport: 'Futebol' },
    { id: 4, teams: ['Liverpool', 'Empate', 'Manchester City'], odds: [1.6, 1.5, 1.5], sport: 'Futebol' },
    { id: 5, teams: ['Real Madrid', 'Empate', 'Real Betis'], odds: [1.8, 2.3, 4.5], sport: 'Futebol' },
    { id: 6, teams: ['Lakers', 'Empate', 'Nuggets'], odds: [1.6, 1.5, 2.0], sport: 'Basquete' },
    { id: 7, teams: ['Cleveland Cavaliers', 'Empate', 'Boston Celtics'], odds: [1.9, 1.8, 2.4], sport: 'Basquete' },
    { id: 8, teams: ['Oklahoma City Thunder', 'Empate', 'Memphis Grizzlies'], odds: [2.1, 2.1, 2.0], sport: 'Basquete' },
    { id: 9, teams: ['Chicago Bulls', 'Empate', 'Brooklyn Nets'], odds: [1.4, 1.7, 2.6], sport: 'Basquete' },
    { id: 10, teams: ['Phoenix Suns', 'Empate', 'Mavericks'], odds: [2.2, 1.9, 2.6], sport: 'Basquete' },
    { id: 11, teams: ['Roger Federer', 'Empate', 'Rafael Nadal'], odds: [1.6, 2.0, 1.8], sport: 'Tênis' },
    { id: 12, teams: ['Novak Djokovic', 'Empate', 'Andy Murray'], odds: [1.2, 1.8, 2.7], sport: 'Tênis' },
    { id: 13, teams: ['Carlos Alcaraz', 'Empate', 'Ben Shelton'], odds: [1.4, 2.1, 2.5], sport: 'Tênis' },
    { id: 14, teams: ['Daniil Medvedev', 'Empate', 'Stefanos Tsitsipas'], odds: [1.9, 2.2, 1.8], sport: 'Tênis' },
    { id: 15, teams: ['Casper Rudd', 'Empate', 'Tommy Paul'], odds: [2.8, 2.5, 2.2], sport: 'Tênis' },
];

// Extraindo uma lista de esportes únicos
const sportsList: string[] = [...new Set(games.map(game => game.sport))];

// Objeto para rastrear as odds acumuladas
const accumulatedOdds: { [key: number]: number } = {};

// Objeto para rastrear as odds das divs selecionadas por jogo

//const selectedOdds: { [key: number]: number[] } = {};

// Função para exibir os esportes na página
function displaySports() {
    const sportsContainer = document.getElementById('sports-list');

    if (!sportsContainer) {
        console.log('Elemento "sports-list" não encontrado no DOM.');
        return;
    }

    const sportsList: string[] = [...new Set(games.map(game => game.sport))];

    sportsList.forEach((sport) => {
        const sportElement = document.createElement('div');
        sportElement.classList.add('sport');
        sportElement.textContent = sport;
        sportElement.onclick = () => redirectToSportPage(sport);
        sportsContainer.appendChild(sportElement);
    });
}

// Função para redirecionar o usuário para a lista de jogos de um esporte específico
function redirectToSportPage(sport: string) {
    const sportGames = games.filter(game => game.sport === sport).slice(0, 5);
    displayGames(sportGames);
}

// Variável para armazenar os jogos selecionados
let selectedGames: Game[] = [];

// Lista para armazenar as seleções feitas
const selections: { gameId: number; team: string; odds: number }[] = [];
let userSelections: { [key: number]: boolean } = {};

// Lista para armazenar os boletins
const betSlips: { selections: any[]; accumulatedOdd: number; betAmount: number }[] = [];

// Função para adicionar uma seleção à lista
function addSelection(gameId: number) {
    userSelections[gameId] = true;
}

// Função para verificar se a seleção já foi feita
function isSelectionAlreadyMade(gameId: number): boolean {
    return userSelections[gameId] === true;
}

// Função para adicionar um jogo à lista de seleções
function addToSelections(gameId: number, team: string, odds: number) {
    selections.push({ gameId, team, odds });
    displaySelections();
}

// Função para exibir as seleções na página
function displaySelections() {
    const selectionsContainer = document.getElementById('selections-list');

    if (!selectionsContainer) {
        console.error('Elemento "selections-list" não encontrado no DOM.');
        return;
    }

    selectionsContainer.innerHTML = '';
    selectionsContainer.style.display = 'block';

    // Adicione a classe 'selection-container' ao elemento pai
    const selectionContainerElement = document.createElement('div');
    selectionContainerElement.classList.add('selection-container');

    selections.forEach((selection, index) => {
        const selectionElement = document.createElement('div');
        selectionElement.classList.add('selection');  // Adicione a classe 'selection' aqui
        selectionElement.innerHTML = `
            <p>${selection.team}  <button class="remove-selection" data-game-id="${selection.gameId}">-</button> <span>(${selection.odds})</span></p>
        `;
        selectionContainerElement.appendChild(selectionElement);
    });

    // Adicione a seleção container ao elemento pai 'selections-list'
    selectionsContainer.appendChild(selectionContainerElement);
}

// Função para remover uma seleção da lista
function removeFromSelections(gameId: number) {
    const index = selections.findIndex(selection => selection.gameId === gameId);

    if (index !== -1) {
        selections.splice(index, 1);
        delete userSelections[gameId];
        displaySelections();
    }
}

// Exporte a função displayOddAccumulated
function displayOddAccumulated(accumulatedOdd: number) {
    const accumulatedOddElement = document.getElementById('accumulated-odd');

    if (accumulatedOddElement) {
        if (!isNaN(accumulatedOdd)) {
            accumulatedOddElement.textContent = `Odd Acumulada: ${accumulatedOdd.toFixed(2)}`;
        } else {
            accumulatedOddElement.textContent = 'Odd Acumulada: -';
        }
    }
}

// Evento de clique nas divs dos times para calcular e exibir a odd acumulada
document.addEventListener('click', (event: MouseEvent) => {
    const target = event.target as HTMLElement;
    const teamElement = target.closest('.teamA, .Emp, .teamB');
    const gameElement = target.closest('.game');
    const removeButton = target.closest('.remove-selection');

    if (teamElement && gameElement) {
        const gameId = parseInt(gameElement.getAttribute('data-game-id') || '0');

        // Verifica se a seleção já foi feita
        if (isSelectionAlreadyMade(gameId)) {
            alert('Você já colocou resultado nessa partida');
        } else {
            const team = teamElement.textContent?.trim() || '';
            const odds = parseFloat(teamElement.getAttribute('data-odds') || '0');

            // Adiciona a seleção à lista
            selections.push({ gameId, team, odds });
            userSelections[gameId] = true;
            displaySelections();

            // Inicializa as odds acumuladas para este jogo se ainda não estiverem definidas
            if (accumulatedOdds[gameId] === undefined) {
                accumulatedOdds[gameId] = 0;
            }

            // Adiciona a odd atual às odds acumuladas para este jogo
            accumulatedOdds[gameId] += odds;

            // Calcula a odd acumulada total para todos os jogos
            const totalAccumulatedOdd = Object.keys(accumulatedOdds).map(key => parseInt(key)).map(key => accumulatedOdds[key]).reduce((acc, odd) => acc + odd, 0);

            // Exibe a odd acumulada total
            displayOddAccumulated(totalAccumulatedOdd);
        }
    } else if (removeButton) {
        const index = parseInt(removeButton.getAttribute('data-game-id') || '0');
        removeFromSelections(index);
        displaySelections();
    }
});

// Função para exibir os jogos na página
function displayGames(gamesList: Game[] = games) {
    const gamesContainer = document.getElementById('games-list');

    if (!gamesContainer) {
        console.log('Elemento "games-list" não encontrado no DOM.');
        return;
    }

    gamesContainer.innerHTML = '';

    gamesList.forEach((game, index) => {
        // Inicializa as odds acumuladas para cada jogo
        accumulatedOdds[index] = 0;

        const gameElement = document.createElement('div');
        gameElement.classList.add('game');
        gameElement.setAttribute('data-game-id', `${index}`);
        gameElement.innerHTML = `
            <div class="game-info">
                <div class="teamA" data-odds="${game.odds[0]}"><span id="Times">${game.teams[0]}</span> <span id="OddTimes">Odd:${game.odds[0]}</span></div>
                <div class="Emp" data-odds="${game.odds[1]}"><span id="Times">${game.teams[1]}</span> <span id="OddTimes">Odd:${game.odds[1]}</span></div>
                <div class="teamB" data-odds="${game.odds[2]}"><span id="Times">${game.teams[2]}</span> <span id="OddTimes">Odd:${game.odds[2]}</span></div>
            </div>
        `;
        gamesContainer.appendChild(gameElement);
    });
}

// Função para exibir o boletim com as apostas realizadas na tela de boletins
function displayBetSlipOnBoletim(betData?: BetData) {
    const betSlipContainer = document.getElementById('bet-slip');

    if (!betSlipContainer) {
        console.log('Elemento "bet-slip" não encontrado no DOM.');
        return;
    }

    betSlipContainer.innerHTML = '';
    betSlipContainer.style.display = 'flex';

    const betSlipElement = document.createElement('div');
    betSlipElement.classList.add('bet-slip-container');

    // Verifica se há dados da aposta para exibir
    if (betData && betData.selections && betData.selections.length > 0) {
        // Mostra a div do jogo selecionado
        betSlipElement.style.display = 'flex';

        // Adicione os jogos selecionados
        betData.selections.forEach((selection) => {
            const selectionParagraph = document.createElement('p');
            selectionParagraph.textContent = `${selection.team} (${selection.odds})`;
            betSlipElement.appendChild(selectionParagraph);
        });

        // Adicione a odd acumulada
        const accumulatedOddParagraph = document.createElement('p');
        accumulatedOddParagraph.textContent = `Odd Acumulada: ${betData.accumulatedOdd.toFixed(2)}`;
        betSlipElement.appendChild(accumulatedOddParagraph);

        // Adicione o valor da aposta
        const betAmountParagraph = document.createElement('p');
        betAmountParagraph.textContent = `Valor da Aposta Total: R$ ${betData.totalBetValue.toFixed(2)}`;
        betSlipElement.appendChild(betAmountParagraph);
    } else {
        // Se não houver dados, exiba uma mensagem indicando que não há apostas
        const noBetsMessage = document.createElement('p');
        noBetsMessage.textContent = 'Nenhuma aposta realizada.';
        betSlipElement.appendChild(noBetsMessage);
    }

    // Adicione o boletim ao elemento pai 'bet-slip'
    betSlipContainer.appendChild(betSlipElement);
}

// Evento DOMContentLoaded
document.addEventListener('DOMContentLoaded', () => {

    // Recupera o valor do depósito da localStorage
    const storedDepositAmount = localStorage.getItem('depositAmount');

    if (storedDepositAmount) {
        // Atualiza o conteúdo do parágrafo com o valor recuperado
        createInputDesp.innerText = `Você tem em seu depósito R$${parseFloat(storedDepositAmount).toFixed(2)}`;
    }

    // Lógica para atualizar os boletins
    const refreshBetSlipButton = document.getElementById('refresh-bet-slip');
    const betSlipContainer = document.getElementById('bet-slip');

    if (!refreshBetSlipButton || !betSlipContainer) {
        console.log('Elementos não encontrados no DOM.');
        return;
    }

    refreshBetSlipButton.addEventListener('click', () => {
        // Verifica se a página atual é a de boletim
        const isBoletimPage = window.location.pathname.includes('boletim.html');

        if (isBoletimPage) {
            // Recupere os dados da localStorage
            const storedBetData = localStorage.getItem('betData');

            if (storedBetData) {
                // Parse dos dados armazenados
                const betData = JSON.parse(storedBetData);
                // Exibe o boletim na tela de boletins
                displayBetSlipOnBoletim(betData);
            } else {
                console.error('Nenhum dado de aposta encontrado na localStorage.');
                // Se não houver dados, exibe uma mensagem indicando que não há apostas
                betSlipContainer.innerHTML = '<p>Nenhuma aposta realizada.</p>';
            }
        }
    });
});

// Limpa o boletim
function clearBetSlip() {
    const betAmountInput = document.getElementById('amount') as HTMLInputElement;
    betAmountInput.value = '';  // Limpa o valor da aposta
    displaySelections();  // Limpa as seleções
}

// Evento de clique no botão de fazer aposta
function placeBet() {
    const amountInput = document.getElementById('amount') as HTMLInputElement;
    const accumulatedOddElement = document.getElementById('accumulated-odd');

    if (!amountInput || !accumulatedOddElement || !createInputDesp) {
        console.error('Elementos não encontrados no DOM.');
        return;
    }

    const amount = parseFloat(amountInput.value);
    const accumulatedOddText = accumulatedOddElement.textContent;
    const accumulatedOdd = parseFloat(accumulatedOddText?.replace('Odd Acumulada: ', '') || '0');

    if (isNaN(amount) || isNaN(accumulatedOdd)) {
        console.error('Valor de aposta ou odd acumulada inválido.');
        return;
    }

    // Verifica se o valor da aposta é maior do que o valor no depósito
    const depositAmountText = createInputDesp.textContent;
    const depositAmount = parseFloat(depositAmountText?.replace('Você tem em seu depósito R$', '') || '0');

    if (isNaN(depositAmount) || amount > depositAmount) {
        // Se o valor da aposta for maior do que o valor no depósito, exibe um alerta
        alert('Você não possui esse valor para apostar. Aposte o valor que você tem em seu depósito.');
        return;
    }

    const totalBetValue = amount * accumulatedOdd;


    // Mostra o alerta antes de prosseguir com a aposta
    const confirmBet = confirm(`Você está prestes a fazer uma aposta de R$ ${totalBetValue.toFixed(2)}. Deseja continuar?`);

    if (confirmBet) {

        const betData = {selections, accumulatedOdd, totalBetValue}
        // Armazena os dados na localStorage
        saveBetDataToLocalStorage(betData);

        // Limpa as seleções após salvar
        clearBetSlip();

        // Subtrai o valor apostado do parágrafo
        subtractBetAmountFromParagraph(amount);

        // Limpa a Odd Acumulada e as seleções
        clearAccumulatedOddAndSelections();
    }
}

function Boletim() {
    window.location.href = 'boletim.html'
}

// Função para limpar a Odd Acumulada e as seleções
function clearAccumulatedOddAndSelections() {
    // Limpa a Odd Acumulada
    const accumulatedOddElement = document.getElementById('accumulated-odd');
    if (accumulatedOddElement) {
        accumulatedOddElement.textContent = 'Odd Acumulada: 0.00';
    }

    // Limpa as seleções
    selections.length = 0;
    userSelections = {};
    displaySelections();
}

// Função para subtrair o valor apostado do parágrafo
function subtractBetAmountFromParagraph(amount: number) {
    if (createInputDesp) {
        // Obtém o valor atual no parágrafo
        const currentAmount = parseFloat(createInputDesp.textContent?.replace('Você tem em seu depósito R$', '') || '0');

        // Subtrai o valor digitado
        const newAmount = currentAmount - amount;

        // Atualiza o parágrafo com o novo valor
        createInputDesp.innerText = `Você tem em seu depósito R$${newAmount.toFixed(2)}`;
    }
}

// Função para salvar os dados da aposta na localStorage
function saveBetDataToLocalStorage(betData: BetData) {
    const storedBetData = localStorage.getItem('betData');
    const betSlips = storedBetData ? JSON.parse(storedBetData) : [];

    // Adiciona a nova aposta à lista
    betSlips.push(betData);

    // Salva a lista atualizada na localStorage
    localStorage.setItem('betData', JSON.stringify(betSlips));
}

// Botão para voltar para tela inicial
function backToApostas() {
    // Recupera os dados do depósito e atualiza a tela inicial
    recupereDesp();

    window.location.href = 'index.html'
}

// Variável global para armazenar os valores depositados
const valoresDepositados: number[] = [];

const divDesp = document.getElementById('deposito') as HTMLDivElement;
const createInputDesp = document.createElement('p');
createInputDesp.classList.add('pDesp')
createInputDesp.style.display = 'block';
divDesp.appendChild(createInputDesp);

// Função para realizar um depósito
function Depositar() {
    const inputDesp = document.getElementById('amountDesp') as HTMLInputElement;

    if (!inputDesp) {
        console.log("Item não encontrado");
        return;
    }

    const valueInputDesp = parseFloat(inputDesp.value);

    if (isNaN(valueInputDesp)) {
        console.log("Valor Inválido");
        return;
    }

    const confirmValueDesp = confirm(`Você deseja fazer um depósito de R$${valueInputDesp}?`);

    if (confirmValueDesp) {
        // Recupera o valor atual no parágrafo
        const currentAmount = parseFloat(createInputDesp.textContent?.replace('Você tem em seu depósito R$', '') || '0');

        // Soma o novo valor ao valor atual
        const totalDepositado = currentAmount + valueInputDesp;

        // Atualiza o conteúdo do parágrafo com o novo total
        createInputDesp.innerText = `Você tem em seu depósito R$${totalDepositado.toFixed(2)}`;

        // Salva o novo valor do depósito na localStorage
        localStorage.setItem('depositAmount', totalDepositado.toString());

        // Limpa o valor do Input
        inputDesp.value = '';
    }
}

// Função para recuperar os dados do depósito e exibir na tela inicial
function recupereDesp() {
    const storedDepositAmount = localStorage.getItem('depositAmount');

    if (storedDepositAmount) {
        // Recupera o valor armazenado na localStorage
        const storedAmount = parseFloat(storedDepositAmount);

        // Atualiza o conteúdo do parágrafo com a soma do valor atual e o valor recuperado
        const currentAmount = parseFloat(createInputDesp.textContent?.replace('Você tem em seu depósito R$', '') || '0');
        const newAmount = currentAmount + storedAmount;
        createInputDesp.innerText = `Você tem em seu depósito R$${newAmount.toFixed(2)}`;
    }
}

// Exiba os esportes
displaySports();

// Exiba os jogos
displayGames();