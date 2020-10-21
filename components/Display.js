import React from "react";
const Display = (props) => {
  const  {teams}  = props;
  const {players} = props;
  const {teamPlayer} = props;
  const loaded = () => (
    <div style={{ textAlign: "center" }}>
      {teams.map((team) => ( 
          players.map((player) => ( 
            
        <article>
          <img src={team.imgURL} />
          <h1>{team.region}</h1>
          <h2>{team.name}</h2>
          
          <button onCLick={() => {
            props.selectTeam(team)
            props.history.push("/edit")
          }}>Edit A Team</button>
          <button onClick={() =>{
            props.deleteTeam(team)
          }}>Delete A Team</button>
        </article>
          ))
      ))}
      
    </div>
  );
  return  teams.length > 0 ? loaded() : <h1>Loading...</h1>;
  
 
};
export default Display;