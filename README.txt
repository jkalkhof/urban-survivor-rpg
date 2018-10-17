README.txt

Urban Survival RPG

copyright 2018 Jerry Kalkhof

This project is based off the html5 game engine melonjs.

Major features
-isometric map movement
-inventory system
-achievement system

version 1.0
This version is very basic and only has basic movement of the main character.
Gather items from around the city to reach the 3 achievement goals.

This project was built using the following tools:
-atom - text editor
-tiled - tilemap editor
-TexturePacker - sprite packing tool

CREDITS
This project also used art assets from OpenGameArt.org:
Simerion tiles by Yoann Sculo
	https://opengameart.org/content/simerion-tiles-and-images
Jerry City Pack by Jerry Kalkhof
	https://opengameart.org/content/jerrycitypack
SciFi background image by Eris
	https://opengameart.org/content/sci-fi-platform-tiles
UI from Buch
	https://opengameart.org/content/golden-ui-bigger-than-ever-edition
UI pack from Kenny.nl
	https://opengameart.org/content/ui-pack
Player sprite sheet by Knight Yamato
	https://www.deviantart.com/knightyamato/art/Blank-Sprite-Sheet-4-2-129192797
Sound FX by Lokif
	https://opengameart.org/content/gui-sound-effects
	
Run Instructions for Windows
1. install ubuntu - microsoft windows subsystem
	https://www.microsoft.com/en-us/p/ubuntu/9nblggh4msv6#activetab=pivot:overviewtab
2. use nodejs to install http server
	mkdir node_modules
	sudo npm install http-server -g
3. run http server		
	export PATH=./node_modules/.bin:$PATH
	echo $PATH
	http-server -a localhost -p 8000 -c-1	
4. run app from localhost
	http://localhost:8000/Jerry-isometric-rpg/
	
This game can also be tested live from my itch.io page:
https://jerryartist.itch.io/urban-survivor