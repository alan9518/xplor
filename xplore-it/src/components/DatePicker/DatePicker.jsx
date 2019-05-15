/* ==========================================================================
** Custom Datepicker
** Using https = //github.com/airbnb/react-dates
** 28/01/2019
** Alan Medina Silva
** ========================================================================== */

// --------------------------------------
// Get Dependences
// --------------------------------------
    import React, { Component } from 'react';
    import 'react-dates/initialize';
    import 'react-dates/lib/css/_datepicker.css';
    import { DateRangePicker, SingleDatePicker } from 'react-dates';
    import moment from 'moment';
    import PropTypes from 'prop-types';

// --------------------------------------
// Create Component Class
// --------------------------------------

class DatePicker extends Component {
    
    // --------------------------------------
    // Constructor
    // --------------------------------------
    constructor(props) {
        super(props);
        this.state = {
            // startDate :  props.initialValue ||  moment() ,
            // focusedInput: 'startDate',
            date: this.convertStringToMomentObject(props.initialValue) ||  moment() ,
            // date :  moment().format()
            // focused: null
        };
    }

     // --------------------------------------
            // Convert String to Moment Object
            // --------------------------------------
            convertStringToMomentObject(date) {
				console.log("TCL: DatePicker -> convertStringToMomentObject -> date", date)
                let dateObj = new Date(date);
                let momentObj = moment(dateObj);
                let dateFormat = moment(dateObj).format("DD/MM/YYYY");
				//console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> dateFormat', dateFormat)
                //console.log('TCL: RequirementsDefinition -> convertStringToMomentObject -> momentObj', momentObj)
                
                return momentObj;
            }

    // --------------------------------------
    // Set Component TabIndex
    // --------------------------------------
    componentDidMount() {
        const {name, tabIndex} = this.props;
		console.log("TCL: DatePicker -> componentDidMount -> this.props", this.props)
        // document.getElementById(name).tabIndex = tabIndex;
    }

    // --------------------------------------
    // Use empty value instead of null to ensure it's treated as a controlled component
    // --------------------------------------
    getValueAsString = date => (date ? date.toISOString()  : '')


    // --------------------------------------
    // Handle Input Change
    // --------------------------------------
    handleChange = (date) => {
		console.log("TCL: DatePicker -> handleChange -> date", date)
		// const {name} = this.props;
		
        this.setState({ date:date })
        // const dateStr = this.getValueAsString(startDate)
        // this.props.onDateChange(name, dateStr, startDate);
    }



    render() {
        const {name, editField,  readOnly, tabIndex, } = this.props;
        const containerStyles = this.state.focused === true ? {marginBottom:'600px', transition : 'all .3s ease'} : {marginBottom:'0', transition : 'all .3s ease'} 
       
        return (
            
           
            <div style = {containerStyles} className = "xpl-animateContainer">
                    <SingleDatePicker
                        name = {name}
                        id = {name}
                        showDefaultInputIcon = {true}
                        inputIconPosition="after"
                        small={true}
                        isOutsideRange={() => false}
                        numberOfMonths={1}
                        date={this.state.date}
                        onDateChange={date => this.handleChange(date)}
                        focused={this.state.focused}
                        onFocusChange={({ focused }) =>
                          this.setState({ focused })
                        }
                        openDirection="down"
                        // hideKeyboardShortcutsPanel={true}
                    />
            </div>
        )

               



        
    }
}




// -------------------------------------- 
// Define PropTypes 
// -------------------------------------- 
// DatePicker.propTypes = {
//     props :  PropTypes
// };
// --------------------------------------
// Export Component
// --------------------------------------
export default DatePicker;