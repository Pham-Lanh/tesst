
// Initialize Firebase
var config = {
    apiKey: "AIzaSyCV5u83vTvZOYvSO74gUxDZzVt6OGBaPoU",
    authDomain: "festival-44896.firebaseapp.com",
    databaseURL: "https://festival-44896.firebaseio.com",
    projectId: "festival-44896",
    storageBucket: "festival-44896.appspot.com",
    messagingSenderId: "597549870722"
};
firebase.initializeApp(config);

////////
var checkUser = '';
var checkId = '';
var loadUser = [];
var loadCart = [];
var ID = '';
var loadFestivaldetail = [];

function Cart(ticket, tour, hotel, total) {
    this.Ticket = ticket;
    this.Tour = tour;
    this.Hotel = hotel;
    this.Total = total;

}
function Users(id, username, password, email, sdt, fullname, birthday, address, avatar, service, idcart) {

    this.Id = id;
    this.Username = username;
    this.Password = password;
    this.Email = email;
    this.Sdt = sdt;
    this.Fullname = fullname;
    this.Birthday = birthday;
    this.Address = address;
    this.Avatar = avatar
    this.Service = service;
    this.IdCart = idcart;


};
function user(name, password, email, sdt, idcart) {
    this.Username = name;
    this.Password = password;
    this.Email = email;
    this.Sdt = sdt;
    this.IdCart = idcart;
    

}
function Festival(id, name, startday, location, mapimg, synopsis, aboutfestival, history, activities, festivalimg, historyimg, activitesimg, video, pdf) {
    this.Id = id;
    this.Name = name;
    this.Startday = startday;
    this.Location = location;
    this.Mapimg = mapimg;
    this.Synopsis = synopsis;
    this.Aboutfestival = aboutfestival;
    this.History = history;
    this.Activities = activities
    this.Festivalimg = festivalimg;
    this.Historyimg = historyimg;
    this.Activitesimg = activitesimg;
    this.Video = video;
    this.Pdf = pdf;

}


window.onload = function () {

    check();
    loadData();
    loadFestival();
    loaddataCart()
    ShowDataCart();
}

