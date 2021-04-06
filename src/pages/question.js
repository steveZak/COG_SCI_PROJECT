import React from "react";
// import {CSVLink, CSVDownload} from 'react-csv';
import { Button, Drawer, Icon, Slider } from 'rsuite';
import ReactPlayer from 'react-player';
import 'history';
import 'rsuite/dist/styles/rsuite-default.css';
import Timer from "react-compound-timer/build";


export default class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 5
        }
    }

    componentDidMount() {
        console.log(this.props.location.state);
    }

    handleBack() {
        this.props.history.goBack();
        // this.props.history.push("/");
    }

    addResponse = async () => {
        try {
            const apiUrl = "http://localhost:5000/addResponse?sessionID=" + this.props.location.state.sessionID
                + "&groupID=" + this.props.location.state.groupID + "&q1=" + this.props.location.state.q1Rating + "&q2=" + this.state.rating;
            await fetch(apiUrl, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
        } catch (error) {
            console.log(error);
            console.log("failed to add a student");
        }
    }

    render() {
        return (
            <div style={{ position: "absolute", alignSelf: "center", marginLeft: "1%" }}>
                <div>
                    <p>
                        {(this.props.location.state.groupID=='A'&&this.props.location.state.progress=="q1")||(this.props.location.state.groupID=='B'&&this.props.location.state.progress=="q2")?"From 1 to 10, how likely do you think an empathy and attachment can be established between human and machine/robot/AI?":
                        "From 1 to 10, how likely do you think that human subjective experiences can be digitized into data?"}
                    </p>
                </div>
                <Slider
                    defaultValue={5}
                    min={1}
                    step={1}
                    max={10}
                    graduated
                    progress
                    renderMark={mark => {
                        return mark;
                    }}
                    onChange={val =>{
                        this.state.rating = val;}}
                />
                <div>
                    <Button onClick={() => this.props.history.goBack()}
                            appearance="subtle">
                            {"Back"}
                    </Button>
                    <Button onClick={() => {
                        if (this.props.location.state.progress=="q2"){
                            this.addResponse();
                        }
                        this.props.history.push({pathname: this.props.location.state.progress == "q1" ? "/video" : "/conclusion",
                                                state: {progress: this.props.location.state.progress == "q1" ? "q2" : "done",
                                                        q1Rating: this.state.rating,
                                                        sessionID: this.props.location.state.sessionID,
                                                        groupID: this.props.location.state.groupID}});
                    }}
                        appearance="subtle">
                        {"Next"}
                    </Button>
                </div>
            </div>
        )
    }
}