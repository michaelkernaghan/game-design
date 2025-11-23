---
title: 'Game of Sheep White Paper'
disqus: hackmd
---


A Smart Contract Testing Game About Sheep Farming
===
Move your sheep through a series of improved pastures!
Pay the costs of raising sheep for the market!
Make money from selling wool and use it to improve pasture! 

Many games employ a simple ledger mechanic to track credits and benefits that accrue to the players as they execute turns and undergo events. The ledger mechanic lends itself easily to the blockchain, and the cryptographic security afforded by the blockchain allows games to craft shared objects of value that players can own and trade. Game of Sheep is built around a decentralized ledger. The sheep in the game are tokenized, allowing the game to include tokenomics around NFTs.

Game of Sheep is an homage to the board game Squatter, a game described on Wikipedia as “number 8 in 14 justifiably forgotten Milton Bradley board games.” As such, this project and code may only be deployed on testnets and are never allowed to make any commercial profit. The game and the design effort to create the game are test data. They are an acceptance test for smart contract dapp development on the Tezos Block chain. 

A game about sheep using Tezos, Taqueria, Typescript and Svelte.

# Table of Contents

[TOC]

# Roadmap

1. Game mechanics proof of concept
2. NFTs prepared
3. UI Mockups
4. First Contract - buy and sell sheep tokens
5. Oracle Contract
6. Wool Sale Contract
7. Paddocks as Liquidity Pools
8. Implement Game Cycle
9. Stud Ram contract
10. Drought Mechanics
11. Control Programme Mechanics
12. NFT Launch
13. Beta Testing

# Tokenomics

The game centers on selling sheep at a lower price than they are bought. Tokens on a Smart Contract can track the balances of sheep, and a ledger can track the amounts.

The economics of the game is simply a model of the economics of a sheep farm. The decentralized version tokenizes this economy with two tokens: dollars and sheep. Players will maintain a balance between these two tokens, adding or drawing down according to game events or tactical options.

Decentralized Finance features of the game include:

- Decentralized Ledger
- Tezos Smart Contracts
- Token transfers for sheep and dollars
- NFTs that carry entitlements or obligations
- Liquidity Pools
- Staking and Rewards

## Smart Contracts

As the game is a ledger with frills the contracts for handling transfers will be FA.2.

## NFTs
The original board game was designed for six players. Game of Sheep, the Decentralized Version, will be for single-player play. However, there will be interaction among players through competing for NFTs that are of use in the game. For example, any player has access to a fire fighting equipment NFT, since any amount of these may be minted. But there are 5 unique Stud Ram NFTS. When a player with a Stud Ram NFT lands on “Stud Ram Dies,” the NFT is burned.

The Liability and Benefit NFTs are burned when used, generally at Wool Sale, incurring some owed deficit defined by the NFT. Benefits can be stacked.Holding some will help players; holding others may mean a penalty, but they are burned when used in the game, and new ones can be minted when required.

