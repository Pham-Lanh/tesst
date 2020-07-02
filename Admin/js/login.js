var config = {
    apiKey: "AIzaSyCV5u83vTvZOYvSO74gUxDZzVt6OGBaPoU",
    authDomain: "festival-44896.firebaseapp.com",
    databaseURL: "https://festival-44896.firebaseio.com",
    projectId: "festival-44896",
    storageBucket: "festival-44896.appspot.com",
    messagingSenderId: "597549870722"
};
firebase.initializeApp(config);

var listAdmin=[];
function Admin(username,pass) {

    this.Username=username;
    this.Password=pass;

}
function loadAdmin() {
    var rootRef = firebase.database().ref('Admin/');

    rootRef.on('child_added', function (data) {
        var j = data.val();
        listAdmin.push(new Admin(j.Username, j.Password));
    });


}
window.onload=function () {
  loadAdmin();



};

$(document).ready(function () {

    console.log(listAdmin);

    $('#login').click(function () {
        var username=$('#username').val().trim();
        var password=$('#password').val().trim();
        var count =0;
        for(var i in listAdmin){
            if(username==listAdmin[i].Username && password==listAdmin[i].Password){
                window.location.href='../page/Profile.html';
                count++;

            }

        }
        if(count==0){
            alert('login faild');

        }

    });
});
