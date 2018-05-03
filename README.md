# Hearthstone API project 

**Installation :**

Une fois les fichiers téléchargés, aller dans votre dossier où ils se trouvent et faire : ```
sudo npm install```

**Commandes :**

 > HearthstoneCards -o ou --obtenable, Ne montre que les cartes obtenables.
	
 > HearthstoneCards -O ou --nonObtenable, Ne montre que les cartes non-obtenables.
	
 > HearthstoneCards -c ou --class [class], Affiche les cartes de la classe, requiert un nom de classe suivant : Neutral, Druid, Rogue, Hunter,  Paladin, Shaman, Warlock, Priest, Warrior, Mage, Deathknight, Dream.
	
 > HearthstoneCards -e ou --extension [name], Affiche les cartes selon l extension, requiert un nom d'extension suivante : Core, Tgt, Ungoro,  Gvg, Og, Tb, Loe, Gangs, Brm, Expert1, Missions, Credits, Naxx, Cheat, Kara, Hof, Hero_skins.
	
 > HearthstoneCards -C ou --cost [cost], Affiche les cartes selon le coût, requiert un des nombres suivants : 0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 25, 50. Si aucun coût n'est précisé affiche les cartes de coût 1.
	
 > HearthstoneCards -r ou --rarity [rarity], Affiche les cartes par rareté, requiert une des raretés suivantes : Free, Common, Rare, Epic, Legendary.
	
 > HearthstoneCards -t ou --type [type], Affiche les cartes par type, requiert un des types suivants : Minion, Spell, Hero, Hero_power, Weapon.
	
 > HearthstoneCards -s ou --select, Selection des cartes via un menu.
	
 > HearthstoneCards  -w ou -write, Ajoute des cartes dans un fichier "Deck.json" et créer le fichier si il n'existe pas.
 
 > HearthstoneCards -d ou --deck, Affiche les cartes du fichier "Deck.json".
 
 > HearthstoneCards -E ou --erase, Détruit le fichier "Deck.json".
