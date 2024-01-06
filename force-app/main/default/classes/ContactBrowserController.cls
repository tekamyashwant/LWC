public with sharing class ContactBrowserController {
    @AuraEnabled(cacheable=true)
    public static list<Contact> getContactRecordslist(String accountId, String industry){
        String query='Select id,Name,Email,Phone,PhotoUrl from Contact';
        list<String> filters=new list<String>();
        if(String.isNotBlank(accountId)){
            filters.add('accountId =: accountId');
        }
        if(String.isNotBlank(industry)){
            filters.add('Contact.Account.Industry =: industry');
        }
        if(!filters.isEmpty()){
            query+=' where '+String.join(filters,' AND ');
        }
        query+=' With USER_MODE ';
        query+='ORDER by Name';

        list<Contact> contactList=Database.query(query);
        return contactList;

    }

}