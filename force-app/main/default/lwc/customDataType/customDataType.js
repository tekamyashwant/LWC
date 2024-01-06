import LightningDatatable from "lightning/datatable";
import customNameTemplate from "./customName.html";
import customRankTemplate from "./customRank.html";
import customPictureTemplate from "./customPicture.html";
import customPickListTemplate from "./customPickList.html";
import customPickListEditTemplate from "./customPickListEdit.html";

export default class CustomDataType extends LightningDatatable {
  static customTypes = {
    customName: {
      template: customNameTemplate,
      standardCellLayout: true,
      typeAttributes: ["contactName"]
    },
    customRank: {
      template: customRankTemplate,
      standardCellLayout: false,
      typeAttributes: ["rankIcon"]
    },
    customPicture: {
      template: customPictureTemplate,
      standardCellLayout: true,
      typeAttributes: ["customPicture"]
    },
    customPicklist: {
      template: customPickListTemplate,
      editTemplate: customPickListEditTemplate,
      standardCellLayout: true,
      typeAttributes: ["options", "value", "context"]
    }
  };
}
