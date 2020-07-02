
$(document).ready(function () {
    var f=JSON.parse(localStorage.Festival);
    var c=JSON.parse(localStorage.Cart);
    var type=JSON.parse(localStorage.Typecart);
    if(type=='Ticket'){
        $('#img0').attr('src','../images/service/ticket.jpg');
        $('#img0a').attr('src','../images/service/ticket.jpg');



    }else if(type=='Hotel'){
        $('#img0').attr('src','../images/service/hotel.jpg');
        $('#img0a').attr('src','../images/service/hotel.jpg');
        $('#hotel1').html('Typeroom: <span id="Total3">'+c.Typeroom+'</span>');
        $('#hotel2').html('From: <span id="Total4">'+c.Startday+'</span> To :<span id="Total5"> '+c.Endday+'</span>');
        $('#hotel3').html('');

    }else {
        $('#img0').attr('src','../images/service/tour.jpg');
        $('#img0a').attr('src','../images/service/tour.jpg');

    }
    $('#img1').attr('src',f.Festivalimg);
    $('#img2').attr('src',f.Historyimg);
    $('#img3').attr('src',f.Activitesimg);
    $('#img1a').attr('src',f.Festivalimg);
    $('#img2a').attr('src',f.Historyimg);
    $('#img3a').attr('src',f.Activitesimg);
    $('#NameFestival').html(f.Name);
    $('#Day').html(f.Startday);
    $('#Total').html(c.Amount);
    $('#SynopsisDC').html(f.Synopsis);
    $('#Price').html('$'+c.Money);
    
    // function purcharse(iduser,name, email, address, numberphone, numberbank) {
    //     this.Iduser = iduser;
    //     this.Name = name;
    //     this.Email = email;
    //     this.Address = address;
    //     this.Phone = numberphone;
    //     this.Bank = numberbank;
    // };

    // $(document).ready(function(){
    //     loadpurcharse();
        // $('#savedata').click(function(){
        //     console.log('dsadasdsadas')
        //     var name = $('#username').val();
        //     var mail = $('usermail').val();
        //     var address = $('subject').val();
        //     var numberphone = $('message').val();
        //     var numberbank = $('stknb').val();
        //     var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
        // if(!filter.test(email)){
        //     $('.wr2').html('Invalid email!');
        //     return;
        // }
        // var id;
        // if(lishpurcharse.length==0){
        //     id=0;
        // }else {
        //     id=lishpurcharse.length;
        // }
        // var b = new purcharse(name,email,address,numberphone,numberbank)
        // console.log(b);
        // var rootRef = firebase.database().ref().child('/Purcharse' +id);
        // rootRef.set(b);
        // alert('thank you !');
        // });
    // });
// var lishpurcharse = [];
// var iduser = JSON.parse(localStorage.listUser).Id
//             console.log(iduser)
// $('#savedata').click(function(){
//     console.log("dasdasda")
            
//             var name = $('#username').val();
//             console.log(name)
//             var email= $('#usermail').val();
//             console.log(email)
//             var address = $('#subject').val();
//             console.log(address)

//             var numberphone = $('#message').val();
//             console.log(numberphone)

//             var numberbank = $('#stknb').val();
//             console.log(numberbank)

//             var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;
//         if(!filter.test(email)){
//             $('#usermail').html('Invalid email!');
//             return;
//         }
//         var id;
//         if(lishpurcharse.length==0){
//             id=0;
//         }else {
//             id=lishpurcharse.length;
//         }
//         var b = new purcharse(iduser,name,email,address,numberphone,numberbank)
//         console.log(b);
//         var rootRef = firebase.database().ref().child('Purcharse/');
//         rootRef.set(b);
//         alert('thank you !');
// })
//     function loadpurcharse(){
//         var rootRef = firebase.database().ref().chid('Purcharse/')
//         rootRef.on('child_added', function (data) {
//             var a = data.val();
//             lishpurcharse.push(new purcharse(a.Iduser,a.Name, a.Email, a.Address, a.Phone, a.Bank))
//         });

//     }












});
