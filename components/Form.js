import React from "react";

const Form = (props) => {
  //STATE FOR THE FORM
  const [formData, setFormData] = React.useState(props.team, props.player);

  //FUNCTIONS
  const handleSubmit = (event) => {
    // Prevent Form from Refreshing
    event.preventDefault();
    // Submit to the parents desired function
    props.handleSubmit(formData);
    //Push back to the display
    props.history.push("/");
  };

  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        name="player"
        value={formData.player}
        onChange={handleChange}
      />

      <input
        type="text"
        name="team"
        value={formData.team}
        onChange={handleChange}
      />
      <input type="submit" value= "Search"/>
    </form>
  );
};

export default Form;
