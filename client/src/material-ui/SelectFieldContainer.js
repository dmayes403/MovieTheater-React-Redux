import React from 'react';
import SelectField from 'material-ui/SelectField'
import MenuItem from 'material-ui/MenuItem'

export default ({ input, label, children, ...custom, meta: {error, touched} }) => {

    return (
        <div>
            <div style={{fontSize: '1.2em'}}>{label}</div>
            <SelectField 
                {...input} 
                children={children}
                onChange={(event, index, value) => input.onChange(value)}
                style={{borderBottom: '2px solid #3454b4', fontFamily: '"Prompt", sans-serif'}}
                />
        </div>
    );
};