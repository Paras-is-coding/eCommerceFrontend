import React from "react";

class TestPage extends React.Component{
    constructor(props){
        super(props);

        // state create
        this.state = {
            title:"This is default title",
            content:null
        };
        console.log("I'm constructor func");
    }

    componentDidMount = () =>{
        // api calls
        setTimeout(() => {
            this.setState({
                ...this.state,
                title:"This is title",
                content:"This is content"
            })
        }, 2000);
        console.log("I'm compDidMt func");
    }

    componentDidUpdate = () =>{
        console.log("I'm compDidUpdate.");

        increaseValue = ()=>{
            // state change 
        }
    }

    componentWillUnmount = ()=>{
        console.log("I'm componentWillUnmount")
    }

    render = () =>{
        console.log("I'm render func");
        return(
            <div>
                {this.state.title}
                <p>{this.state.content}</p>
            </div>
        )
    }


}



export default TestPage;