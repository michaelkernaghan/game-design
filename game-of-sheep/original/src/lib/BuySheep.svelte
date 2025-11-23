<script>
    let count = 0;
  
    $: if (count >= 16) {
      alert("The pen is full");
      count = 15;
    }
  
    const increment = () => {
      count += 1;
    };
  </script>
  
  <button on:click={increment}>
    Click to buy a sheep => {count} sheep
  </button>
