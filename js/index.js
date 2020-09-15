let task_name = document.querySelectorAll(".task_name")[0];
let task_add_block = document.querySelectorAll('.task_add_block')[0];

task_name.addEventListener('focus', function () {
    task_add_block.classList.add("-on");
})

task_name.addEventListener('blur', function () {
    task_add_block.classList.remove("-on");
})

let task_add = document.querySelectorAll('.task_add')[0];
let task_list = document.querySelectorAll('.task_list')[0];



task_add.addEventListener('click', function () {
    let task_text = (task_name.value).trim();
    if (task_text != "") {
        let li_list = `<li><div class="item_flex"><div class="left_block"><div class="btn_flex"><button type="button" class="btn_up">往上</button><button type="button" class="btn_down">往下</button></div></div><div class="middle_block"><div class="star_block"><span class="star" data-star="1"><i class="fas fa-star"></i></span><span class="star" data-star="2"><i class="fas fa-star"></i></span><span class="star" data-star="3"><i class="fas fa-star"></i></span><span class="star" data-star="4"><i class="fas fa-star"></i></span><span class="star" data-star="5"><i class="fas fa-star"></i></span></div><p class="para">` + task_text + `</p></div><div class="right_block"><div class="btn_flex"><button type="button" class="btn_update">更新</button><button type="button" class="btn_delete">移除</button></div ></div></div></li>`;
        task_list.insertAdjacentHTML("afterbegin", li_list);
        task_name.value = '';
    }
});

task_name.addEventListener('keydown', function (event) {
    let task_text = (task_name.value).trim();
    if (task_text != "") {
        if (event.which === 13) {
            let li_list = `<li><div class="item_flex"><div class="left_block"><div class="btn_flex"><button type="button" class="btn_up">往上</button><button type="button" class="btn_down">往下</button></div></div><div class="middle_block"><div class="star_block"><span class="star" data-star="1"><i class="fas fa-star"></i></span><span class="star" data-star="2"><i class="fas fa-star"></i></span><span class="star" data-star="3"><i class="fas fa-star"></i></span><span class="star" data-star="4"><i class="fas fa-star"></i></span><span class="star" data-star="5"><i class="fas fa-star"></i></span></div><p class="para">` + task_text + `</p></div><div class="right_block"><div class="btn_flex"><button type="button" class="btn_update">更新</button><button type="button" class="btn_delete">移除</button></div ></div></div></li>`;

            task_list.insertAdjacentHTML("afterbegin", li_list);
            task_name.value = '';
        }
    };
});

let ul_task_list = document.querySelector('.task_list');
let task_list_all = document.querySelectorAll('.task_list');
let btn_empty = document.getElementsByClassName('btn_empty')[0];

btn_empty.addEventListener('click', function (e){
    // alert('測試文字');
    ul_task_list.innerHTML = '';
});
document.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn_delete")) {
        e.target.closest("li").style.className = "fade_out";
        e.target.closest("li").remove();
        e.target.closest("li").classList.add("fade_out");
    }
});