KanColle Cache Proxy
=======
This is a local proxy meant to cache KC assets. It can be preloaded from a cache dump (linked below). This will improve loading of assets on top of browser built-in cache.

Setup
======
It's recommended that you start out from a cache dump. You can download the latest one (updated on 2020-02-28, Hirato CG) from [MEGA](https://mega.nz/#!lPxTzLIC!-PsXIeVqVM1o9iZPCRp4ruQ--KlYWVKxSG7awF5qUbU) (4.2GB). If you just want the minimal files required for the gadget server block since 2020-02-25, you can download it from [MEGA](https://mega.nz/#!xbh3FRSY!BEsHNihk_ZWIuNvL0HWMlXGiXWDb446BCwkaI6nnUFg) (45KB)

[More detailed explanation](https://cdn.discordapp.com/attachments/425302689887289344/666769181609295887/unknown.png)

0. This bot requires [Node](https://nodejs.org/en/), and optionally git to clone this repository (or download zip at top right, unzip it somewhere).
1. Install dependencies with npm by running `npm i` in the folder with `package.json`. 
2. (Optional) Extract the downloaded cache dump, so you'll have a folder `cache` with `cached.json` in it respectively to where you unzipped/cloned the repository (if there's a file `./proxy.js` then there should be `./cache/cached.json`).
3. You can start the proxy server with `node proxy`. 
4. Depending on browser/viewer used, set it up to use `localhost:8081` as HTTP proxy. Below are details on how to set up in Chrome with extra safety that it doesn't redirect game api requests through the proxy.

Don't forget to start the proxy server each time you want to use it (or see auto start section).

**NOTE** for technical people: You can **NOT** run both the preloader and proxy server at the same time, unless you run the preloader via the proxy on startup.

## Chrome proxy setup
1. To use this in chrome, an extension like [Proxy SwitchyOmega](https://chrome.google.com/webstore/detail/proxy-switchyomega/padekgcemlokbadohgkifijomclgjgif)
2. Add a new profile, set the HTTP proxy server to `localhost` and port to `8081` (this can be changed in the `config.json`). [Preview](https://i.imgur.com/w6wHZeM.png).
3. In autoswitch, add two URL wildcard conditions that point to the profile created in the previous step. In the first condition put `http://<your kc server ip>/kcs/*` and in the second `http://<your kc server ip>/kcs2/*`. You can find your KC server ip in the network tab of devtools when playing the game, or check on wikia, or checking the output of the preloader. [Preview](https://i.imgur.com/cwBrda5.png)
4. If you also want to go around the recent foreign IP block, add `http://203.104.209.7/*` as well.
5. Save your changes and enable the `Auto Switch` profile. [Preview](https://i.imgur.com/Z32Ga5J.png)

## Auto start on system startup (Windows)
1. Open the your startup folder by opening run (windows key + R) and running `shell:startup`
2. Drag and drop the `start.bat` file while holding down alt while releasing, this will create a shortcut.
3. The proxy can be shut down by pressing control+c, you can close the proxy created in "Installation" step 2 in this way. You can start it up again by double clicking the shortcut you just created.
