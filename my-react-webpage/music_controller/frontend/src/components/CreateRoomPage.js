import React, {Component} from "react";
import Button from "@material-ui/core/Button";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import TextField from "@material-ui/core/TextField";
import FormHelperText from "@material-ui/core/FormHelperText";
import FormControl from "@material-ui/core/FormControl";
import { Link } from "react-router-dom";
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import { useNavigate } from "react-router-dom";



const withRouter = WrappedComponent=>props=>{
  const navigate = useNavigate();
  return(
    <WrappedComponent
    {...props}
    navigate={navigate}
    />
  );
};

class CreateRoomPage extends Component{
    
    defaultVotes = 2;
    constructor(props){
        super(props);
        // using state for updating our onclicks
        this.state = {
            guestCanPause: true,
            votesToSkip: this.defaultVotes,
        };
        this.handleVotesChange = this.handleVotesChange.bind(this);
        this.handleGuestCanPauseChange = this.handleGuestCanPauseChange.bind(this);
        this.handleRoomButtonChange = this.handleRoomButtonChange.bind(this);

    }
    // implementing react methods to handle vote action
    handleVotesChange(e){
        this.setState({
            votesToSkip: e.target.value,
        });
    }

    // react method to handle guest can pause 
    handleGuestCanPauseChange(e){
      this.setState({
          guestCanPause: e.target.value === 'true' ? true: 'false',
      });
    }
    // react method to handle creating room
    handleRoomButtonChange(){
      const requestOptions = {
          method: 'POST',
          headers: {'Content-Type': 'application/json'},
          body: JSON.stringify({
              votes_to_skip: this.state.votesToSkip,
              guest_can_pause: this.state.guestCanPause
          }),
      };
      fetch('/api/create-room', requestOptions).then((response) =>
        response.json()
      ).then((data) => this.props.navigate('/room/' + data.code));
    }

    render() {
      return (<Grid container spacing={1}>
        <Grid item xs={12} align="center">
              <Typography component='h4' variant="h4">
                Create Room Page
              </Typography>
        </Grid>
          <Grid item xs={12} align="center">
              <FormControl component="fieldset">
                  <FormHelperText>
                    <div align = 'center'>Guest Control of Playback State</div>
                        </FormHelperText>
                        <RadioGroup row defaultValue="true" onChange={this.handleGuestCanPauseChange}>
                          <FormControlLabel 
                            value="true" 
                            control={<Radio color="primary"/>}
                            label = "Play/Pause"
                            labelPlacement="bottom"                       
                          />
                          <FormControlLabel 
                            value="false" 
                            control={<Radio color="secondary"/>}
                            label = "No Control"
                            labelPlacement="bottom"                       
                          />
                </RadioGroup>
              </FormControl>
            </Grid>
              <Grid item xs={12} align="center">
                  <FormControl>
                    <TextField 
                        required={true}
                        type="number"
                        onChange={this.handleVotesChange} 
                        defaultValue={this.defaultVotes}
                        inputProps={{
                           min: 1,
                           style: {textAlign: "center"}
                        }}
                    />
                    <FormHelperText>
                    <div align="center">
                        Votes Required To Skip Song
                    </div>
                    </FormHelperText>
                </FormControl>
                </Grid>
                  <Grid item xs={12} align="center">
                    <Button color="primary" variant="contained" onClick={this.handleRoomButtonChange}>
                      Create A Room
                    </Button>
            </Grid>
              <Grid item xs={12} align="center">
                    <Button color="secondary" variant="contained" to="/" component={Link}>
                      Back
                    </Button>
            </Grid>
        </Grid>
      );
    }
}


export default withRouter(CreateRoomPage);