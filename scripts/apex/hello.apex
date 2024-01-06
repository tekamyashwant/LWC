for (list<Contact> conlist : [
  SELECT id, name, Rank__c, Picture__c, Title
  FROM Contact
  LIMIT 10
]) {
  for (Contact con : conlist) {
    con.Picture__c = 'https://yt3.googleusercontent.com/k4qc9MqwK_3BHEXmpQXn0EsvUrGQlCdx0sgOgcC32CcMfHb9MraznmGnmQA4QmLH3xJCQZWp=s900-c-k-c0x00ffffff-no-rj';
    if (String.isBlank(con.Title)) {
      con.Rank__c = 3;
    } else {
      con.Rank__c = 8;
    }
  }
  update conlist;
}
