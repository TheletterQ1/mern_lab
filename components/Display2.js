import React from "react";
const Display2 = (props) => {
  const  {teams}  = props;
  const {players} = props;
  const showTeam = () => (
    <div style={{ textAlign: "center" }}>
      {players.map((player) => (  
              
        <article>
          <img src={player.imgURL} />
          <h3>{player.name}</h3>
          <h4>{player.pos}</h4>    
          <button onCLick={() => {
            props.selectPlayer(player)
            props.history.push("/edit")
          }}>Edit A Player</button>
          <button onClick={() =>{
            props.deletePlayer(player)
          }}>Delete A Player</button>
        </article>
      ))}
    </div>
  );
  return teams.length > 0 ? loaded() : <h1>...Loading Players</h1>;
};
export default Display2;