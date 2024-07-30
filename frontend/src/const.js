import React from "react"
import { useLocation } from "react-router-dom"

export const BRANCH_ERRORS = {
    CODE_LENGTH_VALIDATION: 'Branch Code must be exactly 5 digits',
    CODE_FORMAT_VALIDATION: 'Branch Code is not in the correct format',

    CONTACTNUMBER_LENGTH_VALIDATION: 'Contact number must be exactly 10 digits',
    CONTACTNUMBER_FORMAT_VALIDATION: 'Contact Number is not in the correct format',

    ZIPCODE_LENGTH_VALIDATION: 'Zip Code must be exactly 5 digits',
    ZIPCODE_FORMAT_VALIDATION: 'Zip Code is not in the correct format'
}

export const PARCEL_ERRORS = {
    NUMBER_VALIDATION: 'Please enter your email',
    NUMBER_LENGTH_VALIDATION: 'Parcel reference number must be exactly 5 digits',
    NUMBER_FORMAT_VALIDATION: 'Parcel reference number is not in the correct format',

    CONTACTNUMBER_LENGTH_VALIDATION: 'Contact number must be exactly 10 digits',
    CONTACTNUMBER_FORMAT_VALIDATION: 'Contact Number is not in the correct format',

    NIC_LENGTH_VALIDATION: 'NIC must be 10 or 12 digits',
    NIC_FORMAT_VALIDATION: 'NIC is not in the correct format',

    NAME_FORMAT_VALIDATION: 'Name is not in the correct format',

    DATE_FORMAT_VALIDATION: 'Date is not in the correct format',

    STATUS_FORMAT_VALIDATION: 'Status is not in the correct format'
}

export const STAFF_ERRORS = {
    ID_LENGTH_VALIDATION: 'Staff Id must be exactly 5 digits',
    ID_FORMAT_VALIDATION: 'Staff Id is not in the correct format',

    CONTACTNUMBER_LENGTH_VALIDATION: 'Contact number must be exactly 10 digits',
    CONTACTNUMBER_FORMAT_VALIDATION: 'Contact Number is not in the correct format',

    NAME_FORMAT_VALIDATION: 'Name is not in the correct format'
}

export const LOGIN_ERRORS = {
    EMAIL_VALIDATION: 'Please enter your email',

    PASSWORD_VALIDATION: 'Please enter your password',
    PASSWORD_LENGTH_VALIDATION: 'Password must be between 4 and 10 characters',
    PASSWORD_FORMAT_VALIDATION: 'Password is not in the correct format',

    CONFIRM_PASSWORD_VALIDATION: 'Please enter your confirm password',
    CONFIRM_PASSWORD_LENGTH_VALIDATION: 'Confirm Password must be between 4 and 10 characters',
    CONFIRM_PASSWORD_FORMAT_VALIDATION: 'Confirm Password is not in the correct format',
}

export const RESET_PASSWORD_ERRORS = {
    
    PASSWORD_VALIDATION: 'Please enter your password',
    PASSWORD_LENGTH_VALIDATION: 'Password must be between 4 and 10 characters',
    PASSWORD_FORMAT_VALIDATION: 'Password is not in the correct format',

    CONFIRM_PASSWORD_VALIDATION: 'Please enter your confirm password',
    CONFIRM_PASSWORD_LENGTH_VALIDATION: 'Confirm Password must be between 4 and 10 characters',
    CONFIRM_PASSWORD_FORMAT_VALIDATION: 'Confirm Password is not in the correct format',
}

export const Query = () => {
    function useQuery() {
        const {search} = useLocation()
        return React.useMemo(() => new URLSearchParams(search), [search])
    }

     const query = useQuery()
}

