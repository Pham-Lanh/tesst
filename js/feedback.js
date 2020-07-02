
var listfeedback=[];
function feedback(username,email,conten,feedback) {

    this.Username=username;
    this.Email=email;
    this.Conten=conten;
    this.Feedback=feedback;

}

$(document).ready(function () {
    loadfeedback();

    $('#sendfeedback').click(function () {
        var username=$('#username').val();
        var email=$('#usermail').val();
        var conten=$('#subject').val();
        var feedbackk=$('#message').val();
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        if(!filter.test(email)){
            $('#usermail').html('Invalid email!');
            return;
        }
        var id;
        if(listfeedback.length==0){
            id=0;
        }else {
            id=listfeedback.length;
        }


        var c= new feedback(username,email,conten,feedbackk)
        var rootRef = firebase.database().ref().child('feedback/'+id);
        rootRef.set(c);
        alert('thank you !');
    });
});
function loadfeedback() {
    var rootRef = firebase.database().ref().child('feedback/');

    rootRef.on('child_added', function (data) {
        var j = data.val();


        listfeedback.push(new feedback(j.Username,j.Email,j.Conten,j.Feedback));





    });


}