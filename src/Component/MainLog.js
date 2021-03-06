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
        peginationElement:19
      };
    }
  
    componentDidMount() {
        let componentThis = this
        axios.post('https://nhaserver.herokuapp.com/log').then( async function (res)
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

    handleClick = () => {
        let componentThis = this
        var payload = {
            datasize:componentThis.state.peginationElement * 2 
        }
        axios.post('https://nhaserver.herokuapp.com/log', payload).then( async function (res)
        {
            if(res.status ===200)
            {
                await componentThis.setState({
                    logArray:res.data,
                    peginationElement:(componentThis.state.peginationElement * 2 )-1
                })
            }
        }).catch(function(err)
        {
           return  <a>error occured</a>
        })
    }

    getMoreElement()
    {
        var element

        if( this.state.logArray !== null)
        {
            console.log(this.state.logArray.length)
            if(this.state.peginationElement<this.state.logArray.length)
            {
                element = <a onClick={this.handleClick}>more</a>;
            }
        }
        return element
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
                {this.getMoreElement()}
            </header>
        </div>
      );
    }
}
  