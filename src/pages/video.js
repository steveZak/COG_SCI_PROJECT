import React from "react";
// import {CSVLink, CSVDownload} from 'react-csv';
import { Button, Drawer, Icon } from 'rsuite';
import ReactPlayer from 'react-player';
import 'history';
import 'rsuite/dist/styles/rsuite-default.css';
import Timer from "react-compound-timer/build";


export default class VideoScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            timerup: false
        }
    }

    componentDidMount() {
    }

    handleBack() {
        this.props.history.goBack();
    }

    getTimer() {
        return (
            <Timer initialTime={this.props.location.state.groupID=='A'? 440000:510000}
                    startImmediately={true}
                    direction="backward"
                    checkpoints={[
                        {
                            time: 0,
                            callback: () => {this.setState({timerup: true})},
                        },
                    ]}>
                {({ start, resume, pause, stop, reset, timerState }) => (
                    <React.Fragment>
                        {/* <div>
                            <Timer.Minutes /> minutes
                            <Timer.Seconds /> seconds
                        </div> */}
                        <br />
                    </React.Fragment>
                )}
            </Timer>
        )
    }

    render() {
        return (
            <div>
                <h1 id="startTitle">Watch Short Film</h1>
                <ReactPlayer 
                    id="film"
                    url={this.props.location.state.groupID=='A'?'https://youtu.be/an6DRN4flZM':'https://youtu.be/QP3YywgRx5A'} 
                />
                <p id="Content">
                    Please watch the short film below. You can move to the next step once you finish it. Enjoy!
                </p>
                {this.getTimer()}
                <Button 
                    id="FilmNext"
                    disabled={!this.state.timerup}
                    onClick={() => {
                        this.props.history.push({pathname: this.props.location.state.progress == "q2" ? "/question" : "/conclusion",
                                                state: {sessionID: this.props.location.state.sessionID,
                                                        groupID: this.props.location.state.groupID,
                                                        q1Rating: this.props.location.state.q1Rating,
                                                        q1Timestamp: this.props.location.state.q1Timestamp,
                                                        progress: this.props.location.state.progress}});
                    }}
                    appearance="subtle">
                    {"Next"}
                </Button>
            </div>
        )
    }
}