import React from 'react';
import SelectField from 'material-ui/SelectField'

export default ({ input, label, floatingLabelText, children, ...custom, meta: {error, touched} }) => {

    return (
        <div>
            <SelectField 
                floatingLabelText={floatingLabelText}
                {...input} 
                children={children}
                onChange={(event, index, value) => input.onChange(value)}
                />
        </div>
    );
};