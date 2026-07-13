const connToken = "CONNECTION_TOKEN";
const dbName = "SCHOOL-DB";
const relName = "STUDENT-TABLE";
let rec_no = "";
$(document).ready(function () {
    resetForm();
});
function disableFields() {
    $("#fullName").prop("disabled", true);
    $("#studentClass").prop("disabled", true);
    $("#birthDate").prop("disabled", true);
    $("#address").prop("disabled", true);
    $("#enrollDate").prop("disabled", true);
}
function enableFields() {
    $("#fullName").prop("disabled", false);
    $("#studentClass").prop("disabled", false);
    $("#birthDate").prop("disabled", false);
    $("#address").prop("disabled", false);
    $("#enrollDate").prop("disabled", false);
}
function resetForm() {
    $("#studentForm")[0].reset();
    rec_no = "";
    $("#rollNo").prop("disabled", false);
    disableFields();
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", true);
    $("#rollNo").focus();
}
function validateData() {
    if ($("#rollNo").val() === "") {
        alert("Roll Number Required");
        $("#rollNo").focus();
        return "";
    }
    if ($("#fullName").val() === "") {
        alert("Full Name Required");
        $("#fullName").focus();
        return "";
    }
    if ($("#studentClass").val() === "") {
        alert("Class Required");
        $("#studentClass").focus();
        return "";
    }
    if ($("#birthDate").val() === "") {
        alert("Birth Date Required");
        $("#birthDate").focus();
        return "";
    }
    if ($("#address").val() === "") {
        alert("Address Required");
        $("#address").focus();
        return "";
    }
    if ($("#enrollDate").val() === "") {
        alert("Enrollment Date Required");
        $("#enrollDate").focus();
        return "";
    }
    let jsonObj = {
        rollNo: $("#rollNo").val(),
        fullName: $("#fullName").val(),
        studentClass: $("#studentClass").val(),
        birthDate: $("#birthDate").val(),
        address: $("#address").val(),
        enrollDate: $("#enrollDate").val()
    };
    return JSON.stringify(jsonObj);
}
function enableSaveMode() {
    enableFields();
    $("#saveBtn").prop("disabled", false);
    $("#updateBtn").prop("disabled", true);
    $("#resetBtn").prop("disabled", false);
    $("#fullName").focus();
}
function enableUpdateMode() {
    enableFields();
    $("#rollNo").prop("disabled", true);
    $("#saveBtn").prop("disabled", true);
    $("#updateBtn").prop("disabled", false);
    $("#resetBtn").prop("disabled", false);
    $("#fullName").focus();
}
function fillData(jsonObj) {
    $("#rollNo").val(jsonObj.rollNo);
    $("#fullName").val(jsonObj.fullName);
    $("#studentClass").val(jsonObj.studentClass);
    $("#birthDate").val(jsonObj.birthDate);
    $("#address").val(jsonObj.address);
    $("#enrollDate").val(jsonObj.enrollDate);
}
function getStudent() {
    var roll = $("#rollNo").val();
    if (roll === "") {
        resetForm();
        return;
    }
    var jsonStr = JSON.stringify({
        rollNo: roll
    });
    var getReq = createGET_BY_KEYRequest(
        connToken,
        dbName,
        relName,
        jsonStr
    );
    jQuery.ajaxSetup({
        async: false
    });
    var resultObj = executeCommandAtGivenBaseUrl(
        getReq,
        "http://api.login2explore.com:5577", "/api/irl"
    );
    jQuery.ajaxSetup({
        async: true
    });
    if (resultObj.status === 400) {
        enableSaveMode();
        return;
    }
    if (resultObj.status === 200) {
        var data = JSON.parse(resultObj.data);
        rec_no = data.rec_no;
        fillData(data.record);
        enableUpdateMode();
    }
}
function saveData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return;
    }
    var putReq = createPUTRequest(
        connToken,
        jsonStr,
        dbName,
        relName
    );
    jQuery.ajaxSetup({
        async: false
    });
    var resultObj = executeCommandAtGivenBaseUrl(
        putReq,
        "http://api.login2explore.com:5577", "/api/iml"
    );
    jQuery.ajaxSetup({
        async: true
    });
    alert("Student Record Saved Successfully");
    resetForm();
}
function updateData() {
    var jsonStr = validateData();
    if (jsonStr === "") {
        return;
    }
    var updateReq = createUPDATERequest(
        connToken,
        jsonStr,
        dbName,
        relName,
        rec_no
    );
    jQuery.ajaxSetup({
        async: false
    });
    var resultObj = executeCommandAtGivenBaseUrl(
        updateReq,
        "http://api.login2explore.com:5577", "/api/iml"
    );
    jQuery.ajaxSetup({
        async: true
    });
    alert("Student Record Updated Successfully");
    resetForm();
}