# File tree has to be :
```
./
│
├───break
│       card.png
│       diamond.png
│       longcard.png
│       round.png
│       square.png
│       team.png
│
├───default
│       card.png
│       diamond.png
│       gacha.png
│       longcard.png
│       round.png
│       square.png
│       team.png
│
└───v1
        card.png
        diamond.png
        longcard.png
        round.png
        square.png
        team.png
```
Rename char_xxx directory to default
Rename char_xxx_v1 directory to v1
Rename char_xxx_break directory to break

Put all 3 in a directory with the ID of the character (i.e. doing char_0XX, put in folder XX)

in file info.json, put the following 
```json
{
    "default" : true,
    "break" : true,
    "v1" : true
}
```
when a directory is present, put true, otherwise, false