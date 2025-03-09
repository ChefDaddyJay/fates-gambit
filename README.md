# Project status

03/09/2025 - / Shows a welcome page with sign in and sign up options. Neither have
                been implemented as of yet.
            /cards displays the full list of card in the database and allows the
                user to search the list and select individual cards to view their
                details.
            /cards/create allows for the creation of new cards, which are entered
                directly into the database.
            All others are dummy pages for now

# **FATE'S GAMBIT**

**Fate's Gambit** is an online trading card game in which players act as 
*Weavers of Destiny* and compete in an attempt to complete their patterns first by 
being the first to reach 100 *Fate Points*. Each player begins the game with 50 
*Fate Points*. At the beginning of the game, each player draws 6 cards.

## Turn Structure

At the beginning of each turn but the first, the active player draws a card. They 
then have the option to play cards from their hand by spending *Fate Points* or 
*Advance* and end their turn. If the player has more than 6 cards in their hand at 
the end of their turn, they must discard until they have only 6 remaining.

### Advancement

At the end of each turn, the active player receives a number of *Fate Points* 
equal to the combined power of all the Characters they control, adjusted for 
any Events or Effects played previously.

## Card Types

There are 3 card types in **Fate's Gambit**: Characters, Events, and Effects.

### Characters

- Characters have a power level that represents the base number of *Fate Points*
they award during Advancement. Players must have a Character on the field to earn
*Fate Points*.
- Character cards can only be played by the active player, prior to Advancing.
- Some Characters have abilities that may prevent them from Advancing, if used.

### Events

- Events can be played any time, during any turn.
- Events typically occur only once and last for one turn.
- Events can cause a number of things to happen, including:
    -- Drawing a card
    -- Gaining *Fate Points*
    -- Causing an opponent to lose *Fate Points*

### Effects

- Effects, like Characters, can only be played by the active player.
- Effects stay on the field and cause lasting changes, including:
    -- Increasing or decreasing the power of a Character
    -- Preventing Character Advancement
    -- Draining *Fate Points*
    -- Providing an alternate source of *Fate Points* to pay for card costs

## Factions

There are four Factions in **Fate's Gambit**: Bards, Heroes, Seers, and Shadows. 
Cards within each Faction often synergize with each other to create more powerful 
effects. For instance, Effect cards may target Characters from a specific Faction.
