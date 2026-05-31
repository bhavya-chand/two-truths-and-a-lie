const lies = [
    "Goldfish have a memory span of only three seconds.",
    "The Great Wall of China is visible from the Moon with the naked eye.",
    "Humans use only 10% of their brains.",
    "Lightning never strikes the same place twice.",
    "Napoleon was unusually short for his time.",
    "Chameleons change color primarily to match their surroundings.",
    "Bats are completely blind.",
    "Water drains in opposite directions in different hemispheres.",
    "Sharks do not get cancer.",
    "Camels store water in their humps.",
    "The tongue is divided into separate taste zones.",
    "Diamonds are made from compressed coal.",
    "Einstein failed mathematics in school.",
    "Cracking your knuckles causes arthritis.",
    "Sugar makes children hyperactive.",
    "The Eiffel Tower was originally intended for Barcelona.",
    "Vikings wore horned helmets in battle.",
    "The human body has exactly five senses.",
    "Hair and nails continue growing after death.",
    "Bulls become angry when they see the color red.",
    "Ostriches bury their heads in the sand.",
    "Mount Everest is the tallest mountain from base to peak.",
    "Penguins mate for life.",
    "The inventor of the light bulb was solely Thomas Edison.",
    "Bananas grow on trees.",
    "The Amazon rainforest produces 20% of Earth's oxygen.",
    "Humans swallow eight spiders per year while sleeping.",
    "Dogs see only in black and white.",
    "The first email was sent in the 1980s.",
    "The Statue of Liberty was a gift from England.",
    "Mercury is the hottest planet in the Solar System.",
    "A penny dropped from a skyscraper can kill a person.",
    "Touching a baby bird causes its mother to abandon it.",
    "The North Star is the brightest star in the night sky.",
    "Glass is actually a very slow-moving liquid.",
    "Human blood in veins is blue before exposure to air.",
    "Spinach contains more iron than any other vegetable.",
    "Caffeine dehydrates you more than it hydrates.",
    "The Leaning Tower of Pisa was designed to lean.",
    "Penguins live at both poles.",
    "You lose most body heat through your head.",
    "The first computer mouse was wireless.",
    "The Sun is yellow.",
    "Polar bears are left-handed.",
    "Fortune cookies originated in China.",
    "The first alarm clock could ring at any chosen time.",
    "Sushi always contains raw fish.",
    "The human stomach digests itself completely every week.",
    "Napoleon conquered Russia successfully.",
    "The moon has a dark side that never receives sunlight.",
    "Most deserts are hot.",
    "A group of crows is called a murder because of medieval superstition.",
    "The first Olympic Games included swimming events.",
    "All snakes lay eggs.",
    "The Pacific Ocean is shrinking faster than the Atlantic.",
    "The first camera required people to stand still for several hours.",
    "Koalas are bears.",
    "The inventor of the telephone never used one.",
    "Frogs drink water through their mouths.",
    "Every swan in England belongs to the monarch.",
    "The speed of sound is constant regardless of temperature.",
    "Rabbits are rodents.",
    "The Earth is closest to the Sun during summer in the Northern Hemisphere.",
    "Pirates commonly made enemies walk the plank.",
    "The first skyscraper was built in New York City.",
    "Viking ships used compasses.",
    "All pandas are born black and white.",
    "Ancient Romans spoke only Latin.",
    "The shortest war in history lasted less than an hour.",
    "A crocodile cannot stick out its tongue because it is fused to its jaw.",
    "The first chess computer beat a world champion in the 1970s.",
    "The human body contains less than a tablespoon of gold.",
    "Bees die immediately after stinging.",
    "Tomatoes were first cultivated in Italy.",
    "The first book ever printed was a novel.",
    "Rainforests exist only near the equator.",
    "Octopuses have two hearts.",
    "Sound travels faster through air than through water.",
    "Ancient Egyptians built the pyramids using slave labor.",
    "The first automobile was invented in the United States.",
    "Antarctica is the driest continent on Earth because it receives no snowfall.",
    "The inventor of the internet was a single individual.",
    "Dolphins sleep with both halves of their brain at once.",
    "Wolves are the direct ancestors of all modern dogs.",
    "The first airplane crossed the Atlantic Ocean in a single nonstop flight.",
    "The human skeleton contains exactly 300 bones.",
    "Jupiter is the only planet with a Great Red Spot.",
    "A camel's hump contains stored water.",
    "The first universities were founded in Europe.",
    "The world's largest desert is the Sahara.",
    "Gold is the heaviest naturally occurring metal.",
    "The first mobile phones could send text messages.",
    "Sharks must keep swimming or they die.",
    "Every country uses the Gregorian calendar officially.",
    "The first video game was created in the 1980s.",
    "Ancient Greeks believed the Earth was flat.",
    "The first vaccine was developed for smallpox in the twentieth century.",
    "Owls can rotate their heads a full 360 degrees.",
    "The speed of light is the same in all materials.",
    "The first moon landing was broadcast live in color worldwide."
];

