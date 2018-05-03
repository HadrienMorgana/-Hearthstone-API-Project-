#!/usr/bin/env node
const request = require('axios')
const program = require('commander')
const inquirer = require('inquirer')
const fs = require('fs')

const adresse = 'https://api.hearthstonejson.com/v1/18336/frFR/cards.json'



program
    .version('1.0.0')
    .option('-o, --obtensible','Ne montre que les cartes obtensibles')
    .option('-O, --nonObtensible','Ne montre pas les cartes obtensibles')
    .option('-c, --class [class]', 'Affiche les cartes de la classe')
    //Erreur nom
    //.option('-n, --name [name]', 'Affiche les cartes qui ont le nom donné')
    .option('-e, --extension [name]', 'Affiche les cartes selon l extension')
    .option('-C, --cost [cost]', 'Affiche les cartes selon le coût')
    //Erreur nom
    //.option('-a, --artist [name]', 'Affiche les cartes selon l artiste')
    .option('-r, --rarity [rarity]', 'Affiche les cartes par rareté')
    .option('-t, --type [type]', 'Affiche les cartes par type')
    .option('-s, --select','Selection avec menu')
    .option('-w, --write', 'Ajoute des cartes dans le deck')
    .option('-d, --deck','Affiche les cartes du deck')
    .option('-E, --erase','Détruit le deck')

program.parse(process.argv)



let VarTri

let Collectible = ['false', 'true']
let Names = []
let Ids = []
let Classes = []
let Extensions = []
let Costs = []
let Artist =[]
let Rarity = []
let Type = []

let AllCardsDatas = {}

let AllCards = []
let SortCards = []
let SortCards2 =[]
let ActualsCards = []

const ObjectTransiTabs = {collectible: Collectible, name: Names, cardClass: Classes, id: Ids, set: Extensions, cost: Costs, rarity: Rarity, type: Type, artist: Artist}
const TabValCard = ['collectible','name','cardClass','id','set','cost','rarity','type','artist']



let QuestionCard = {type: 'list', name: 'WhatAllCards', message: 'Que voulez vous savoir sur la carte ?', choices: TabValCard}
let QuestionCardPrecise = {type : 'list', name: 'WhatSpeVal', message: 'Précisez la requete'}




const EraseFile = async () => {
	fs.unlink('Deck.json', function (err) {
		if (err) throw err
	})
	return 'Fichier effacé'
}

const defPreciseQuestion = (x) => {
	QuestionCardPrecise.choices = x
}

const getAllCards = async () => {
	return request.get(adresse)
}

const defTab = async () => {
	for (var i = AllCards.length - 1; i >= 0; i--) {
		if (Classes.includes(AllCards[i].cardClass) == false && AllCards[i].cardClass !== undefined) {
			Classes.push(AllCards[i].cardClass)
		}
		if (Extensions.includes(AllCards[i].set) == false && AllCards[i].set !== undefined) {
			Extensions.push(AllCards[i].set)
		}
		if (Artist.includes(AllCards[i].artist) == false && AllCards[i].artist !== undefined) {
			Artist.push(AllCards[i].artist)
		}
		if (Rarity.includes(AllCards[i].rarity) == false && AllCards[i].rarity !== undefined) {
			Rarity.push(AllCards[i].rarity)
		}
		if (Type.includes(AllCards[i].type) == false && AllCards[i].type !== undefined) {
			Type.push(AllCards[i].type)
		}
		if (Costs.includes(String(AllCards[i].cost)) == false && AllCards[i].cost !== undefined) {
			Costs.push(String(AllCards[i].cost))
		}
		if (Names.includes(AllCards[i].name) == false && AllCards[i].name !== undefined) {
			Names.push(AllCards[i].name)
		}
		if (Ids.includes(AllCards[i].id) == false && AllCards[i].id !== undefined) {
			Ids.push(AllCards[i].id)
		}
	}
	return 'Tableaux construits'
}





