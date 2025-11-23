<script>
    let count = 0;
    let double = 0;
  
    $: if (count >= 16) {
      alert("The pen is full");
      count = 15;
    }
  
    const increment = () => {
      count += 1;
    };
    $: {
      console.log(`${count}`);
      console.log(`the count is ${count}`);
      double = count * 2;
      console.log(`double the count is ${double}`);
    }
  </script>
  
  <button on:click={increment}>
    Click to buy a sheep => {count} sheep
  </button>