$(document).ready(function () {



    //////animation
    $('.has-animation').each(function (index) {
        $(this).delay($(this).data('delay')).queue(function () {
            $(this).addClass('animate-in');
        });
    });

    ///////////

    $('#logout').click(function () {
        localStorage.User = '';
        localStorage.listUser = '';
        window.location.reload(true);

    });
    $('#savedata1').click(function () { //changePass
        window.location.reload(true);

    });


    //@@
    $(".email-signup").hide();
    $("#signup-box-link").click(function () {
        $(".email-login").fadeOut(100);
        $(".email-signup").delay(100).fadeIn(100);
        $("#login-box-link").removeClass("active");
        $("#signup-box-link").addClass("active");
    });
    $("#login-box-link").click(function () {
        $(".email-login").delay(100).fadeIn(100);
        $(".email-signup").fadeOut(100);
        $("#login-box-link").addClass("active");
        $("#signup-box-link").removeClass("active");

    });


    ////////check login

    $('.b1').click(function () {

        var getID;


        var count = 0;
        var user1 = $('#user1').val();
        var pass1 = $('#pass1').val();

        for (var i in loadUser) {
            if (loadUser[i].Username == user1 && loadUser[i].Password == pass1) {
                getID = i;

                count++;

            }


        }
        if (count == 0) {
            // alert('dang nhap khong thanh cong');
            $('.bowby1').html('Login failed!');
        } else {
            $('.bowby1').html('Login Success!');
            $('#UserLo').css('display', 'block');
            $('.user').html('Hello: ' + loadUser[getID].Username);
            checkUser = loadUser[getID].Username;
            localStorage.User = JSON.stringify(checkUser);
            localStorage.listUser = JSON.stringify(loadUser[getID]);


        }



    });

    ///showlogin

    ///REGISTER///
    $('.input').keyup(function () {
        $('.wr1').html('');
        $('.wr2').html('');
        $('.wr3').html('');
        $('.wr4').html('');
        $('.wr5 ').html('');
    });
    //@@
    $('#signup').click(function () {
        var pass2 = $('#pass2').val().trim();
        var passC = $('#passC').val().trim();
        var email = $("#email").val().trim();
        var sdt = $('#sdt').val().trim();
        var user2 = $('#user2').val().trim();
        var id;
        var filter = /^([a-zA-Z0-9_\.\-])+\@(([a-zA-Z0-9\-])+\.)+([a-zA-Z0-9]{2,4})+$/;


        if (loadUser.length == 0) {
            id = 0;
        } else {
            id = loadUser.length;
        }

        var username = new user(user2, pass2, email, sdt, loadCart.length);
        if (user2 == '') {
            $('.wr1').html('Can not be empty!');
            return;
        }
        if (pass2 == '') {
            $('.wr3').html('Can not be empty!');
            return;

        }
        if (passC == '') {

            $('.wr4').html('Can not be empty!');
            return;
        }
        if (sdt == '') {
            $('.wr5').html('Can not be empty!');
            return;

        }
        if (isNaN(sdt)) {
            $('.wr5').html("Enter Numeric value only");
            return;
        }
        if (!filter.test(email)) {
            $('.wr2').html('Invalid email!');
            return;
        }
        for (var i in loadUser) {
            if (user2 == loadUser[i].Username) {

                $('.wr1').html('Already exist!');
                return;
            }


        }

        if (pass2 == passC) {
            var rootRef = firebase.database().ref().child('login/' + id);
            rootRef.set(username);

            var rootRef1 = firebase.database().ref().child('cart/' + loadCart.length);
            var a = new Cart('', '', '', '0');
            rootRef1.set(a);
            alert('Sign Up Success');
            window.location.reload(true);
        } else {
            alert('Confirm Password');
        }




    });
    $('#changepassword').click(function () {
        var n = JSON.parse(localStorage.listUser);
        var ID = n.Id;
        console.log(loadUser[ID].Password);
        var oldpassword = $('#oldPassword').val().trim();
        var newpassword = $('#newPassword').val().trim();
        var confpassword = $('#confPassword').val().trim();
        if (oldpassword == loadUser[ID].Password && newpassword == confpassword && oldpassword != '' && newpassword != '' && confpassword != '') {
            var rootRef = firebase.database().ref().child('login/' + ID + '/Password');
            rootRef.set(newpassword);
            $('.bowby1').html('Save successful!');



        } else {
            $('.bowby1').html('Save fail!');

        }


    });
    //    detail

    $(document).on('click', '.more', function () {
        var id = $(this).data('id');
        localStorage.Festival = JSON.stringify(loadFestivaldetail[id]);
    });
    ////Search

    $('#seatch').keyup(function () {
        var a = $(this).val().trim().toLowerCase();
        document.getElementById('cardH').innerHTML = '';

        if (a != '') {
            $(".cardH").css('display', 'block');
            for (var i in loadFestivaldetail) {
                if (a == loadFestivaldetail[i].Name.trim().toLowerCase().slice(0, a.length)) {
                    document.getElementById('cardH').innerHTML += Showsearch(i, loadFestivaldetail[i].Location, loadFestivaldetail[i].Name, loadFestivaldetail[i].Festivalimg);
                }
                if (a == loadFestivaldetail[i].Location.trim().toLowerCase().slice(0, a.length)) {
                    document.getElementById('cardH').innerHTML += Showsearch(i, loadFestivaldetail[i].Location, loadFestivaldetail[i].Name, loadFestivaldetail[i].Festivalimg);


                }
            }
        } else {
            $(".cardH").css('display', 'none');


        }

    });

    //     deleteCart

    $(document).on('click', '.ddd', function () {
        loaddataCart();
        var type = $(this).data('type');
        var id = $(this).data('id');
        var total = $(this).data('total');
        var n = JSON.parse(localStorage.listUser);
        if (type == 'Ticket') {
            for (var i in loadCart[n.IdCart].Ticket) {
                if (id == loadCart[n.IdCart].Ticket[i].Idd) {
                    var rootRef1 = firebase.database().ref().child('cart/' + n.IdCart + '/' + 'Ticket' + '/' + i);
                    rootRef1.set('');
                    var rootRef = firebase.database().ref().child('cart/' + n.IdCart + '/Total');
                    var c = parseInt(loadCart[n.IdCart].Total) - parseInt(total);
                    rootRef.set(c);



                    window.location.reload(true);
                    return;
                }

            }

        } else if (type == 'Tour') {
            for (var i in loadCart[n.IdCart].Tour) {
                if (id == loadCart[n.IdCart].Tour[i].Idd) {
                    var rootRef1 = firebase.database().ref().child('cart/' + n.IdCart + '/' + 'Tour' + '/' + i);
                    rootRef1.set('');
                    var rootRef = firebase.database().ref().child('cart/' + n.IdCart + '/Total');
                    var c = parseInt(loadCart[n.IdCart].Total) - parseInt(total);
                    rootRef.set(c);



                    window.location.reload(true);
                    return;
                }

            }


        } else {
            for (var i in loadCart[n.IdCart].Hotel) {
                if (id == loadCart[n.IdCart].Hotel[i].Idd) {
                    var rootRef1 = firebase.database().ref().child('cart/' + n.IdCart + '/' + 'Hotel' + '/' + i);
                    rootRef1.set('');
                    var rootRef = firebase.database().ref().child('cart/' + n.IdCart + '/Total');
                    var c = parseInt(loadCart[n.IdCart].Total) - parseInt(total);
                    rootRef.set(c);
                    window.location.reload(true);
                    return;
                }

            }

        }





    });
    $(document).on('click', '.CartDetail', function () {
        var n = JSON.parse(localStorage.listUser);

        var idF = $(this).data('idf');
        localStorage.Festival = JSON.stringify(loadFestivaldetail[idF]);
        var type = $(this).data('type');
        localStorage.Typecart = JSON.stringify(type);
        var id = $(this).data('id');
        if (type == 'Ticket') {
            for (var i in loadCart[n.IdCart].Ticket) {
                if (id == loadCart[n.IdCart].Ticket[i].Idd) {

                    localStorage.Cart = JSON.stringify(loadCart[n.IdCart].Ticket[i]);

                }

            }

        } else if (type == 'Tour') {
            for (var i in loadCart[n.IdCart].Tour) {
                if (id == loadCart[n.IdCart].Tour[i].Idd) {

                    localStorage.Cart = JSON.stringify(loadCart[n.IdCart].Tour[i]);


                }

            }


        } else {
            for (var i in loadCart[n.IdCart].Hotel) {
                if (id == loadCart[n.IdCart].Hotel[i].Idd) {
                    localStorage.Cart = JSON.stringify(loadCart[n.IdCart].Hotel[i]);

                }

            }

        }



    });
    ////////////////////////////BACK TO TOP////////////////
    // $(window).scroll(function(){
    //     if ($(this).scrollTop() > 100) {
    //         $('#back-to-top').fadeIn();
    //     } else {
    //         $('#back-to-top').fadeOut();
    //     }
    // });
    // $('#back-to-top').click(function(){
    //     $("html").animate({ scrollTop: 0 }, 6000);
    // });

    //////////////////////


});