const truths = [
    "Octopuses have three hearts.",
    "Honey never spoils if stored properly.",
    "Wombats produce cube-shaped droppings.",
    "A day on Venus is longer than a year on Venus.",
    "Bananas are berries, but strawberries are not.",
    "Sharks existed before trees.",
    "The Eiffel Tower grows slightly taller in summer.",
    "Cows have best friends.",
    "The shortest war in history lasted less than an hour.",
    "Some turtles can breathe through their rear ends.",
    "There are more stars in the universe than grains of sand on Earth.",
    "A group of flamingos is called a flamboyance.",
    "The human nose can detect over a trillion scents.",
    "Koalas have fingerprints similar to humans.",
    "The heart of a blue whale is about the size of a small car.",
    "Sloths can hold their breath longer than dolphins.",
    "The Moon is slowly moving away from Earth.",
    "Sea otters hold hands while sleeping.",
    "A bolt of lightning is hotter than the surface of the Sun.",
    "Some frogs can freeze solid and survive.",
    "The first oranges were green.",
    "An ostrich's eye is larger than its brain.",
    "A cloud can weigh over a million pounds.",
    "The Pacific Ocean is larger than all Earth's land combined.",
    "Jellyfish have existed longer than dinosaurs.",
    "Hot water can freeze faster than cold water under certain conditions.",
    "A shrimp's heart is located in its head.",
    "The unicorn is Scotland's national animal.",
    "The longest English word has 189,819 letters.",
    "Polar bears have black skin.",
    "A day on Mercury is longer than its year.",
    "The fingerprints of a koala are unique.",
    "A group of crows is called a murder.",
    "The Sahara Desert was once a green landscape.",
    "Humans share about 60% of their DNA with bananas.",
    "Venus rotates in the opposite direction of most planets.",
    "The largest snowflake ever recorded was over 15 inches wide.",
    "Dolphins have individual names for one another.",
    "The Earth is not a perfect sphere.",
    "The Amazon River carries more water than any other river.",
    "Some cats are allergic to humans.",
    "The inventor of the Pringles can is buried in one.",
    "A single strand of spaghetti is called a spaghetto.",
    "Butterflies can taste with their feet.",
    "The world's largest living structure is the Great Barrier Reef.",
    "A hummingbird can fly backwards.",
    "The human body contains enough carbon to make thousands of pencils.",
    "Bamboo can grow more than three feet in a single day.",
    "The Sun contains more than 99% of the mass in the Solar System.",
    "A cockroach can survive for weeks without its head.",
    "The longest recorded flight of a chicken lasted 13 seconds.",
    "Some metals can explode when they come into contact with water.",
    "The first computer bug was an actual moth.",
    "An adult human has 206 bones.",
    "The deepest part of the ocean is deeper than Mount Everest is tall.",
    "Water expands when it freezes.",
    "A group of owls is called a parliament.",
    "Saturn would float in water if a large enough bathtub existed.",
    "The speed of light is about 300,000 kilometers per second.",
    "The oldest known living tree is over 4,800 years old.",
    "There are more possible chess games than atoms in the observable universe.",
    "A teaspoon of neutron star material would weigh billions of tons.",
    "The human brain contains roughly 86 billion neurons.",
    "The shortest commercial flight in the world lasts under two minutes.",
    "Some spiders can glide through the air.",
    "An octopus has nine brains.",
    "The Statue of Liberty wears a size 879 sandal.",
    "The first webcam monitored a coffee pot.",
    "A day on Mars is slightly longer than a day on Earth.",
    "The largest desert on Earth is Antarctica.",
    "Earth's atmosphere is mostly nitrogen.",
    "The inventor of the microwave discovered it after a chocolate bar melted in his pocket.",
    "A crocodile cannot stick out its tongue.",
    "The human stomach gets a new lining every few days.",
    "The longest mountain range is underwater.",
    "A blue whale's tongue can weigh as much as an elephant.",
    "The first message sent over the internet was 'LO'.",
    "Some species of bamboo flower only once every several decades.",
    "The average cumulus cloud can weigh hundreds of tons.",
    "The world's oldest known recipe is for beer.",
    "The Earth travels around the Sun at about 107,000 km/h.",
    "A lightning strike can contain up to a billion volts.",
    "A group of porcupines is called a prickle.",
    "The longest-living insect queen can survive for decades.",
    "A newborn kangaroo is about the size of a jellybean.",
    "Glass can be made from volcanic lava.",
    "The human skeleton is replaced gradually over time.",
    "The first Olympic Games were held in ancient Greece.",
    "A snail can sleep for years under certain conditions.",
    "The hottest planet in the Solar System is Venus.",
    "The world's tallest waterfall is Angel Falls.",
    "The average person walks enough in a lifetime to circle Earth multiple times.",
    "The Milky Way galaxy contains hundreds of billions of stars.",
    "The longest river in Africa is the Nile.",
    "An electric eel can generate hundreds of volts.",
    "The first programmable computer was built in the 1940s.",
    "The Earth is about 4.5 billion years old.",
    "Mount Everest continues to grow slightly each year.",
    "The Sun will eventually become a white dwarf."
];








