const FETCH_CREATED_GAME = () => {
  return `query {
    games(orderBy:id, orderDirection:desc, first: 1) {
      id
      maxPlayers
      entryFee
      winner
      players
    }
  }`
}

export {
  FETCH_CREATED_GAME
}