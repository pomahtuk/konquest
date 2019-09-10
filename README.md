[![Run on Google Cloud](https://storage.googleapis.com/cloudrun/button.svg)](https://console.cloud.google.com/cloudshell/editor?shellonly=true&cloudshell_image=gcr.io/cloudrun/button&cloudshell_git_repo=https://github.com/pomahtuk/konquest.git)

https://github.com/KDE/konquest

https://konquest-bxwpddcb2q-ew.a.run.app

Main things to be done:
- [x] Add a way to serialize and deserialize game
- [x] Add a way to restore state on client and to save game to cookies on every turn 
- [x] Implement proper routing (route for settings and actual game, with redirect)
- [ ] Implement functionality to let user refresh page and continue game from where they left
- [x] Add post-game stats screen
- [x] Implement 2 more type of Computer player - Deffensive and Offensive
- [ ] If First player is Computer - it is impossible to have a game - fix it.
- [ ] Fix maximum stack reached error when playing with more than one Computer player and no human players left
- [ ] Add balanced (known as BECAI in original game) Computer player
- [ ] Have a proper user-interface designed and implemented
- [ ] Add a way to get back to settings page