<script>
    let count = 0;

    // https://github.com/bryc/code/blob/master/jshash/PRNGs.md
// xoshiro128+ (128-bit state generator in 32-bit)
function xoshiro128p() {
  // Using the same value for each seed is _screamingly_ wrong
  // but this is 'good enough' for a toy function.
  let a = Date.now(),
    b = Date.now(),
    c = Date.now(),
    d = Date.now()
  return function () {
    let t = b << 9,
      r = a + d
    c = c ^ a
    d = d ^ b
    b = b ^ c
    a = a ^ d
    c = c ^ t
    d = (d << 11) | (d >>> 21)
    return (r >>> 0) / 4294967296
  }
}

    // @ts-ignore
    const randomDice1 = Math.floor(6 * xoshiro128p()) + 1;
    // @ts-ignore
    const randomDice2 = Math.floor(6 * xoshiro128p()) + 1;
    const diceRoll = randomDice1 + randomDice2;

    const increment = () => {
        count += diceRoll;
    };
</script>

<button on:click={increment}>
    Your Board Location Number => {count}
</button>
