<script>
  import SheepCounter from "./lib/SheepCounter.svelte";
  import Box from "./lib/Box.svelte";
  import BuySheep from "./lib/BuySheep.svelte";
  import SellSheep from "./lib/SellSheep.svelte";
  import MoneyCounter from "./lib/MoneyCounter.svelte";
  import RollDice from "./lib/RollDice.svelte";
  import { Body, classList, style } from "svelte-body";
</script>

<Body style="background-color: #15bd15;" />
<main>
  <h1>Game of Sheep</h1>

  <Box>
    <div>
      <div class="note">Roll Dice</div>
      <div class="card">
        <RollDice />
      </div>
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Amount of Sheep</div>
      <div class="card">
        <SheepCounter />
      </div>
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Amount of Money</div>
      <div class="card">
        <MoneyCounter />
      </div>
    </div></Box
  >
  <Box>
    <div>
      <div class="note">Sell Sheep</div>
      <div class="card">
        <SellSheep />
      </div>
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Buy Sheep</div>
      <div class="card">
        <BuySheep />
      </div>
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Events</div>
    </div></Box
  >
  <Box>
    <div class="note">Wool Sale</div>
  </Box>
  <Box>
    <div>
      <div class="note">Drought Status</div>
    </div></Box
  >
  <Box>
    <div>
      <div class="note">Paddocks</div>
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Stud Rams</div>
      <!-- <button on:click={updateStudRam}>Update Stud Rams</button> -->
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Haystacks</div>
      <!-- <button on:click={updateStudRam}>Update Stud Rams</button> -->
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Mortgages</div>
      <!-- <button on:click={updateStudRam}>Update Stud Rams</button> -->
    </div>
  </Box>
  <Box>
    <div>
      <div class="note">Programmes</div>
      <!-- <button on:click={updateStudRam}>Update Stud Rams</button> -->
    </div>
  </Box>

  <div class="footer">
    <p />
    <strong>A pen holds 15 sheep</strong>
    <p />
    <a href="https://github.com/michaelkernaghan/gameofsheep">V.0.0</a>
    created with
    <a
      href="https://tezostaquito.io/"
      target="_blank"
      rel="noopener noreferrer nofollow">Taquito</a
    >!
  </div>
</main>

<style>
</style>
