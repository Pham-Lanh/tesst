
var listfeedback=[];
function feedback(username,email,conten,feedback) {

    this.Username=username;
    this.Email=email;
    this.Conten=conten;
    this.Feedback=feedback;

}
window.onload=function () {
    loadfeedback();

};

$(document).ready(function () {
    firebase.initializeApp(config);
    $(document).on('click','.showUser',function () {
        var id=$(this).data('id');
        console.log(listfeedback[id].Username);
        $('#username').val(listfeedback[id].Username);
        $('#usermail').val(listfeedback[id].Email);
        $('#subject').val(listfeedback[id].Conten);
        $('#message').val(listfeedback[id].Feedback);

        // $('#exampleInputAvatar').val(loadUser[id].Avatar);




        $('#savedata').data('save',id);
        $('#savedata1').data('save',id);


    });
    $(document).on('click','.deleteUser',function () {
        var id=$(this).data('id');
        $('#savedata1').data('save',id);


    });
    $('#savedata1').click(function () {
        var id=($('#savedata1').data('save'));
        var rootRef = firebase.database().ref().child('feedback/'+id);
        rootRef.remove();
        window.location.reload(true);




    });




});
function loadfeedback() {
    var rootRef = firebase.database().ref().child('feedback/');

    rootRef.on('child_added', function (data,i) {
        var j = data.val();
        listfeedback.push(new feedback(j.Username,j.Email,j.Conten,j.Feedback));
        if(i===null)
        {
            i=0;
        }
        else {
            i=parseInt(i)+1;

        }
        document.getElementById('putdata').innerHTML +=PushData(i,j.Username,j.Email,j.Conten,j.Feedback);



    });


}
function PushData(id,username,email,conten,feedback){
    return '<tr>'
        + '   <td>'+id+'</td>'
        + '   <td>'+username+'</td>'
        +'   <td>'+email+'</td>'
        +'<td>'+conten+'</td>'
        + '   <td>'+feedback+'</td>'
        +' <td><i data-toggle="modal" data-target="#squarespaceModal" class="fas fa-user-tag showUser" data-id="' + id + '"></i></td>'
        +'   </tr>';

};