public with sharing class contactController {
  @AuraEnabled(cacheable=true)
  public static list<Contact> getContactList() {
    try {
      list<Contact> conlist = [
        SELECT id, Name, FirstName, LastName, Phone, Email, PhotoUrl, Title
        FROM Contact
        WHERE PhotoUrl != NULL
        WITH USER_MODE
        LIMIT 10
      ];

      return conlist;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static list<Contact> getContactListForDatatable() {
    try {
      list<Contact> conlist = [
        SELECT
          id,
          Name,
          Phone,
          Email,
          Picture__c,
          Title,
          Rank__c,
          AccountId,
          Account.Name
        FROM Contact
        WHERE AccountId != NULL
        WITH USER_MODE
      ];

      return conlist;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }

  @AuraEnabled(cacheable=true)
  public static list<Contact> getContactBasedOnAccount(String accountId) {
    try {
      list<Contact> conlist = [
        SELECT
          Id,
          Name,
          FirstName,
          LastName,
          Title,
          Phone,
          Email,
          Picture__c,
          Rank__c,
          AccountId,
          Account.Name,
          LeadSource
        FROM Contact
        WHERE AccountId = :accountId
        WITH USER_MODE
        LIMIT 10
      ];
      return conlist;
    } catch (Exception e) {
      throw new AuraHandledException(e.getMessage());
    }
  }
}
