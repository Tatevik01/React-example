import React, { useState } from 'react';
import './CustomPopover.scss';

import { makeStyles } from '@material-ui/core/styles';
import Popover from '@material-ui/core/Popover';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';

import CountrySelect from './CountrySelect/CountrySelect';
import IndustrySelect from './IndustrySelect/IndustrySelect';
import EmployeesRange from './EmployeesRange/EmployeesRange';
import TechnologySelect from './TechnologySelect/TechnologySelect';

const useStyles = makeStyles(theme => ({
    popover1: {
        padding: '20px 140px 20px 20px',
    },
    popover2: {
        padding: '20px',
        overflowX: 'inherit',
        overflowY: 'inherit',
    },
    radioLabel: {
        '&:hover' : {
            color: '#3898DE',
        },
    },
}));

const CustomPopover = ({ anchorEl, handlePopoverClose, createAlert, setCountries, getSearchedIndustries, setIndustries, setEmployeesCount, getSearchedTechnologiesForSelect, setTechnology }) => {
    const classes = useStyles();
    const [showSelect, setShowSelect] = useState(false);

    const handleRadioButtonClick = event => {
        if(event.target.value) {
            if(event.target.value === 'all') {
                handlePopoverClose();
            }else {
                setShowSelect(true);
            };
            if(anchorEl.id === 'countries') {
                setCountries({ type: event.target.value, countries: [] });
            }else {
                setIndustries({ type: event.target.value, industries: [] });
            };
        };
    };

    const handleSelectClose = event => setShowSelect(false);

    return (
        <Popover
            open={Boolean(anchorEl)}
            anchorEl={anchorEl}
            PaperProps={anchorEl && anchorEl.id === 'countries' && !showSelect || anchorEl && anchorEl.id === 'industries' && !showSelect ? {className: classes.popover1} : {className: classes.popover2}}
            onClose={() => {}}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
            transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        >
            {
                anchorEl && anchorEl.id === 'countries' || anchorEl && anchorEl.id === 'industries' ?
                    !showSelect ?
                        <FormControl component="fieldset">
                            <RadioGroup aria-label="select" name="select" value={createAlert[`selected${anchorEl.id[0].toUpperCase()}${anchorEl.id.slice(1)}`].type} onClick={handleRadioButtonClick}>
                                <FormControlLabel className={classes.radioLabel} value="all" control={<Radio />} label={anchorEl && anchorEl.id === 'countries' ?  'Any country' : 'Any industry vertical'} />
                                <FormControlLabel className={classes.radioLabel} value="choosen" control={<Radio />} label={anchorEl && anchorEl.id === 'countries' ?  'Specific countries...' : 'Specific industry verticals...'} />
                                <FormControlLabel className={classes.radioLabel} value="except" control={<Radio />} label={anchorEl && anchorEl.id === 'countries' ?  'Any country but...' : 'Any industry vertical but...'} />
                            </RadioGroup>
                        </FormControl>
                    :
                        anchorEl && anchorEl.id === 'countries' ?
                            <CountrySelect selectedCountries={createAlert.selectedCountries} setCountries={setCountries} handleSelectClose={handleSelectClose} handlePopoverClose={handlePopoverClose} />
                        :
                            <IndustrySelect selectedIndustries={createAlert.selectedIndustries} getSearchedIndustries={getSearchedIndustries} setIndustries={setIndustries} handleSelectClose={handleSelectClose} handlePopoverClose={handlePopoverClose} />
                    :
                    anchorEl && anchorEl.id === 'range' ?
                        <EmployeesRange employeesCount={createAlert.employeesCount} setEmployeesCount={setEmployeesCount} handlePopoverClose={handlePopoverClose} />
                    :
                        <TechnologySelect selectedTechnology={createAlert.selectedTechnology} getSearchedTechnologiesForSelect={getSearchedTechnologiesForSelect} setTechnology={setTechnology} handlePopoverClose={handlePopoverClose} />
            }
        </Popover>
    );
}

export default CustomPopover