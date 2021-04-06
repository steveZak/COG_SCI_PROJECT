import React from "react";
import Layout from '../components/layout.js';
import { Button, Drawer, Dropdown } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export default class IntroScreen extends React.Component {
    state = {}

    render() {
        return (
            <div style={{position: "absolute", alignSelf: "center", marginLeft: "1%"}}>
                <div>
                    <p>Welcome to our Cognitive Science study:)
                    </p>
                </div>
                <div>
                <Button onClick={() => {
                                        this.props.history.push({pathname: "/question",
                                                                state: {sessionID: Date.now(),
                                                                        groupID: Math.round(Math.random())==0?'A':'B',
                                                                        progress: "q1"}});
                                        }}
                        appearance="subtle">
                            Begin
                </Button>
                </div>
            </div>
        )
    }
}