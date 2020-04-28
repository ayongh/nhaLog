import React, { Component } from 'react';

export default class logDetail extends Component{
    constructor(props)
    {
      super(props);
      this.state = {
        log:null,
        reqheader:null
      };
    }

    componentDidMount()
    {
        if(this.props.location.state !== undefined)
        {
            console.log(this.props.location.state.detail)
            this.setState({
                log:this.props.location.state.detail,
                reqheader: this.props.location.state.detail.reqHeader
            })
        }

    }

    getErrorLevel(errorLevel){

        var errorLevelElement
        if(errorLevel === "Info")
        {
            errorLevelElement = <p style={{background:"green", padding:"10px" , borderRadius:".2rem"}}>{errorLevel}</p>
        }
        else if(errorLevel === "Warning")
        {
            errorLevelElement = <p style={{background:"yellow",padding:"10px",borderRadius:".2rem"}}>{errorLevel}</p>
        }
        else if(errorLevel === "Error")
        {
            errorLevelElement = <p style={{background:"red",padding:"10px",borderRadius:".2rem"}}>{errorLevel}</p>
        }

        return errorLevelElement
    }

    getDetailElement()
    {
        if(this.state.log !== null)
        {
            return <div className="logDetail">

                <div className="inneerContainer">
                    <div className="header">
                        <p className="headerMethod"><strong>{this.state.log.method}</strong></p>
                        <p className="headerRoute">{this.state.log.route}</p>
                    </div>

                    <div className="body">
                        <div className="description">
                            <p className="message">{this.state.log.message}</p>
                        </div>
                        <div className="param">
                            <strong><p className="param_like">parameter</p></strong>
                        </div>
                        <div className="data">
                            {this.getErrorLevel(this.state.log.errorLevel)}
                            <p className="dataContent"><strong>Execution Time:</strong> {this.state.log.executiontime}</p>
                            <p className="dataContent"><strong>Payload Size:</strong> {this.state.log.size}</p>
                        </div>

                        <div className="param">
                            <strong><p className="param_like">Data</p></strong>
                        </div>
                        <div className="reqDataHeader">
                            <div className="content">
                                <p><strong>content</strong></p>
                            </div>
                            <div className="reqheader_Json">
                                <textarea className="text">{JSON.stringify(this.state.reqheader, undefined, 4)}</textarea>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        }
        else
        {
            return <div className="nologDetail"> <p>There is no detail to display please go <a href="/">back</a> to select the log</p></div>
        }
    }

    render() {
        return (
        <div className="App">
            {this.getDetailElement()}
        </div>
        );
    }
}
  