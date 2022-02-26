import { LightningElement , api , wire , track} from 'lwc';
import PROFILE_CHANNEL from '@salesforce/messageChannel/ProfileChannel__c';
import COUNTRY_CHANNEL from '@salesforce/messageChannel/CountryLWS__c';
import { subscribe, MessageContext } from 'lightning/messageService';

export default class ShowStates extends LightningElement 
{    
    _isDisabled = true;
    set disabledStatus(val)
    {

    }
    get disabledStatus()
    {
        return this._isDisabled;
    }

    subscription = null;

    _selectedCountry = '';
    get getSelectedCountry()
    {   
        return this._selectedCountry;
    }

    _stateList = [];
    get getStateList()
    {
        return JSON.stringify(this._stateList);
    }

    @api recordId;
    @api existingProfile;


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

    _placeholder = 'Select States...';
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
        if(this.subscription === null)
        {
            this.subscription = subscribe(
                this.messageContext ,
                COUNTRY_CHANNEL ,
                (payload) => this.handlePayload(payload)
            );
        }
        
    }

    handlePayload(payload)
    {
        //alert('PAYLOAD : '+JSON.stringify(payload));
        this._selectedCountry = payload.countryName;
        this._options = payload.statesLMS;
        //alert(JSON.stringify(this._options));
    }


    handleChange(event) {
        this._value = event.detail.value;
        alert(this._value);
        
    }
}