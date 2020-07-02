
var loaduserDetail=[];
var a=  JSON.parse(localStorage.listUser);
var count =0;
function UsersDetail(username,password,email,sdt,fullname,birthday,address,avatar,idcart) {
    this.Username=username;
    this.Password=password;
    this.Email=email;
    this.Sdt=sdt;
    this.Fullname=fullname;
    this.Birthday=birthday;
    this.Address=address;
    this.Avatar=avatar
    this.IdCart=idcart;
}

$(document).ready(function () {
    showUser();

    var c=a.Avatar;


    $('#choosefile').change(function () {

        var filename = $(this).val().split('\\').pop();
        c='../images/Avatar/'+filename;

        $('.avatar').attr('src','../images/Avatar/'+filename);

    });
    $("#updateprofile").click(function () {
        count=0;
        var username=$('#inputUsername').val().trim();
        var password=a.Password;
        var email=$('#inputEmail').val().trim();
        var sdt=$('#inputNumberphone').val();

        var fullname=$('#inputFullname').val().trim();
        var birthday=$('#inputBirthday').val().trim();
        var address=$('#inputAddress').val().trim();
        var avatar=c;
        if(isNaN(sdt)){
            $('.wr5').html( "Enter Numeric value only");
            $('.bowby1').html('Update failed !');
            count++;
            return;
        }
        var u=JSON.parse(localStorage.listUser);
        var newUser=new UsersDetail(username,password,email,sdt,fullname,birthday,address,avatar,u.IdCart);
            var rootRef = firebase.database().ref().child('login/'+a.Id);
            rootRef.set(newUser);
            $('.bowby1').html('Update successful !');






    });
    $('#logout').click(function () {
            window.location.href='../page/Home_2.html';


    });
    $('#savedata2').click(function () {
        var sdt=$('#inputNumberphone').val();
    if(!isNaN(sdt)){
        window.location.reload(true);

    }

    });


});

function showUser() {
    var rootRef = firebase.database().ref().child('login/');
    rootRef.on('child_added', function (data,id) {
        var j = data.val();
        if(id==null){
            id=0;
        }else {
            id=parseInt(id)+1;

        }
        if(id==a.Id){

            $('#inputUsername').val(j.Username);
            $('#inputEmail').val(j.Email);
            $('#inputAddress').val(j.Address);
            $('#inputFullname').val(j.Fullname);
            $('#inputNumberphone').val(j.Sdt);
            $('#inputBirthday').val(j.Birthday);
            // $('#choosefile').val(j.Avatar);
            $('.avatar').attr('src',j.Avatar);

        }





    });




}


