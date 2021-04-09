import React from "react";
import 'rsuite/dist/styles/rsuite-default.css';

export default class ConclusionScreen extends React.Component {
    state = {
    }

    render() {
        return (
            <div id="Content">
                <p>Thank you for completing this study. :) </p>
                <br></br>
                <p>Here is your survey code {this.props.location.state.sessionID}.</p>
            </div>
        )
    }
}