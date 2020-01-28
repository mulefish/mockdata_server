class CreateMockData {
    constructor() {
        this.id = 0
    }
    getMock() {
        this.id++
        const obj = {
            "fname": "fname",
            "lname": "lname",
            "sca": "sca",
            "grp": "grp",
            "aor": "aor",
            "request_month": "June",
            "end_month": "April",
            "sNumber": this.id,
            "trNumber": this.id,
            "submitDate": "11/04/2019",
            "assignee": "Jacqueline Cooper",
            "productType": "D64",
            "transactionType": "D64",
            "groupId": 8,
            "wholeSalerCode": "888795",
            "scaReasonCode": "RGA"
        }
        return obj
    }
}

module.exports = {
    CreateMockData
}