/* ==========================================================================
 * Multiple Options Select 
 * Using React-Select 
 * 15/11/2018
 * Alan Medina Silva
 ========================================================================== */

// --------------------------------------
// Import Dependences
// --------------------------------------
    import React, { Component } from "react";
    import PropTypes from "prop-types";
    import Select from 'react-select';


    const groupStyles = {
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between"
    };

    const groupBadgeStyles = {
        backgroundColor: "#EBECF0",
        borderRadius: "2em",
        color: "#172B4D",
        display: "inline-block",
        fontSize: 12,
        fontWeight: "normal",
        lineHeight: "1",
        minWidth: 1,
        padding: "0.16666666666667em 0.5em",
        textAlign: "center"
    };

    const formatGroupLabel = data => (
        <div style={groupStyles}>
            <span>{data.label}</span>
            <span style={groupBadgeStyles}>{data.options.length}</span>
        </div>
    );

    export default (props) => (
        <Select
            isMulti
            defaultValue={props.options[1]}
            options={props.options}
            className="basic-multi-select"
            classNamePrefix="select"
            // formatGroupLabel={formatGroupLabel}
        />
    );