const roomModel=require("../models/room");
const shortID=require("shortid");
//later add a truths and lie generation thingy here 
async function handleCreateRoom(req,res){
    const roomId=shortID();
    const playerId=shortID();
    const truthsArray=[];
    const liesArray=[];
    //make a random selection for truths and lies 
    
    for(let i=0;i<10;i++){
        const index = Math.floor(Math.random() * 100);
        truthsArray.push(truths[index]);
    }

    for(let i=0;i<5;i++){
        const index = Math.floor(Math.random() * 100);
        liesArray.push(lies[index]);
    }

    await roomModel.create({
        roomId:roomId,
        hostId:playerId,
        players:{
            playerId:playerId,
            playerName:req.body.playerName,
            attempted:0,
            score:0
        },
        truths:truthsArray,
        lies:liesArray,
        question:0,
        active:0
    });
    return res.json({roomId:roomId,playerId:playerId});
}

async function handleDeleteRoom(req,res){
    const roomId=req.body.roomId;
    await roomModel.deleteOne({
        roomId:roomId
    })
    return res.json({deletion:1});
}

async function handleRoomInfo(req,res){
    const roomId=req.params.roomId;
    const obj=await roomModel.findOne({roomId:roomId});
    console.log(obj);
    return res.json(obj);
}

async function handleStartRoom(req,res){
    const roomId=req.body.roomId;
    const playerId=req.body.playerId;
    const obj=await roomModel.findOneAndUpdate({roomId:roomId,hostId:playerId},{
        active:1
    });
    if(!obj) res.json({start:0});
    return res.json({start:1});
}

module.exports={handleCreateRoom,handleDeleteRoom,handleRoomInfo,handleStartRoom};