export interface CustomerRequest {
    firstName: string,
    lastName: string,
    mobileNumber : string,
    email : string,
    company : string,
    insurance : string,
    remarks : string
}

export interface Customer {
    id : number,
    name: {
        firstName: string,
        lastName: string,
        val: string,
    },
    mobileNumber : string,
    email : string,
    company : string,
    insurance : string,
    remarks : string
}