import React from "react";

const AlertBar = (props) => {

    const errorStyle = {           
        width: "100vw",
        paddingTop: "-10",
        textAlign: "center",       
        color: "#941515", 
        fontSize: "3vw",
        backgroundColor: '#f8f5ec'

    }

    return(
        <div className="error">
            {props.error === true && <p style={errorStyle}>connection error</p>}
        </div>
    )
}

export default AlertBar;