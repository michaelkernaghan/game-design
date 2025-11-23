<script>
    let count = 0;
  
    $: if (count < 0) {
      alert("That's too many");
      count = 0;
    }
  
    const decrement = () => {
      count -= 1;
    };
  </script>
  
  <button on:click={decrement}>
    Click to sell sheep => {count} sheep
  </button>
