<script>
    let count = 0;
  
    const increment = () => {
      count += 1;
    };
  </script>
  
  <button on:click={increment}>
    Click to add coins => {count} coins
  </button>
