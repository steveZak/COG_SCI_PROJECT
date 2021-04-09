import React from "react";
import { Button } from 'rsuite';
import 'rsuite/dist/styles/rsuite-default.css';

export default class IntroScreen extends React.Component {
    state = {}

    render() {
        return (
            <div>
                <div>
                    <h1 id="startTitle">Introduction</h1>
                    <div id="introContent">
                        <p>
                            Welcome to our Cognitive Science study! This survey/study takes less than 10 minutes - it involves
                            answering two questions and watching a short film in-between. You will need to complete all
                            of them to finish. I hope you enjoy this time!
                        </p>
                        <br></br>
                        <br></br>
                        <p>
                            Please click "Begin" to get started.
                        </p>
                    </div>

                </div>
                <div>
                <Button id="StartEnd" onClick={() => {
                    this.props.history.push(
                        {
                            pathname: "/question",
                            state: {
                                sessionID: Date.now(),
                                groupID: Math.round(Math.random())==0?'A':'B',
                                progress: "q1"
                            }
                        }
                    );}}
                    appearance="subtle">
                        Begin
                </Button>
                </div>
            </div>
        )
    }
}