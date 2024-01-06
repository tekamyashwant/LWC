import { LightningElement, wire } from "lwc";
import LOGO from "@salesforce/resourceUrl/myLogo";
import ASSET_LOGO from "@salesforce/contentAssetUrl/tigerAssetLogo";
import GREETING from "@salesforce/label/c.greetings";
import SALESFORCE_PLATFORM from "@salesforce/label/c.salesforcePlatform";
import USER_ID from "@salesforce/user/Id";
import NAME_FIELD from "@salesforce/schema/User.Name";
import EMAIL_FIELD from "@salesforce/schema/User.Email";
import { getFieldValue, getRecord } from "lightning/uiRecordApi";
import CHECK_PERMISSION from "@salesforce/customPermission/displayText";
import ANIMATE_CSS from "@salesforce/resourceUrl/ThirdPartyCSS";
import MOMENT_JS from "@salesforce/resourceUrl/ThirdPartyJS";
import { loadStyle, loadScript } from "lightning/platformResourceLoader";
export default class StaticResourcesDemo extends LightningElement {
  myLogoImage = LOGO;
  myAssetLogo = ASSET_LOGO;
  label = {
    greetings: GREETING,
    platform: SALESFORCE_PLATFORM
  };
  name = "";
  email = "";
  displayDate = "";

  @wire(getRecord, {
    recordId: USER_ID,
    fields: [NAME_FIELD, EMAIL_FIELD]
  })
  wire_getUserRecord_Function({ data, error }) {
    if (data) {
      console.log("Logged in user details", data);
      this.name = getFieldValue(data, NAME_FIELD);
      this.email = getFieldValue(data, EMAIL_FIELD);
    } else if (error) {
      console.log("Logged in user details error", error);
    }
  }

  renderedCallback() {
    Promise.all([loadStyle(this, ANIMATE_CSS), loadScript(this, MOMENT_JS)])
      .then(() => {
        console.log("load successfully");
        this.fetch();
      })
      .catch((error) => {
        console.log("Failed to load successfully", error);
      });
  }

  get checkPermission() {
    return CHECK_PERMISSION;
  }

  fetch() {
    this.displayDate = moment().format("LLLL");
  }
}
