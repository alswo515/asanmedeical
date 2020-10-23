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

  // 가정의학과 json 데이터 삽입


// `<li><div class="img"><img src="${photo}" alt=""></div>`
// `<div class="doctorInfo"><strong>${name}</strong>`
// `<p>${depart}</p>`
// `<div>${about}</div></li>`

$('#container').on("click",".medicalContent .mediList a",function(e){
  e.preventDefult()
  var url = this.href; //this.attr('href')
  var part = this.id; //this.attr('id')
  $("#container > #content").remove();
  $("#container").load(url + " #content");
  $.ajax({
    type:'GET',
    url:'data/doctors.json',
    beforeSend: function(xhr){
      if(xhr.overrideMimeType){
        xhr.overrideMimeType("application/json");
      }
    },
    success:function(data){
      var usedata = data[part]
      var newContent = '';
      function dataPrint(){
        for(var i in usedata){
          newContent += `<li><div class="img"><img src="${usedata[i].photo}" alt=""></div>`
          newContent += `<div class="doctorInfo"><strong>${usedata[i].name}</strong>`
          newContent += `<p>${usedata[i].depart}</p>`
          newContent += `<div>${usedata[i].about}</div></li>`
        }
        $('#content .part1DoctorList').html(`<ul>${newContent}</ul>`)
      }
      dataPrint()
    },
    error:function(abc){
      alert(abc.status+'오류발생')
    }
  })
})

//헤더박스는 스크롤 이벤트시 픽스드됨
 $(window).scroll(function(){
  var sct = $(this).scrollTop()
  if( sct >= 50 && !$('#header').hasClass('on') ){
    $('#header').slideUp(100).slideDown(100).addClass('on')
  }else if (sct < 50 && $('#header').hasClass('on')){
    $('#header').removeClass('on')
  }
 })


    
})(jQuery);
