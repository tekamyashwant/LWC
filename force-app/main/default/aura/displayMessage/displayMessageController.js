({
  handleMessage: function (component, event, helper) {
    let msg = event.getParam("fullname");
    alert(msg);
  }
});
