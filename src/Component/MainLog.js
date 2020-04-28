import React, { Component } from 'react';
import axios from 'axios'
import {
    Link
} from "react-router-dom";

export default class MainLog extends Component{
    constructor(props)
    {
      super(props);
      this.state = {
        logArray:null,
      };
    }
  
    componentDidMount() {
        let componentThis = this
        axios.post('http://localhost:3001/log').then( async function (res)
        {
            if(res.status ===200)
            {
                await componentThis.setState({
                    logArray:res.data
                })
            }
        }).catch(function(err)
        {
            console.log(err)
        })
    }

    getLogElement()
    {
        var tableElement;

        if(this.state.logArray !== null)
        {
            console.log(this.state.logArray)
           tableElement = this.state.logArray.map((val,index)=>{

            if(typeof(val.message) === "object")
            {
                if(val.method === "POST")
                {
                    return(
                        <tr className="row" key = {val._id} style={{background:"antiquewhite"}}>
                            <td style={{color:"green"}}>{val.timestamp}</td>
                            {this.getErrorLevel(val.errorLevel)}
                            <td><strong>{val.method}</strong></td>
                            <td>{val.route}</td>
                            <td>{val.message.message}</td>
                            <td>{val.size}</td>
                            <td>{val.executiontime}</td>
                            <td><Link to={{pathname: '/logDetail',state: {detail: val}}}>Detail</Link></td>
                        </tr>
                    )
                }
                else if(val.method === "GET")
                {
                    return(
                        <tr className="row" key = {val._id} style={{background:"cadetblue"}}>
                            <td style={{color:"green"}}>{val.timestamp}</td>
                            {this.getErrorLevel(val.errorLevel)}
                            <td><strong>{val.method}</strong></td>
                            <td>{val.route}</td>
                            <td>{val.message.message}</td>
                            <td>{val.size}</td>
                            <td>{val.executiontime}</td>
                            <td><Link to={{pathname: '/logDetail',state: {detail: val}}}>Detail</Link></td>

                        </tr>
                    )
                }
                else
                {
                    return(
                        <tr className="row" key = {val._id}>
                            <td style={{color:"green"}}>{val.timestamp}</td>
                            {this.getErrorLevel(val.errorLevel)}
                            <td><strong>{val.method}</strong></td>
                            <td>{val.route}</td>
                            <td>{val.message.message}</td>
                            <td>{val.size}</td>
                            <td>{val.executiontime}</td>
                            <td><Link to={{pathname: '/logDetail',state: {detail: val}}}>Detail</Link></td>
                        </tr>
                    )
                }
                
            }
            else
            {
                if(val.method === "POST")
                {
                    return(
                        <tr className="row" key = {val._id} style={{background:"antiquewhite"}}>
                            <td style={{color:"green"}}>{val.timestamp}</td>
                            {this.getErrorLevel(val.errorLevel)}
                            <td><strong>{val.method}</strong></td>
                            <td>{val.route}</td>
                            <td>{val.message}</td>
                            <td>{val.size}</td>
                            <td>{val.executiontime}</td>
                            <td><Link to={{pathname: '/logDetail',state: {detail: val}}}>Detail</Link></td>
                        </tr>
                    )
                }
                else if(val.method === "GET")
                {
                    return(
                        <tr className="row" key = {val._id} style={{background:"cadetblue"}}>
                            <td style={{color:"green"}}>{val.timestamp}</td>
                            {this.getErrorLevel(val.errorLevel)}
                            <td><strong>{val.method}</strong></td>
                            <td>{val.route}</td>
                            <td>{val.message}</td>
                            <td>{val.size}</td>
                            <td>{val.executiontime}</td>
                            <td><Link to={{pathname: '/logDetail',state: {detail: val}}}>Detail</Link></td>
                        </tr>
                    )
                }
                else
                {
                    return(
                        <tr className="row" key = {val._id}>
                            <td style={{color:"green"}}>{val.timestamp}</td>
                            {this.getErrorLevel(val.errorLevel)}
                            <td><strong>{val.method}</strong></td>
                            <td>{val.route}</td>
                            <td>{val.message}</td>
                            <td>{val.size}</td>
                            <td>{val.executiontime}</td>
                            <td><Link to={{pathname: '/logDetail',state: {detail: val}}}>Detail</Link></td>
                        </tr>
                    )
                }
            }
                
           })

           return tableElement
        }
    }

    getErrorLevel(errorLevel){

        var errorLevelElement
        if(errorLevel === "Info")
        {
            errorLevelElement = <td style={{background:"green"}}>{errorLevel}</td>
        }
        else if(errorLevel === "Warning")
        {
            errorLevelElement = <td style={{background:"yellow"}}>{errorLevel}</td>
        }
        else if(errorLevel === "Error")
        {
            errorLevelElement = <td style={{background:"red"}}>{errorLevel}</td>
        }

        return errorLevelElement
    }


    render() {
        
      return (
        <div className="App">
            <header className="App-header">
                <div className="log">
                    <table>
                        <tbody>

                            <tr className="table_label">
                                <th>Time Stamp</th>
                                <th>Error Level</th>
                                <th>Method</th>
                                <th>Route</th>
                                <th>Message</th>
                                <th>Size</th>
                                <th>Time Execution</th>
                                <th>Detail</th>
                            </tr>
                            {this.getLogElement()}
                        </tbody>
                    </table>
                </div>
            </header>
        </div>
      );
    }
}
  