function loadData() {
    var rootRef = firebase.database().ref().child('login/');

    rootRef.on('child_added', function (data, id) {
        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }

        loadUser.push(new Users(id, j.Username, j.Password, j.Email, j.Sdt, j.Fullname, j.Birthday, j.Address, j.Avatar, j.Service, j.IdCart));
        console.log(loadUser)




    });

}
function loadFestival() {
    var rootRef = firebase.database().ref().child('festival/');

    rootRef.on('child_added', function (data, id) {

        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }
        loadFestivaldetail.push(new Festival(id, j.Name, j.Startday, j.Location, j.Mapimg, j.Synopsis, j.Aboutfestival, j.History, j.Activities, j.Festivalimg, j.Historyimg, j.Activitesimg, j.Video, j.Pdf));
        if (id < 6) {
            document.getElementById('showfestival').innerHTML += ShowDataFestival(id, j.Name, j.Location, j.Startday, j.Synopsis, j.Activitesimg);


        }
        if ((id + 1) % 3 == 0) {
            var a = (id + 1) / 3;
            var b = a - 1;


            document.getElementById('btn-group').innerHTML += '<button type="button" onclick="submit(' + b + ')" class="btn btn-secondary paging">' + a + '</button>';


        }




    });
}
function loaddataCart() {
    var rootRef = firebase.database().ref().child('cart/');

    rootRef.on('child_added', function (data, id) {
        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }
        loadCart.push(new Cart(j.Ticket, j.Tour, j.Hotel, j.Total));





    });

}
function ShowDataCart() {
    var n = JSON.parse(localStorage.listUser);
    console.log(n.IdCart);
    var rootRef = firebase.database().ref().child('cart/' + n.IdCart + '/Ticket/');
    rootRef.on('child_added', function (data) {
        var j = data.val();
        if (j != '') {
            document.getElementById('dropdown-cart').innerHTML += ShowCart('Ticket', j.Money, j.Amount, '../images/service/ticket.jpg', j.NameFestival, j.IdFestival, j.Idd, 'Ticket');

        }



    });
    var rootRef1 = firebase.database().ref().child('cart/' + n.IdCart + '/Tour/');
    rootRef1.on('child_added', function (data) {
        var j = data.val();
        if (j != '') {
            document.getElementById('dropdown-cart').innerHTML += ShowCart('Tour', j.Money, j.Amount, '../images/service/tour.jpg', j.NameFestival, j.IdFestival, j.Idd, 'Tour');
        }

    });
    var rootRef1 = firebase.database().ref().child('cart/' + n.IdCart + '/Hotel/');
    rootRef1.on('child_added', function (data) {
        var j = data.val();
        if (j != '') {
            document.getElementById('dropdown-cart').innerHTML += ShowCart('Hotel', j.Typeroom, j.Amount, '../images/service/hotel.jpg', j.NameFestival, j.IdFestival, j.Idd, 'Hotel');

        }

    });
    var rootRef1 = firebase.database().ref().child('cart/');
    rootRef1.on('child_added', function (data, id) {
        var j = data.val();
        if (id == null) {
            id = 0;
        } else {
            id = parseInt(id) + 1;

        }
        var n = JSON.parse(localStorage.listUser);
        if (n.IdCart == id) {
            $('#cartD').html(j.Total);
            return;

        }
    });

}

