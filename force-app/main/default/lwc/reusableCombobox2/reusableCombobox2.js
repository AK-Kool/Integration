import { LightningElement, api, wire , track} from 'lwc';
import PROFILE_CHANNEL from '@salesforce/messageChannel/ProfileChannel__c';
import COUNTRY_CHANNEL from '@salesforce/messageChannel/CountryLWS__c';
import { publish, MessageContext } from 'lightning/messageService';

const columns = [
    {
        label : 'Name',
        fieldName : 'name'
    },
    {
        label : 'Name1',
        fieldName : 'name1'
    },
    {
        label : 'Name2',
        fieldName : 'name2'
    }
]

export default class ReusableCombobox2 extends LightningElement {
    columns = columns;
    get getColumns()
    {
        this.columns = this.columns.map(row => {
            return { label : row.label };
        });
        return JSON.stringify(this.columns);
    }
    JSON_DATA = [
        {
            // JSON_DATA[0]
            "countries": [
                {
                    "country_name": "United Arab Emirates (the)",
                    "country_code": "AE",
                    "states": [
                        {
                            "state_name": "‘Ajmān",
                            "state_code": "AE-AJ"
                        },
                        {
                            "state_name": "Abū Z̧aby",
                            "state_code": "AE-AZ"
                        },
                        {
                            "state_name": "Dubayy",
                            "state_code": "AE-DU"
                        }
                    ]
                },
                {
                    "country_name": "Albania",
                    "country_code": "AL",
                    "states": [
                        {
                            "state_name": "Berat",
                            "state_code": "AL-01"
                        },
                        {
                            "state_name": "Durrës",
                            "state_code": "AL-02"
                        },
                        {
                            "state_name": "Elbasan",
                            "state_code": "AL-03"
                        }
                    ]
                }
            ]
        }
    ];


    @api recordId;
    @api existingProfile;

    @track abcde;

    @wire(MessageContext)
    messageContext;

    _leftText = '';
    @api
    set leftText(val) {
        this._leftText = val;
    }
    get leftText() {
        return this._leftText;
    }

    _filterText = '';
    @api
    set filterText(val) {
        this._filterText = val;
    }
    get filterText() {
        return this._filterText;
    }

    _maxRecordCount = 0;
    @api
    set maxRecords(val) {
        this._maxRecordCount = val;
    }
    get maxRecords() {
        return this._maxRecordCount;
    }

    _placeholder = 'Select Country...';
    @api
    set placeholder(val) {
        this._placeholder = val;
    }
    get placeholder() {
        return this._placeholder;
    }

    _value = '';
    get getSelectedValue() {
        return this._value;
    }

    _objName = '';
    @api
    set objName(val) {
        if (typeof val === 'string')
            this._objName = val;
    }
    get objName() {
        return this._objName;
    }

    _isRecord = false;
    @api
    set isRecord(val) {
        if (val)
            this._isRecord = val;
    }
    get isRecord() {
        return this._isRecord;
    }

    @track _options = [];
    get getOptions() {
        return this._options.length > 0 ? this._options : [{ label: 'No Data Available', value: 'NA' }];
    }


    connectedCallback()
    {
        //alert(JSON.stringify(JSON_DATA[0].countries));
        
        this._options = this.JSON_DATA[0].countries.map(row => {
            //"country_name": "United Arab Emirates (the)",
            //    "country_code": "AE",
            console.log(JSON.stringify(this._options));
            console.log(`Name : ${row.country_name} and Code ${row.country_code}`);
            return { label : row.country_name , value : row.country_code };
            
        });
    }


    handleChange(event) {
        this._value = event.detail.value;
        let statesMap = [];
        
        this.JSON_DATA[0].countries.forEach(element => {
            if(element.country_code === this._value)
            {
                //alert(JSON.stringify(element.states));
                statesMap = element.states.map(row => {

                    //"state_name": "Berat",
                            //"state_code": "AL-01"
                    return { label : row.state_name , value : row.state_code };
                });
                //alert(JSON.stringify(statesMap));
            }
        });

        const payload = { countryName : this._value , statesLMS : statesMap};
        publish(this.messageContext , COUNTRY_CHANNEL , payload);
    }
}