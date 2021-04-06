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
        console.log("hello")
    }

    handleBack() {
        this.props.history.goBack();
        // this.props.history.push("/");
    }

    getTimer() {
        return (
            <Timer initialTime={5000}
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
                        <div>
                            <Timer.Minutes /> minutes
                            <Timer.Seconds /> seconds
                        </div>
                        <br />
                    </React.Fragment>
                )}
            </Timer>
        )
    }

    render() {
        return (
            <div style={{ position: "absolute", alignSelf: "center", marginLeft: "1%"}}>
                <ReactPlayer url={this.props.location.state.groupID=='A'?'https://youtu.be/an6DRN4flZM':'https://youtu.be/QP3YywgRx5A'} />
                <p>Have a look at this video! You'll be able to continue once the video is over.</p>
                {this.getTimer()}
                <Button disabled={!this.state.timerup}
                        onClick={() => {
                            this.props.history.push({pathname: this.props.location.state.progress == "q2" ? "/question" : "/conclusion",
                                                    state: {sessionID: this.props.location.state.sessionID,
                                                            groupID: this.props.location.state.groupID,
                                                            q1Rating: this.props.location.state.q1Rating,
                                                            progress: this.props.location.state.progress}});
                        }}
                        appearance="subtle">
                        {"Next"}
                </Button>
            </div>
        )
    }
}