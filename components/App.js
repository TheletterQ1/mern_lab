import React from "react";
import { Route, Link, Switch } from "react-router-dom";
import Display from "./Display";
import Form from "./Form";
import Team from "../../backend/models/teams"
import Player from "../../backend/models/players"

function App() {
  // URL VARIABLE
  const url = "http://localhost:4500";

  // STATE TO HOLD TEAMS & PLAYERS
  const [players, setPlayers] = React.useState([]);
  const [teams, setTeams] = React.useState([]);

  //Empty Players and Teams for Form
  const emptyPlayers = {
    name: "",
    age: 0,
    img: "",
  };
  const emptyTeams = {
    name: "",
    age: 0,
    img: "",
  };

  //SelectedPlayer to select a player for update
  //SelectedTeam to select a team for update
  const [selectedPlayer, setSelectedPlayer] = React.useState(emptyPlayers);
  const [selectedTeams, setSelectedTeams] = React.useState(emptyTeams);

  //selectPlayer & team which selects one
  const selectPlayer = (player) => {
    setSelectedPlayer(player);
  };

  const selectTeams = (teams) => {
    setSelectedTeams(teams);
  };

  // FUNCTION TO FETCH Players
  const getPlayers = () => {
    fetch(url + "/players/")
      .then((response) => response.json())
      .then((data) => {
        setPlayers(data);
      });
  };

  // FUNCTION TO FETCH teams
  const getTeams = () => {
    fetch(url + "/teams/")
      .then((response) => response.json())
      .then((data) => {
        setTeams(data);
      });
  };

  //Get players and/or on page load
  React.useEffect(() => {
    getTeams();
  }, []);

  React.useEffect(() => {
    getPlayers();
  }, []);

  //showPlayers to show a teams players
  function teamPlayers(players) {
    const showPlayers = () => {
      return (
        <>
          <div style={{ textAlign: "center" }}>
            {players.map((player) => (
              <article>
                <img src={player.imgURL} />
                <h3>{player.name}</h3>
                <h4>{player.pos}</h4>
                <button
                  onCLick={() => {
                    props.selectPlayer(player);
                    props.history.push("/edit");
                  }}
                >
                  Edit A Player
                </button>
                <button
                  onClick={() => {
                    props.deletePlayer(player);
                  }}
                >
                  Delete A Player
                </button>
              </article>
            ))}
          </div>
        </>
      );
    };
    return players.tid === teams.tid ? { showPlayers } : <h1>...Loading</h1>;
  }
  //handleCreate Function for creating players & teams
  const handleCreate = (newPlayer) => {
    fetch(url + "/player/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPlayer),
    }).then((response) => getPlayers());
  };

  const handleCreateTeam = (newTeam) => {
    fetch(url + "/team/", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newTeam),
    }).then((response) => getTeams());
  };
  //handleUpdate to update a players when form is clicked
  const handleUpdate = (player) => {
    fetch(url + "/player/" + player._id, {
      method: "put",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(player),
    }).then((response) => getPlayers());
  };
  //deletePlayer funtion to delete
  const deletePlayer = (player) => {
    fetch(url + "/player/" + player.id, {
      method: "delete",
    }).then((response) => getPlayers());
  };
 //handleUpdateTeam to update teams when form is clicked
 const handleUpdateTeam = (team) => {
  fetch(url + "/team/" + team._id, {
    method: "put",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(team),
  }).then((response) => getTeams());
};
//deleteTeam funtion to delete
const deleteTeam = (team) => {
  fetch(url + "/team/" + team.id, {
    method: "delete",
  }).then((response) => getTeams());
};

  return (
    <div className="App">
      <h1>NBA Official Roster</h1>
      <hr />

      <Link to="/create">
        <button>Add Player</button>
      </Link>
      <main>
        <Switch>
          <Route
            exact
            path="/"
            render={(rp) => (
              <Display
                {...rp}
                teamPlayers={teamPlayers}
                Players={Player}
                Team={Team}
                selectPlayer={selectPlayer}
                deletePlayer={deletePlayer}
                selectTeam={selectTeam}
                deleteTeam={deleteTeam}
              />
            )}
          />
          1
          <Route
            exact
            path="/create"
            render={(rp) => (
              <Form
                {...rp}
                label="create"
                player={emptyPlayers}
                team={emptyTeams}
                handleSubmit={handleCreate, handleCreateTeam}
              />
            )}
          />
          <Route
            exact
            path="/edit"
            render={(rp) => (
              <Form
                {...rp}
                label="update"
                player={selectedPlayer}
                team={selectedTeams}
                handleSubmit={handleUpdate}
              />
            )}
          />
        </Switch>
      </main>
    </div>
  );
}

export default App;