All images used in the game NFTs were created with [stableboost.ai](https://stableboost.ai/images) and edited in [Canva](https://www.canva.com/).

## Asset NFTs

The NFTs can be burned when needed or they can provide ongoing benefits.
### Insurance Policy for Stud Ram
<div>
    <img src="https://i.imgur.com/7CuXWym.png" alt="insurance" width="100"/>
</div>

### Haystack
<div>
    <img src="https://i.imgur.com/iiGRNuX.png" alt="haystack" width="100"/>
</div>

### Fire Fighting Equipment
<div>
    <img src="https://i.imgur.com/VqUj6Zv.png" alt="fireFightingEquipment" width="100"/>
</div>

## Control Program NFTs
These NFTs entitle holders to a premium at Wool Sale and protect against bad events.

### Worm Control Programme
<div>
    <img src="https://i.imgur.com/Xp7i74G.png" alt="wormControlProgramme" width="100"/>
</div>

### Control of Weeds and Insects
<div>
    <img src="https://i.imgur.com/Cds3Iy2.png" alt="controlOfWeedsAndInsects" width="100"/>
</div>

### Fertilized Pasture
<div>
    <img src="https://i.imgur.com/SuyxC19.png" alt="fertilizedPasture" width="100"/>
</div>

 
## Stud Rams
There are six Stud Rams. Holders of a Stud Ram NFT will have a premium added to their Wool Sales yield.
### Elmsford Park Rex
<div>
    <img src="https://i.imgur.com/siU1YUa.png" alt="elmfordParkRex" width="100"/>
</div>

### Winton Boy II
<div>
    <img src="https://i.imgur.com/dRXsCvv.png" alt="wintonBoyII" width="100"/>
</div>

### Mitchell's Pride
<div>
    <img src="https://i.imgur.com/l8srRkj.png" alt="mitchellsPride" width="100"/>
</div>

### Lachlan Lad
<div>
    <img src="https://i.imgur.com/uEt4ZZ0.png" alt="lachlanLad" width="100"/>
</div>

### King of Warramboo
<div>
    <img src="https://i.imgur.com/pKdUjP1.png" alt="kingOfWarramboo" width="100"/>
</div>


## Liability NFTs

The NFTs are obtained through random events within the game. They will be added to a players account and will generally impose penalties at Wool Sales or Stock Sales. A liability NFT will be bured when the liability is dispensed or its condition resolved.

### Blowfly Wave
<div>
    <img src="https://i.imgur.com/9HA9oOl.png" alt="blowflyWave" width="100"/>
</div>!


### High Stock Prices Ruling
<div>
    <img src="https://i.imgur.com/tBKsSuU.png" alt="highStockPriceRuling" width="100"/>
</div>


### New Sheering Shed
<div>
    <img src="https://i.imgur.com/r3FlC06.png" alt="newSHeeringshed" width="100"/>
</div>

## Paddock Improvements
In the original game, pastures consisted of 5 paddocks and sheep were measured in pens of 200. 
The limit on a Stock Sale is 15 pens, or 3k sheep. A natural pasture paddock can hold 3 pens, an improved pasture paddock can hold 5 pens, and an irrigated pasture paddock can hold 6 pens.

A game turn has two phases. 

- First, the player decides on changes to their paddocks. Each of the 5 paddocks can be promoted from Natural Pasture
to Improved Pasture and then to Irrigated Pasture. 

- Second, the player "Rolls the Dice" and plays out whever events are imposed.

A useful sequence of of play is to improve paddocks and then achieve a Stock Sale on the die roll.

## Stock Sales

At intervals a player will have the opportunity to buy or sell sheep. 

## Wool Sales

Once each game cycle a player has the opportunity to gain dollars from a Wool Sale.

## Penalties, Fines, Bonuses and Rewards

Droughts, Plagues, Fires, Rabbits, all sorts of maintenance obligations and various anti-sheep phenomena impact cash flow and balances throughout the game. 

# Mechanics

## Storage
The reason the game is adaptable to blockchain is the ledger. We will use FA2 as the contract standard. There will be both sheep and dollar tokens so a multi-asset FA2 contract is needed. We will start our development of this contract with Claude Barde's [How to Extend an Fa2 Contract in CameLigo](https://medium.com/coinmonks/how-to-extend-an-fa2-contract-in-cameligo-a673858cbe2b). Another excellent resource is Taquito's [FA2 Parameters](https://tezostaquito.io/docs/next/fa2_parameters/). As noted by Claude there is a fantastic set of contracts supported [OxheadAlpha](https://github.com/oxheadalpha/smart-contracts)

## Game Cycle
The result of two rolled dice is added, and the player is advanced to the next event. For each mod 43, there is a Wool Sale. The events are various functions affecting the yields at Stock Sales or Wool Sales. Some game tokens and some game obligations will be handled with NFTs. There are asset NFTs and liability NFTs.

### Randomization
To avoid the same sequence of events occurring in each game, the randomizer has to be non-deterministic. There are pseudo-random functions that can be used, but they will repeat. The game will therefore use a smart contract that communicates with a blockchain oracle that produces random numbers.

## Mechanism Diagram

![](https://i.imgur.com/r0zdAfM.png)

### Events Schedule (Board Position)

| Position                     | Event      | 
|------------------------------|------------|
| 0                            | Wool Sale  |
| 4, 9, 11, 19, 24, 31, 35, 41 | Tucker Bag |
| 3, 18, 26, 30, 39            | Stud Ram   |
| 33                           | Stud Ram Dies|
| 1, 12, 15, 17, 25, 28, 32, 36, 38, 42| Stock Sale|
| 5                            | Bore Dries Up|
| 2, 8, 13, 16, 23, 29, 40     | Penalties |
| 10                           | Flood Damage|
| 14                           | Poison Rabbits |
| 17, 20, 21, 34               | Expenses|
| 22, 43                       | Local Drought|
| 27                           | Local Rain |

## Tucker Bag Events
- Grass Fires destroy Haystack and most of the Pasture Fodder. Half your sheep must be sold at market price 
- You must pay $50 Income Tax for each Natural Pasture Paddock and $200 for each $1,000 Cash held, to nearest thousand.
-  There is now a General Drought.
- You have won a Trophy for Champion Ram and recieve $400.
- Fire destroys Haystack and damges Out-Buildings at a cost of $500.
- You buy Fire Fighting Equipment for $150.
- You get an Insurance Policy for a Stud Ram. If the Stud Ram dies you get to Purchase a new shearing shed. $1,000 each if less than 15 pens, otherwise $2,000 each 
- By careful management you have eradicated Foot Rot. You are exempt from future treatment costs.
- As a result of severe Blowfly Wave, and your failure to take precautionary action your next Wool Cheque reduces by 10%. No loss if you land on "Jet Sheep" before your next Wool Cheque.
- If your property is not fully stocked, receive Agistment fees of $600.
- General rain breaks drought
- You are injured by Tractor as a result of carelessness.
- Severe infestation of Lucerne Flea and red Legged Earth Mite reduces carrying capacity by one third. Sell one third of stock to Bank for $500 per pen.
- Paddocks require spelling due to heavy sheep Worm infestation. Sell half of your stock at $500 per pen.
- You must pay $50 Income Tax for each Natural Pasture Paddock and $200 for each $1,000 Cash held, to nearest thousand.
- Successful lambing season due to good mangement - 120% Lambs. Receive additional 600 stock, i.e, 3 pens of sheep, or your property is already fully stocked, receive $1,200 instead.
- Receive $800 Compensation for State Highway put through your property.
- From sale of Fat Lambs receive $500.
- Wild Dogs kill many Sheep. If you own Stock, return 3 pens of Sheep to the Bank.
- You have won Soil Conservation Trophy - Receive $300.
- Good Autumn and Spring Rains. Have an additional Wool Sale. These rains break drought.
- You have increased the average Fleece weight by selective breeding and good mangement, Receive bonus of $1,000.

# Social Media and Marketing PLan

![](https://i.imgur.com/E3SS3Uy.png)