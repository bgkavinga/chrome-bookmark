import { Box, Button, TextField, Grid, Paper } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import * as React from 'react';
import { STATE_REGISTER, STATE_CONTENT } from './Popup';


class Login extends React.Component {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.handleLogin = this.handleLogin.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleLoginResponse = this.handleLoginResponse.bind(this);
        this.state = {
            email: '', password: '', error: false, helperText: '', working: false
        }
    }

    handleChange(event) {
        const name = event.target.name;
        const state = {};
        state[name] = event.target.value;
        this.setState(state);
    }

    handleLogin(event) {
        //@TODO validate email/password
        this.setState({ working: true });
        chrome.runtime.sendMessage({ command: 'login', email: this.state.email, password: this.state.password }, this.handleLoginResponse);

    }

    handleLoginResponse(response) {
        if (response.error) {
            this.setState({ error: true, helperText: response.error.code });
        } else {
            this.props.onAppStateChange({ appState: STATE_CONTENT })
        }
        this.setState({ working: false });
    }

    handleRegister(event) {
        this.props.onAppStateChange({ appState: STATE_REGISTER })
    }

    render() {
        return (
            <Box sx={{ width: '30em' }} >
                <FormControl error={this.state.error} variant="standard" fullWidth>
                    <TextField sx={{ mb: 1 }} name="email" label="Email" variant="outlined" fullWidth type='email' onChange={this.handleChange} />
                    <TextField name="password" label="Password" variant="outlined" fullWidth type="password" onChange={this.handleChange} />
                    <FormHelperText>{this.state.helperText}</FormHelperText>
                    <Button sx={{ mt: 2 }} variant="outlined" onClick={this.handleLogin} disabled={this.state.working}>
                        Login
                    </Button>
                    <Button sx={{ mt: 2 }} variant="outlined" onClick={this.handleRegister} disabled={this.state.working}>
                        Register
                    </Button>
                </FormControl>
            </Box>

        );
    }

}
export default Login;