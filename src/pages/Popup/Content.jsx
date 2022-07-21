import { TextField, Stack, Card, CardHeader, Avatar, CardActions, Button } from '@mui/material';


import React from 'react';

class Content extends React.Component {
    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
        this.onKeyPress = this.onKeyPress.bind(this);
        this.onAppStateChange = this.onAppStateChange.bind(this);
        this.onTabSelect = this.onTabSelect.bind(this);
        this.saveActionHandler = this.saveActionHandler.bind(this);
        this.state = {
            searchText: '', error: false, helperText: '', working: false, web: { title: '' }
        }
        chrome.tabs.query({ active: true, currentWindow: true }, this.onTabSelect);
    }

    onTabSelect(tabs) {
        chrome.tabs.sendMessage(tabs[0].id, { command: "getPageContents" }, this.onAppStateChange);

    }

    onAppStateChange(data) {
        this.setState(data)
    }

    handleChange(event) {
        const name = event.target.name;
        const state = {};
        state[name] = event.target.value;
        this.setState(state);
    }

    onKeyPress(event) {
        if (event.key === 'Enter') {
            event.preventDefault();
            console.log(event.target.value);
        }
    }

    saveActionHandler(event) {
        this.setState({ working: true });
        chrome.runtime.sendMessage({ command: 'save', data: this.state.web }, this.onAppStateChange);
        this.setState({ working: false });
    }

    render() {
        return (
            <Stack spacing={2} sx={{ width: '30em' }}>
                <Card sx={{ maxWidth: 345 }}>
                    <CardHeader
                        title={this.state.web.title}
                        subheader="September 14, 2016"
                    />
                    <CardActions sx={{ float: "right" }}>
                        <Button size="small" disabled={this.state.working} onClick={this.saveActionHandler}>Save</Button>
                    </CardActions>
                </Card>
                <TextField name="searchText" label="Search" variant="outlined"
                    fullWidth type='text' onKeyPress={this.onKeyPress} />
            </Stack >
        );
    }
}

export default Content