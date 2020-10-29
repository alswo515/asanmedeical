(function ($) {
  
  // 로고를 클릭하면 main.html의 #content를 load() 하시오.
  $('#wrap')
  .on("click", "#header h1 a, #footer .quickMenu a, .mainContent #step_area a,.contTit .prev a", function () {
      var url = this.href;
      $("#container > #content").remove();
      $("#container").load(url + " #content");
      return false;
    }
  );

  var usedata 
  $.ajax({
    type:'GET',
    url:'data/doctors.json',
    beforeSend: function(xhr){
      if(xhr.overrideMimeType){
        xhr.overrideMimeType("application/json");
      }
    },
    success:function(data){
      usedata = data
    },
    error:function(abc){
      alert(abc.status+'오류발생')
    }
  })

  // 가정의학과 json 데이터 삽입
  $('#container').on('click', '.medicalContent .mediList a', function(e){
    e.preventDefault()
    var url = this.href; //this.attr('href')
    var part = this.attr('class'); //this.attr('id')
    $("#container > #content").remove();
    $("#container").load(url + " #content", function(){
      var newContent = '';
        for(var i in usedata[part]){
          newContent += `<li><div class="img"><img src="${usedata[part][i].photo}" alt=""></div>`
          newContent += `<div class="doctorInfo"><strong>${usedata[part][i].name}</strong>`
          newContent += `<p>${usedata[part][i].depart}</p>`
          newContent += `<div>${usedata[part][i].about}</div></div></li>`
        }
        $('#content .part1DoctorList').html(`<ul>${newContent}</ul>`)
    });
  })
  
 
  //햄버거 버튼 클릭하면 네비박스 열기
  $('#lnb_menu').on('click',function(){
    $(this).next().css({
      display:'block',
    })
    $('#lnb').animate({
      left:'0px'
    },500)
  })

  $('#lnb_close').on('click',function(){
    $('#lnb').animate({
      left:'-274px'
    },500,function(){
      $('#navWrap').css({
        display:'none'
      })
    })
  })

  //섹션구역 맨위 한줄광고문구 위로 슬라이딩 시키기
  setInterval(kim,1000)
  function kim(){
    $('.mainContent .main_noti a:first-child').animate({
      marginTop:'-50px'
    },500, function(){
      $(this).appendTo('.mainContent .main_noti').css({
        marginTop:'0px'
      })
    })
  }


    
})(jQuery);
