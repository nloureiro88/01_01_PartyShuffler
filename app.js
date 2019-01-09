
const renderPlayers = () => {
	const inputLoc = document.querySelector('#input ul')
	inputLoc.innerHTML = "";
	playerList.forEach((pl) => {
		const id = playerList.indexOf(pl)
		const inputHTML = `<li id="input-${id}">${pl}</li>`
		inputLoc.insertAdjacentHTML('beforeend', inputHTML)
		inputLoc.lastChild.addEventListener('click', (event) => deletePlayer(event.target.id))
	})
}

const deletePlayer = (index) => {
  const id = index.split("-").pop()
  const name = playerList[id]
  playerList.splice(id, 1)
  const item = document.getElementById(`input-${id}`)
  item.remove()
  renderPlayers()
  playerSort = []
  /*renderResults()*/
  const nameIndex = playerSort.indexOf(name)
  playerSort.splice(nameIndex, 1)
  const item2 = document.getElementById(`output-${name}`)
  item2.remove()
};

const sortTeams = (teamSet) => {
	let teamSeq = [1]
	if (teamSet == 2){
		teamSeq.push(2)
	} else if (teamSet == 3) {
		teamSeq.push(2, 3)
	} else if (teamSet == 4) {
		teamSeq.push(2, 3, 4)
	}
	while (teamArray.length < playerSort.length){
		teamSeq.forEach((id) => {teamArray.push(teamSeq[id-1])})
	}
}

const renderResults = () => {
	const outputLoc = document.querySelector('#output ul')
	outputLoc.innerHTML = "";
	teamArray = []
	const teamSet = document.getElementById('team').value
	sortTeams(teamSet)
	playerSort.forEach((pl) => {
		const id = playerSort.indexOf(pl)
		if (teamSet == 1) { 
			const outputHTML = `<li id="output-${pl}">
				<span class="order">${id+1}</span>
				<span class="name">${pl}</span>
				</li>`
			outputLoc.insertAdjacentHTML('beforeend', outputHTML)
		}
		else {
			const ts = teamArray[id] 
			const outputHTML = `<li id="output-${pl}">
				<span class="order">${id+1}</span>
				<span class="name">${pl}</span>
				<span class="team-${ts}">team ${ts}</span>
				</li>`
			outputLoc.insertAdjacentHTML('beforeend', outputHTML)
		}
	})
	
}

let teamArray = [];
let playerList = [];
let playerSort = [];

document.addEventListener("DOMContentLoaded", function(event) {
	console.log('Party shuffler is running...')

	//Add players to list
	const form = document.querySelector('#friends')
	form.addEventListener('submit', function(event) {
		event.preventDefault()
		const name = document.getElementById('newitem').value.toLowerCase()
		if (name != '' && playerList.indexOf(name)<0){
			playerList.push(name)
			let id = playerList.indexOf(name)
			renderPlayers()
		} else {
			if (name == '') {
				alert("Friend name not provided!")
			} else {alert("Friend name already provided!")}
		}
		form.reset()
	})

	//Delete player from list
	const tile = document.querySelector('#input ul')
	tile.addEventListener('click', function(event) {
		const index = playerList.indexOf(this)
		deletePlayer(index)
		renderPlayers()
		playerSort = []
		renderResults()
	})

	//Reset results
	const sreset = document.querySelector('#sreset')
	sreset.addEventListener('click', function(event) {
		playerSort = []
		renderResults()
	})

	//Sort all players
	const sall = document.querySelector('#sall')
	sall.addEventListener('click', function(event) {
		if (playerSort.length == playerList.length) {
			playerSort = []
		}	
		for (let i = 0; playerSort.length < playerList.length; i++){
			let num = Math.floor(Math.random() * playerList.length)
			if (playerSort.indexOf(playerList[num])<0){
				len = playerSort.length
				playerSort.push(playerList[num])
			}
		}
		renderResults()
	})

	//Sort all players
	const snext = document.querySelector('#snext')
	snext.addEventListener('click', function(event) {
		const currentLen = playerSort.length
		if (playerList.length > 0 && playerList.length > playerSort.length) {
			while (playerSort.length == currentLen) {
				let num = Math.floor(Math.random() * playerList.length)
				if (playerSort.indexOf(playerList[num])<0){
					len = playerSort.length
					playerSort.push(playerList[num])
				}
				if (playerSort.length > currentLen) {break}
			}
			renderResults()
		}
	})

})