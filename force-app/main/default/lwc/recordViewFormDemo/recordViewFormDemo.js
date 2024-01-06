import { LightningElement, api } from "lwc";
import ACCOUNT_NAME_FIELD from "@salesforce/schema/Account.Name";
import ACCOUNT_INDUSTRY_FIELD from "@salesforce/schema/Account.Industry";
import ACCOUNT_RATING_FIELD from "@salesforce/schema/Account.Rating";
import ACCOUNT_REVENUE_FIELD from "@salesforce/schema/Account.AnnualRevenue";

export default class RecordViewFormDemo extends LightningElement {
  @api recordId;
  @api objectApiName;
  fieldsObject = {
    name: ACCOUNT_NAME_FIELD,
    industry: ACCOUNT_INDUSTRY_FIELD,
    rating: ACCOUNT_RATING_FIELD,
    revenue: ACCOUNT_REVENUE_FIELD
  };
}
