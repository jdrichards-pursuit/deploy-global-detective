const ranks = [
    { name: "Rookie Detective", minXP: 0 },
    { name: "Intermediate Detective", minXP: 1000 },
    { name: "Senior Detective", minXP: 2500 },
    { name: "Master Sleuth", minXP: 5000 },
    { name: "Grandmaster", minXP: 10000 },
    { name: "Legendary Detective", minXP: 20000 }
  ];
  
  const getRank = (xp) => {
    for (let i = ranks.length - 1; i >= 0; i--) {
      if (xp >= ranks[i].minXP) {
        return ranks[i].name;
      }
    }
    return 'Unranked';
  };
  
  export { ranks, getRank };