const main = async () => {
	try {
		AllCardsDatas = await getAllCards()
		AllCards = AllCardsDatas.data
		ActualsCards = AllCards

		console.log(await defTab())

		


		


		if (program.obtensible) {
			for (let i = ActualsCards.length - 1; i >= 0; i--) {
				if (ActualsCards[i].collectible == true) {
					SortCards.push(ActualsCards[i])
				}
			}
			ActualsCards = SortCards
			console.log(ActualsCards)
		}


		if (program.nonObtensible) {
			for (let i = ActualsCards.length - 1; i >= 0; i--) {
				if (ActualsCards[i].collectible == true) {
					SortCards.push(ActualsCards[i])
				}
			}
			for (let i = ActualsCards.length - 1; i >= 0; i--) {
				if (SortCards.includes(ActualsCards[i]) == false) {
					SortCards2.push(ActualsCards[i])
				}
			}
			ActualsCards = SortCards2
			console.log(ActualsCards)
		}


		if (program.class) {
			if (Classes.includes(program.class.toUpperCase())) {
				for (let i = ActualsCards.length - 1; i >= 0; i--) {
					if (ActualsCards[i].cardClass == program.class.toUpperCase()) {
						SortCards.push(ActualsCards[i])
					}
				}
				ActualsCards = SortCards
				console.log(ActualsCards)
			} else {
				console.log("La classe demandée n'existe pas. Les classes sont : ")
				for (var i = Classes.length - 1; i >= 0; i--) {
					console.log(Classes[i])
				}		
			}
		}


		if (program.extension) {
			if (Extensions.includes(program.extension.toUpperCase())) {
				for (let i = ActualsCards.length - 1; i >= 0; i--) {
					if (ActualsCards[i].set == program.extension.toUpperCase()) {
						SortCards.push(ActualsCards[i])
					}
				}
				ActualsCards = SortCards
				console.log(ActualsCards)
			} else {
				console.log("L'extension demandée n'existe pas. Les extensions sont : ")
				for (var i = Extensions.length - 1; i >= 0; i--) {
					console.log(Extensions[i])
				}		
			}
		}


		if (program.cost) {
			for (let i = ActualsCards.length - 1; i >= 0; i--) {
				if (ActualsCards[i].cost == program.cost) {
					SortCards.push(ActualsCards[i])
				}
			}
			ActualsCards = SortCards
			console.log(ActualsCards)
		}


		if (program.rarity) {
			if (Rarity.includes(program.rarity.toUpperCase())) {
				for (let i = ActualsCards.length - 1; i >= 0; i--) {
					if (ActualsCards[i].rarity == program.rarity.toUpperCase()) {
						SortCards.push(ActualsCards[i])
					}
				}
				ActualsCards = SortCards
				console.log(ActualsCards)
			} else {
				console.log("La rareté demandée n'existe pas. Les raretés sont : ")
				for (var i = Rarity.length - 1; i >= 0; i--) {
					console.log(Rarity[i])
				}		
			}
		}


		if (program.type) {
			if (Type.includes(program.type.toUpperCase())) {
				for (let i = ActualsCards.length - 1; i >= 0; i--) {
					if (ActualsCards[i].type == program.type.toUpperCase()) {
						SortCards.push(ActualsCards[i])
					}
				}
				ActualsCards = SortCards
				console.log(ActualsCards)
			} else {
				console.log("Le type de carte demandé n'existe pas. Les types de cartes sont : ")
				for (var i = Type.length - 1; i >= 0; i--) {
					console.log(Type[i])
				}		
			}
		}


		if (program.select){
			inquirer.prompt(QuestionCard)
			.then(answers => {
				VarTri = answers.WhatAllCards
				defPreciseQuestion(ObjectTransiTabs[answers.WhatAllCards])
				inquirer.prompt(QuestionCardPrecise)
				.then(answers => {
					for (let i = ActualsCards.length - 1; i >= 0; i--) {
						if (ActualsCards[i][VarTri] == answers.WhatSpeVal) {
							SortCards.push(ActualsCards[i])
						}
					}
					ActualsCards = SortCards
					SortCards =[]
					console.log(ActualsCards)
				})
			})
		}


		if (program.write){
			inquirer.prompt(QuestionCard)
			.then(answers => {
				VarTri = answers.WhatAllCards
				defPreciseQuestion(ObjectTransiTabs[answers.WhatAllCards])
				inquirer.prompt(QuestionCardPrecise)
				.then(answers => {
					for (let i = ActualsCards.length - 1; i >= 0; i--) {
						if (ActualsCards[i][VarTri] == answers.WhatSpeVal) {
							SortCards.push(ActualsCards[i])
						}
					}
					ActualsCards = SortCards
					SortCards =[]
					console.log(ActualsCards)
					for (var i = ActualsCards.length - 1; i >= 0; i--) {
						fs.appendFile('Deck.json', String(ActualsCards[i].id)+'\n', (err) => {
							if (err) throw err
							})
					}
					console.log('Saved!')
				})
			})
		}


		if (program.deck) {
			fs.readFile('Deck.json', 'utf-8', (err, data) => {
				if (err) throw err
				console.log(data)
			})
		}


		if (program.erase) {
			console.log(await EraseFile())
		}






		






		/*
		problème de lecture de var artist. espace et majs

		if (program.artist) {
			if (Artist.includes(program.artist)) {
				for (let i = ActualsCards.length - 1; i >= 0; i--) {
					if (ActualsCards[i].set == program.artist) {
						SortCards.push(ActualsCards[i])
					}
				}
				ActualsCards = SortCards
			} else {
				console.log("L'artiste demandée n'existe pas. Les artistes sont : ")
				for (var i = Artist.length - 1; i >= 0; i--) {
					console.log(Artist[i])
				}			
				ActualsCards = []
			}
		}*/


		/*
		problème nom. fonctions dans la condition if ?

		if (program.name) {
			for (let i = ActualsCards.length - 1; i >= 0; i--) {
				if (ActualsCards[i].name.toLowerCase().replace(/ /g, "") == program.name) {
					SortCards.push(ActualsCards[i])
				}
			}
			ActualsCards = SortCards
			// console.log(ActualsCards[20].name.toLowerCase().replace(/ /g, ""))
		}*/



		

		

		





	}	
	catch (e) {
		console.error(e)
	}
}
main()