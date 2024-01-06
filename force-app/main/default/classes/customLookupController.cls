public with sharing class customLookupController {
    @AuraEnabled(cacheable=true)
    public static list<sObject> searchRecords(String objectApiName,String searchkey){
        list<sObject> searchRecordsList=new list<sObject>();
        if(String.isNotBlank(searchkey)){
            string key='%'+searchkey+'%';
            String query='Select Id,Name from '+objectApiName+' where Name Like:key';
            searchRecordsList=Database.query(query,AccessLevel.USER_MODE);
        }
        return searchRecordsList;
    }
}