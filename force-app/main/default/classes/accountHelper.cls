public with sharing class accountHelper {
    @AuraEnabled(cacheable=true)
    public static list<Account> getAccountRecords(String accountIndustry){
        return [Select Id,Name,Industry from Account
         where AnnualRevenue!=null and Industry =: accountIndustry
         WITH USER_MODE];
    }

    @AuraEnabled
    public static string updateAccountRecord(String recordId,String ticker){
        Account acc=new Account(Id=recordId, TickerSymbol=ticker);
        try {
            update acc;
            return 'Success';
        } catch (Exception e) {
            //throw new AuraHandledException(e.getMessage());
            return e.getMessage();
        }
    }
}