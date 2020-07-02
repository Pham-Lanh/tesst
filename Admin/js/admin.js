

var loadUser=[];
var loadCart=[];

function Cart(ticket, tour, hotel, total) {
    this.Ticket = ticket;
    this.Tour = tour;
    this.Hotel = hotel;
    this.Total = total;

}

function Users(username,password,email,sdt,fullname,birthday,address,avatar,idcart) {


    this.Username=username;
    this.Password=password;
    this.Email=email;
    this.Sdt=sdt;
    this.Fullname=fullname;
    this.Birthday=birthday;
    this.Address=address;
    this.Avatar=avatar
    this.IdCart= idcart;



};
function loaddataCart() {
    var rootRef = firebase.database().ref().child('cart/');

    rootRef.on('child_added', function (data,id) {
        var j = data.val();
        if(id==null){
            id=0;
        }else {
            id=parseInt(id)+1;

        }
        loadCart.push(new Cart(j.Tichket,j.Tour,j.Hotel));





    });

}

function loadUserData() {


    var rootRef = firebase.database().ref('login/');

    rootRef.on('child_added', function (data,i) {
        var j = data.val();
        loadUser.push(new Users(j.Username, j.Password, j.Email, j.Sdt,j.Fullname,j.Birthday,j.Address,j.Avatar,j.IdCart));
        
        if(i===null)
        {
            i=0;
        }
        else {
            i=parseInt(i)+1;

        }
        document.getElementById('putdata').innerHTML +=PushData(i,j.Username, j.Password, j.Email, j.Sdt,j.Fullname,j.Birthday,j.Address,j.Avatar,j.IdCart);









    });


};
window.onload=function () {
    loadUserData();
    loaddataCart();



};

$(document).ready(function () {
    firebase.initializeApp(config);

    console.log(loadUser);


    $(document).on('click','.showUser',function () {
        var id=$(this).data('id');
        console.log(loadUser);
        console.log(loadUser.length);

        $('#exampleInputUsername').val(loadUser[id].Username);
        $('#exampleInputUsername').attr('readonly', true);
        $('#exampleInputPassword1').val(loadUser[id].Password);
        $('#exampleInputEmail1').val(loadUser[id].Email);
        $('#exampleInputEmail1').attr('readonly', true);
        $('#exampleInputNumberphone').val(loadUser[id].Sdt);
        $('#exampleInputFullname').val(loadUser[id].Fullname);
        $('#exampleInputBirthday').val(loadUser[id].Birthday);
        $('#exampleInputAddress').val(loadUser[id].Address);
        // $('#exampleInputAvatar').val(loadUser[id].Avatar);




        $('#savedata').data('save',id);
        $('#savedata1').data('save',id);


    });
    $(document).on('click','.deleteUser',function () {
        var id=$(this).data('id');
        $('#savedata1').data('save',id);


    });
    $('#savedata').click(function () {
        var id=($('#savedata').data('save'));
        console.log(typeof id)
        var l=  id.length === 0 ? 0 :id ;
        
        if($('#savedata').data('active')!=''){
            if(loadUser.length==0)
            {
                id=0;
                l=0;
            }else {
                l=loadCart.length;
                id=loadUser.length;
            }
            var rootRef1 = firebase.database().ref().child('cart/'+loadCart.length);
            var n=new Cart('','','','0');
            rootRef1.set(n);
        }
        var username=$('#exampleInputUsername').val().trim();
        var password=$('#exampleInputPassword1').val().trim();
        var email=$('#exampleInputEmail1').val().trim();
        var sdt=$('#exampleInputNumberphone').val().trim();
        var fullname=$('#exampleInputFullname').val().trim();
        var birthday=$('#exampleInputBirthday').val().trim();
        var address=$('#exampleInputAddress').val().trim();
        var a=$('#exampleInputAvatar').val().split('\\').pop();
        var avatar='../images/Avatar/'+a;
        if(isNaN(sdt)){
            $('.wr5').html( "Enter Numeric value only");
            return;
        }else {
            console.log(id);
            var newUser=new Users(username,password,email,sdt,fullname,birthday,address,avatar,l);
            var rootRef = firebase.database().ref().child('login/'+id);
            rootRef.set(newUser);

            window.location.reload(true);

        }

        
        
        


    });
    $('#savedata1').click(function () {
        var id=($('#savedata1').data('save'));
        var rootRef = firebase.database().ref().child('login/'+id);
        console.log(id);
        rootRef.remove();




    });
    $('#addNewUser').click(function () {
        $('#savedata').data('active',1);
        var id;
        $('#exampleInputUsername').val('');
        $('#exampleInputUsername').removeAttr('readonly')
        $('#exampleInputPassword1').val('');
        $('#exampleInputEmail1').val('');
        $('#exampleInputEmail1').removeAttr('readonly')
        $('#exampleInputNumberphone').val('');
        if(loadUser.length==0)
        {
            id=0;
        }else {
            id=loadUser.length;
        }

    });

});

function PushData(id,username,password,email,sdt,fullname,birthday,address,avatar,idcart){
    return '<tr>'
        + '   <td>'+id+'</td>'
        + '   <td>'+username+'</td>'
        + '   <td>'+password+'</td>'
        +'   <td>'+email+'</td>'
        +'<td>'+sdt+'</td>'
        + '   <td>'+fullname+'</td>'
        + '   <td>'+birthday+'</td>'
        + '   <td>'+address+'</td>'
        + '   <td>'+avatar+'</td>'
        + '   <td>'+idcart+'</td>'

        +' <td><i data-toggle="modal" data-target="#squarespaceModal" class="fas fa-user-tag showUser" data-id="' + id + '"></i></td>'
        +'   </tr>';

};
$('#seatch').keyup(function () {
    const query = this.value;
    if( query !== ''){
        var result = loadUser.filter(function(item){
            return item.Username.includes(query) || item.Sdt.includes(query)
        })
        document.getElementById('putdata').innerHTML = '';
        result.forEach(function(item,index){
            console.log(item)
            document.getElementById('putdata').innerHTML += PushData(index,item.Username,item.Password,item.Email ,item.Sdt,item.Fullname,item.Birthday,item.Address,item.Avatar,index)
        })
    
    }
    else{
        document.getElementById('putdata').innerHTML='';
        loadUser=[];
        loadUserData();
        loaddataCart();
    }

});
