import React from "react";
import { Button, Slider } from 'rsuite';
import 'history';
import 'rsuite/dist/styles/rsuite-default.css';
import Timer from "react-compound-timer/build";


export default class QuestionScreen extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            rating: 5,
            timestamp: Date.now()
        }
    }

    componentDidMount() {
        console.log(this.props.location.state);
    }

    handleBack() {
        this.props.history.goBack();
    }

    addResponse = async () => {
        try {
            const apiUrl = "/addResponse?sessionID=" + this.props.location.state.sessionID
                + "&groupID=" + this.props.location.state.groupID + "&q1=" + this.props.location.state.q1Rating 
                + "&q1Timestamp=" + this.props.location.state.q1Timestamp + "&q2=" + this.state.rating
                + "&q2Timestamp=" + this.state.timestamp;
            await fetch(
                apiUrl, 
                {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );
        } catch (error) {
            console.log(error);
            console.log("failed to add a student");
        }
    }

    render() {

        var question_a = "From 1 to 10, how likely do you think empathy and attachment can be established between human and machine/robot?";
        var question_b = "From 1 to 10, how likely do you think that human subjective experiences can be digitized into data?";
        var question_2_prefix = "Putting the film aside, "
        var question = ''

        if (this.props.location.state.progress=="q2") {
            question += question_2_prefix;
            if (this.props.location.state.groupID=='A') {
                question += question_a.toLowerCase();
            } else {
                question += question_b.toLowerCase();
            }
        } else {
            if (this.props.location.state.groupID=='A') {
                question += question_b;
            } else {
                question += question_a;
            }
        }

        return (
            <div>
                <h1 id="startTitle">Please Answer</h1>
                <div id="Content">
                    <p>
                        {question}
                    </p>
                </div>
                <div class="slidecontainer">
                    <Slider
                        class="slider"
                        defaultValue={5}
                        min={1}
                        step={1}
                        max={10}
                        graduated
                        progress
                        renderMark={mark => {
                            return mark;
                        }}
                        onChange={val => {
                            this.state.rating = val;
                            this.state.timestamp = Date.now();
                        }}
                    />
                </div>
                <div>
                    <Button 
                        id="Back"
                        onClick={() => this.props.history.goBack()}
                        appearance="subtle"
                    >
                            {"Back"}
                    </Button>
                    <Button 
                        id="Next"
                        onClick={() => {
                            if (this.props.location.state.progress=="q2"){
                                this.addResponse();
                            }
                            this.props.history.push(
                                {
                                    pathname: this.props.location.state.progress == "q1" ? "/video" : "/conclusion",
                                    state: {
                                        progress: this.props.location.state.progress == "q1" ? "q2" : "done",
                                        q1Rating: this.state.rating,
                                        q1Timestamp: this.state.timestamp,
                                        sessionID: this.props.location.state.sessionID,
                                        groupID: this.props.location.state.groupID
                                    }
                                }
                            );
                        }}
                        appearance="subtle">
                        {"Next"}
                    </Button>
                </div>
            </div>
        )
    }
}