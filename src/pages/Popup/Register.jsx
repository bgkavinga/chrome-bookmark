import { Box, Button, TextField } from '@mui/material';
import FormControl from '@mui/material/FormControl';
import FormHelperText from '@mui/material/FormHelperText';
import * as React from 'react';
import { STATE_LOGIN } from './Popup';


class Register extends React.Component {

    constructor(props) {
        super(props);
        this.state = { error: false, working: false, helperText: '', email: '', name: '', password: '' }
        this.handleChange = this.handleChange.bind(this);
        this.handleRegister = this.handleRegister.bind(this);
        this.handleRegisterResponse = this.handleRegisterResponse.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const state = {};
        state[name] = event.target.value;
        this.setState(state);
    }

    handleRegister(event) {
        this.setState({ working: true });
        chrome.runtime.sendMessage({ command: 'register', email: this.state.email, password: this.state.password }, this.handleRegisterResponse);

    }

    handleRegisterResponse(data) {
        if (data.error) {
            this.setState({ error: true, helperText: data.error.code });
        } else {
            this.props.onAppStateChange(STATE_LOGIN);
        }
        this.setState({ working: false });
    }

    render() {
        return (
            <Box sx={{ width: '30em' }} >
                <FormControl error={this.state.error} variant="standard" fullWidth>
                    <TextField sx={{ mb: 1 }} name="name" label="Name" variant="outlined" fullWidth type="text" onChange={this.handleChange} />
                    <TextField sx={{ mb: 1 }} name="email" label="Email" variant="outlined" fullWidth type='email' onChange={this.handleChange} />
                    <TextField sx={{ mb: 1 }} name="password" label="Password" variant="outlined" fullWidth type="password" onChange={this.handleChange} />
                    <FormHelperText sx={{ mb: 1 }}>{this.state.helperText}</FormHelperText>
                    <Button variant="outlined" onClick={this.handleRegister} disabled={this.state.working}>
                        Register
                    </Button>
                </FormControl>
            </Box>
        );
    }
}

export default Register;