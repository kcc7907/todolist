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
        let li_list = `<li><div class="item_flex"><div class="left_block"><div class="btn_flex"><button type="button" class="btn_up">往上</button><button type="button" class="btn_down">往下</button></div></div><div class="middle_block"><div class="star_block"><span class="star" data-star="1"><i class="fas fa-star"></i></span><span class="star" data-star="2"><i class="fas fa-star"></i></span><span class="star" data-star="3"><i class="fas fa-star"></i></span><span class="star" data-star="4"><i class="fas fa-star"></i></span><span class="star" data-star="5"><i class="fas fa-star"></i></span></div><p class="para">${task_text}</p><input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}">
        </div><div class="right_block"><div class="btn_flex"><button type="button" class="btn_update">更新</button><button type="button" class="btn_delete">移除</button></div ></div></div></li>`
        task_list.insertAdjacentHTML("afterbegin", li_list);
        task_name.value = '';
    }
});

task_name.addEventListener('keydown', function (event) {
    let task_text = (task_name.value).trim();
    if (task_text != "") {
        if (event.which === 13) {
            let li_list = `<li><div class="item_flex"><div class="left_block"><div class="btn_flex"><button type="button" class="btn_up">往上</button><button type="button" class="btn_down">往下</button></div></div><div class="middle_block"><div class="star_block"><span class="star" data-star="1"><i class="fas fa-star"></i></span><span class="star" data-star="2"><i class="fas fa-star"></i></span><span class="star" data-star="3"><i class="fas fa-star"></i></span><span class="star" data-star="4"><i class="fas fa-star"></i></span><span class="star" data-star="5"><i class="fas fa-star"></i></span></div><p class="para">${task_text}</p><input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}"></div><div class="right_block"><div class="btn_flex"><button type="button" class="btn_update">更新</button><button type="button" class="btn_delete">移除</button></div ></div></div></li>`

            task_list.insertAdjacentHTML("afterbegin", li_list);
            task_name.value = '';
        }
    };
});
let btn_empty = document.getElementsByClassName('btn_empty')[0];
btn_empty.addEventListener('click', function (a) {
    let x = confirm('是否確認清空?');
    if (x) {
        var child = task_list.children;
        for (let i = 0; i < child.length; i++) {
            child[i].classList.add("fade");
        }
        setTimeout(function () {
            task_list.innerHTML = '';
        }, 1000);
        // task_list.addEventListener("transitionend", function clearall(e) {
        //     //console.log(a.target);
        //     //console.log(this);
        //     task_list.innerHTML = '';
        //     //e.removeEventListener("transitionend");
        //     alert("test");
        // });
    } else {
        return;
    };
});
task_list.addEventListener("click", function (e) {
    if (e.target.classList.contains("btn_delete")) {
        let x = confirm('是否確認移除?');
        if (x) {
            e.target.closest("li").classList.add("fade");
            e.target.closest("li").addEventListener("transitionend", function (a) {
                a.target.closest("li").remove();
            });
        } else {
            return;
        }
    };
});

// document.addEventListener("click", function (e) {
//     if (e.target.classList[0] === ("btn_delete") && e.target.classList != ("btn_empty")) {
//         e.target.closest("li").classList.add("fade");
//         e.target.closest("li").addEventListener("transitionend", function () {
//             e.target.closest("li").remove();
//         });
//     }
//     if (e.target.classList[0] === ("btn_empty") && e.target.classList != ("btn_delete")) {
//         var children_nodes = ul_task_list.children;
//         for (let i = 0; i < children_nodes.length; i++) {
//             children_nodes[i].classList.add("fade");
//         }
//         ul_task_list.addEventListener("transitionend", function () {
//             ul_task_list.innerHTML = '';
//         });
//     }
// });input

let btn_update = document.querySelectorAll('btn_update');
task_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn_update")) {
        let task_name_update = document.getElementsByClassName('task_name_update');
        // e.target.closest("input").classList.remove('-on');

        // e.target.closest("input").classList.toggle("on");
        task_name_update.classList.remove("-on");
    }
});