function check() {
    var a = localStorage.User;

    if (a != '') {
        $('#UserLo').css('display', 'block');
        $('.user').html('Hello: ' + a);
        $('#login').css('display', 'none');
    }


}
function ShowDataFestival(id, name, location, startday, synopsis, img) {
    return '<div class="col-sm-6 col-md-4 cardF">'
        + ' <div class="news">'
        + ' <img class="imgfestival" src="' + img + '" alt="...">'
        + '<div class="dates">'
        + '<h3 class="candal namFF">' + name + '</h3>'
        + '<h4 class="religion">Religion : ' + location + '</h4>'
        + '<h5 class="startdayFF"> Start Day: ' + startday + '</h5>'
        + '<p class="cardFF">' + synopsis + '</p>'
        + '</div>'
        + '<p><a href="DetailFestival.html" class="btn btn-primary more" data-id="' + id + '">'
        + 'More...</a>'
        + '</div>'
        + '</div>';


};
function ShowCart(name, money, number, img, namFestival, idF, id, type) {
    return '<li><span class="item"><span class="item-left"><img class="imgservice" src="' + img + '" alt="" />'
        + '<span class="item-info"><span>' + name + '</span><span>' + namFestival + '</span><span>' + money + '</span> <span><a data-idF="' + idF + '" data-type="' + type + '" data-id="' + id + '" class="btn btn-primary CartDetail" href="DetailCart.html" role="button">Detail</a><button data-type="' + type + '" data-id="' + id + '" data-total="' + number + '" type="button" class="btn btn-danger ddd" data-total="' + number + '">Delete</button></span>  </span> </span>'
        + '<span id="' + name + id + 'total" class="item-right" data-total="' + number + '">Total:' + number + '</span></span></li>';


};
function Showsearch(id, location, name, img) {
    return '<div class="col-md-12 ">'
        + '<div class="card flex-md-row mb-4 shadow-sm h-md-250" >'
        + '<div class="card-body d-flex flex-column align-items-start cardHH">'
        + '<h5 class="mb-0">'
        + '<a class="text-dark candal" href="#">' + name + '</a>'
        + '</h5>'
        + '<strong class="d-inline-block mb-2 text-primary"> Religion:' + location + '</strong>'
        + '<a href="DetailFestival.html" class="btn btn-primary more" data-id="' + id + '" >Continue reading</a>'
        + '</div>'
        + '<img  width="200" height="150" src="' + img + '">'
        + '</div>'
        + '</div>';


}
function submit(id) {
    window.scrollTo(0, 1000);

    var row = document.getElementById('showfestival');
    row.innerHTML = '';
    for (var i = (6 * id); i < (6 * (id + 1)); i++) {
        row.innerHTML += ShowDataFestival(i, loadFestivaldetail[i].Name, loadFestivaldetail[i].Location, loadFestivaldetail[i].Startday, loadFestivaldetail[i].Synopsis, loadFestivaldetail[i].Activitesimg);
    }

}


