const board_position_array = ['Wool Sale', 
    'Stock Sale', 
    'Sheep Dipping',
    'Stud Ram - Elmsford Park Rex',
    'Tucker Bag',
    'Bore Dries Up',
    'Visiting Town',
    'Visiting Town',
    'Drench Sheep for worms',
    'Tucker bag',
    'Flood Damage',
    'Tucker Bag',
    'Stock Sale',
    'Jet Sheep Against Fly Strike',
    'Poison and Fumigate Rabbits',
    'Stock Sale',
    'Footrot Treatment',
    'Stock Sale',
    'Stud Ram - Laclan Lad',
    'Tucker Bag',
    'Pay Cost of Fencing Repairs',
    'Spray for Weeds and Insects',
    'Local Drought',
    'Drench for Liver Fluke',
    'Tucker Bag',
    'Stock Sale',
    'Stud Ram - King of Warramboo',
    'Local Rain',
    'Stock Sale',
    'Vaccinate for Pulpy Kidney',
    'Stud Ram - Winton Boy II',
    'Tucker Bag',
    'Stock Sale',
    'Stud Ram Dries',
    'Pay Water Drilling Expenses',
    'Tucker Bag',
    'Stock Sale',
    'Pay Cost of Fertilizing Pasture',
    'Stock Sale',
    'Stud Ram - Mitchell\'s Pride',
    'Shearing Costs',
    'Tucker Bag',
    'Stock Sale',
    'Local Drought'
]

function rollDice() {
       var randomDice1 = Math.floor(6*Math.random())+1;
       var randomDice2 = Math.floor(6*Math.random())+1;
       return randomDice1 + randomDice2;
    } 
    const dieRoll = rollDice();
    console.log('Die roll is: ' +dieRoll);
    const position  = dieRoll;
    console.log("new_position =" +board_position_array[position])
    let current_position = position;
