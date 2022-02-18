/*
	Username - aakakhilesh@yahoo.com.ein
	Password - Apple@1221
	Rest Service URL - https://testcompany-35b-dev-ed.my.salesforce.com/services/apexrest/v1/welcome/Hello
*/
@RestResource(urlMapping='/v1/welcome/*')
global with sharing class WelcomeClass 
{
	global Final static String WELCOME_MESSAGE = 'Welcome to Salesforce.';
    @httpGet
    global static String greetingMessage(){
        return WELCOME_MESSAGE;
    }
    @httpPost
    global static String postGreetingMessage(){
        return WELCOME_MESSAGE;
    }
    @httpPatch
    global static String patchGreetingMessage(){
        return WELCOME_MESSAGE + ' Update with PATCH.';
    }
}