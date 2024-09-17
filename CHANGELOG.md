# Notes from the gremlin

So this is selfhosted, ~~https doesn't work for some reason sadly, i'll look into that later as i'm taking a look at the whole server architecture atm~~. <= I fixed it.

Might go down, that's to be expected tho, ping @lele394 on the discord in that case. I can put it back up.

This is **HIGHLY** experimental. Tho the site's skeleton is mostly alright, data needs to be reviewed and verified. If you notice anything, please reach out to me @lele394.

Roadmap is available below. Site might not be up to date with it as updates are not automatic.




# Roadmap

```
- [ ] Miscs
    - [-] Top banner and buttons
    - [ ] Cool themes
    - [ ] Make a cool theme for the roadmap
- [-] Index
    - [x] Changelog overview (still needs style)

- [ ] Data collection
    - [x] Dolls basic infos
    - [x] Dolls more advanced infos
    - [-] Dolls art from the dump [NEED GIF CHECK - VARIANTS NOT ADDED]
    - [ ] Equipment names and descriptions
    - [ ] Dialogues and lines and how to they are linked
    - [ ] Audio : Voice-lines, music, effects 
    - [ ] Other general infos I can gather
- [x] About
    - [x] Credits, etc
- [x] Dolls list page 
- [-] Doll template working
    - [-] Building data JSON file
        - [x] Getting data from dump
        - [-] Adding art
            - [x] GIFs integration
            - [-] Skins display
                - [ ] Still cards [ONGOING]
                - [X] L2Ds 
- [ ] Equipments list page
- [ ] Equipment template working
    - [ ] Building data JSON file
        - [x] Idk I haven't checked that part yet
        - [ ] Getting data from dump
        - [ ] Adding art
- [ ] Story related section
    - [ ] Building data JSON file
        - [x] Idk I haven't checked that part yet
        - [ ] Getting data from dump
    - [ ] Dedicated templates for each realm
- [ ] Maybe stuff
    - [ ] Search function for dolls and equipments
    - [ ] Add voicelines to doll's page
    - [ ] Add music archive/record player
```

<br>
<br>
<br>

# Some dev notes*
Kimaris dump L2Ds I haven't used yet
```
Mode                 LastWriteTime         Length Name
----                 -------------         ------ ----
d-----        21/08/2024     22:51                boss_w1
d-----        21/08/2024     22:51                boss_w2_1
d-----        21/08/2024     22:51                boss_w2_2
d-----        21/08/2024     22:51                boss_w4
d-----        21/08/2024     22:51                boss_w4_break
d-----        21/08/2024     22:51                char001
d-----        21/08/2024     22:51                char001_v1
d-----        21/08/2024     22:51                char010
d-----        21/08/2024     22:51                char013
d-----        21/08/2024     22:52                char056
d-----        21/08/2024     22:52                char_cat
d-----        21/08/2024     22:51                dejase
d-----        21/08/2024     22:51                dejase-break
d-----        21/08/2024     22:52                n003
d-----        21/08/2024     22:52                n006
d-----        21/08/2024     22:52                n007
d-----        21/08/2024     22:52                n008
```

<br>

---

# Changelog 

---

<br>
  
## Alpha 9 - Art update
- Merged Phonfo's work
- Reworked the top bar to work with mobile, now is collapsable

<br>  

## Alpha 8 - L2D release
- Merged L2D branch with main. Should be mostly feature complete
- Ability to view and select L2Ds when available
- Known issue where users cannot scroll on the viewport (expected behavior from pixiL2D)
- Fixed inconsistency in L2D scales.

<br>
  
## Alpha 7 - L2D support 
- Added L2D support, not currently on live build, but on `L2Ds` branch.
- Planned for next release : Adding L2Ds to other dolls, at least first batch
- Deployed test branch on server, site running experimental
- Added L2Ds to everyone

<br>
  
## Alpha 6 - GIF batch 1
- First batch of GIF added
- Not sure if it's all good, there might be some error and missing GIFs.
- Added an icon to the site 
- Added parsing for invalid color html tags
- ~~Left and right arrows navigation~~
- First GIFs check pass
- ***Send hearts to Phonfo for the huge work he put in the animations.***

<br>
  
## Alpha 5 - About
- Added the About page
- Added / to point to /pages/index.html due to current server configuration
- Cleaned some stuff

<br>

## Alpha 4 - Got em moves
- Created a JS script to auto generate info.json files
- Integrated GIFs to doll's pages dynamically
- Integrated variants to doll's pages dynamically
- Added Phonfo's work on UI/imagesets/roles stuff

<br>

## Alpha 3 - Doll dynamic page groundwork
- Did the groundwork for the doll's dynamic page
- Temporary PFP in doll's page, need to change later
- Setup data storage structure

<br>

## Alpha 2 - Doll list working
- Made a working doll list
- Dolls have pfps (most of them, from kimaris thumbnails CDN)
- Links are dead, will fix later

<br>

## Alpha 1 - I mean I try
- First commit
- Trying stuff
- Hopefully that'll work



