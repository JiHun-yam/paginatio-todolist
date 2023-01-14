
    listing();


 function listing() {
    $.ajax({
       type: "GET",
       url: "/show",
       data: {},
       success: function (response) {
          let row = response['page'];
          for (let i =0; i<row.length; i++){
            let num = row[i]['num'];
            let listText = row[i]['text'];

            let temp_html = `   <div class="todolist">

                    <div class="todoNum">
                        <span>${num}.</span>
                    </div>

                    <div class="todoText">
                        <p>${listText}</p>
                    </div>

                    <div class="todoBtn">
                    
                        <button style="background:  #748ffc;">
                            <i class='bx bx-check'></i>
                        </button>
                        
                        <button style="background:  #fa5252;" onclick="delete_list(${num})">
                            <i class='bx bxs-trash'></i>
                        </button>
                    </div>

                </div>`;
            $("#todoList").append(temp_html)

          }

const rowPerPage = 5; // 한페이지당 보여줄 자료 갯수
// db에 저장된 갯수를 포함해서 가져오고 싶다면
    const rows = document.querySelectorAll('.main .todolist');
    console.log(rows)


const rowsCount = rows.length; // 51/5 10.1 -> 12
console.log(rowsCount +'게시물갯수')
const pageCount = Math.ceil(rowsCount / rowPerPage);  //Math 무조건 10.1 되면 반올림해야하니깐
console.log(pageCount +'페이지버튼갯수')
const numvers = document.querySelector('#numBtn'); // 페이지네이션이 들어갈 위차




// // 페이지네이션 생성
 for (let i = 1; i <= pageCount; i++) {
     numvers.innerHTML += `
     <button id='Btn'><a href="">${i}</a></button>`;
 }


 const numberBtn = numvers.querySelectorAll('#Btn a'); //게시물갯수에 따라 새롭게 만들어지는 페이지수에 버튼을 가리킨다
 console.log(numberBtn);

 // 클릭한 버튼이 몇번째인지  체크하기 위해 만든함수
 // item = numberBtn안의 각각의 자료들 idx = numberBtn안의 각각의 자료들에 index번호/
    numberBtn.forEach(function (item, idx) {
     item.addEventListener('click', (e) => {
         e.preventDefault();

         //console.log(idx)
         // 테이플 출력 함수
         displayRow(idx)
     })




 })

 console.log(rows)

 // 애는 버튼에클릭할때만 발동한다
 function displayRow(idx) {

     // 인덱스가 0이면 0,5번째 보여주고
     // 인덱스가 1이면 5,10까지 보여줌
     let start = idx * rowPerPage;
     let end = start + rowPerPage;
     // nodelist 는 slice 메서드 사용이 안된다 slice를 사용하기 위해서
     // nodelist를 array로 교체한다 slice 하면 (0,5)하면 01234만 보여줌
     // nodelist, htmlcollecto -> array

     // 여기서 대상은 nodelist, htmlcollecto 의미
     // Array.from(대상), [...대상 ]
     let rowsArray = [...rows];
     console.log(rowsArray);

     // 전체 display 삭제
     for (ra of rowsArray) {
         ra.style.display = 'none';
     }
     // 내가누른번호에 맞게 idx값을 가져와 rowsArray를 짜르고 dispaly를 없애서 보여준다
     let newRows = rowsArray.slice(start, end);
     for (nr of newRows) {
         nr.style.display = ''
     }
     // 클릭한 부분을 표시하기 위한 반복문
     for (nb of numberBtn) {
         nb.classList.remove('active');
     }
     // e.target 내가 클릭한게 어떤버튼인지 알려준다
          numberBtn[idx].classList.add('active')
 //     게시물이 아무것도 없을시에 이런식으로 오류가 난다. ^ㅜㅠ^

 }
 displayRow(0)












       },
    });
 }



const todoInput = document.getElementById('todo');

const todoBtn = document.querySelector('.todoAddBtn');


// input창에 3글자 이상쓰면 버튼부분 독보이게 구현 성공
todoInput.addEventListener('input', function () {
    if (todoInput.value.length >= 3) {
        todoBtn.style.background = '#91a7ff';
    } else {
        todoBtn.style.background = '#edf2ff';
    }
})


// 23.01.13금
// 이값을 로컬스토리지에 저장해보자
todoBtn.addEventListener('click', function () {


    // input값이 없이 전송할경우
    if (todoInput.value === '') {
        alert('일정 입력하세요')
    }
   //
    else {
        let text =todoInput.value;
        $.ajax({
      type: "POST",
      url: "/add",
      data: {
         text_give:text,
      },
      success: function (response) {
         alert(response["msg"]);
         window.location.reload();
      },
   });

    }
})




    function  delete_list(num){
            $.ajax({
                        type: "POST",
                        url: "/delete",
                        data: {num_give: num},
                        success: function (response)
                        {alert(response["msg"])
                            window.location.reload()
                        }
                    });
}

