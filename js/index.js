let task_name = document.querySelectorAll(".task_name")[0];
let task_add_block = document.querySelectorAll('.task_add_block')[0];
let task_add = document.querySelectorAll('.task_add')[0];
let task_list = document.querySelectorAll('.task_list')[0];

// <==========  第一步：基本介面及 text 欄位事件  ==========>

task_name.addEventListener('focus', () => {
    task_add_block.classList.add("-on");
})

task_name.addEventListener('blur', () => {
    task_add_block.classList.remove("-on");
})

// <==========      第二步：新增待辦事項       ==========>

let task_text = (task_name.value).trim();

task_add.addEventListener('click', () => {
    let task_text = (task_name.value).trim();
    if (task_text != "") {
        let li_list = `<li><div class="item_flex"><div class="left_block"><div class="btn_flex"><button type="button" class="btn_up">往上</button><button type="button" class="btn_down">往下</button></div></div><div class="middle_block"><div class="star_block"><span class="star" data-star="1"><i class="fas fa-star"></i></span><span class="star" data-star="2"><i class="fas fa-star"></i></span><span class="star" data-star="3"><i class="fas fa-star"></i></span><span class="star" data-star="4"><i class="fas fa-star"></i></span><span class="star" data-star="5"><i class="fas fa-star"></i></span></div><p class="para">${task_text}</p><input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}">
        </div><div class="right_block"><div class="btn_flex"><button type="button" class="btn_update">更新</button><button type="button" class="btn_delete">移除</button></div ></div></div></li>`
        task_list.insertAdjacentHTML("afterbegin", li_list);
        ls_save();
        get_tasks();
        task_name.value = '';
    }
});

task_name.addEventListener('keydown', (event) => {
    let task_text = (task_name.value).trim();
    if (task_text != "") {
        if (event.which === 13) {
            let li_list = `<li><div class="item_flex"><div class="left_block"><div class="btn_flex"><button type="button" class="btn_up">往上</button><button type="button" class="btn_down">往下</button></div></div><div class="middle_block"><div class="star_block"><span class="star" data-star="1"><i class="fas fa-star"></i></span><span class="star" data-star="2"><i class="fas fa-star"></i></span><span class="star" data-star="3"><i class="fas fa-star"></i></span><span class="star" data-star="4"><i class="fas fa-star"></i></span><span class="star" data-star="5"><i class="fas fa-star"></i></span></div><p class="para">${task_text}</p><input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${task_text}"></div><div class="right_block"><div class="btn_flex"><button type="button" class="btn_update">更新</button><button type="button" class="btn_delete">移除</button></div ></div></div></li>`
            task_list.insertAdjacentHTML("afterbegin", li_list);
            ls_save();
            get_tasks();
            task_name.value = '';
        }
    };
});

// <==========      第三步：移除與清空      ==========>

let btn_empty = document.getElementsByClassName('btn_empty')[0];
btn_empty.addEventListener('click', (e) => {
    let x = confirm('是否確認清空?');
    if (x) {
        var child = task_list.children;
        for (let i = 0; i < child.length; i++) {
            child[i].classList.add("fade");
        }
        // setTimeout(() => {
        //     task_list.innerHTML = '';
        //     localStorage.clear();
        // }, 1000);
        task_list.addEventListener("transitionend", function clearAll(a) {
            //console.log(a.target);
            //console.log(this);
            task_list.innerHTML = '';
            task_list.removeEventListener("transitionend", clearAll);
        });
        localStorage.clear();
    } else {
        return;
    };
});

task_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn_delete")) {
        let x = confirm('是否確認移除?');
        if (x) {
            e.target.closest("li").classList.add("fade");

            e.target.closest("li").addEventListener("transitionend", (a) => {
                a.target.closest("li").remove();
            });
            let item_id = e.target.closest("li").getAttribute("data-id");
            // 從 localStorage 取得資料
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            let updated_tasks = [];
            tasks.forEach(function (task, i) {
                if (item_id != task.item_id) {
                    updated_tasks.push(task);
                }
            });
            localStorage.setItem("tasks", JSON.stringify(updated_tasks));
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

// <==========      第四步：更新待辦事項      ==========>

let btn_update = document.querySelectorAll('btn_update');

task_list.addEventListener("click", (e) => {
    if (e.target.classList.contains("btn_update")) {
        let update = e.target.closest("li").querySelector('.task_name_update');
        let para = e.target.closest("li").querySelector('.para');
        let update_text = (update.value).trim();
        if (update.classList.contains("-none")) {
            update.classList.remove("-none");
            para.classList.add("-none");

        } else {
            if (update_text == '') {
                alert('請輸入待辦事項');
            } else {
                para.innerHTML = update_text;
                // 
                let item_id = e.target.closest("li").getAttribute("data-id");
                let tasks = JSON.parse(localStorage.getItem("tasks"));
                tasks.forEach(function (task, i) {
                    if (item_id == task.item_id) {
                        tasks[i].name = update_text;
                    }
                });
                localStorage.setItem("tasks", JSON.stringify(tasks));
                // 
                update.classList.add("-none");
                para.classList.remove("-none");
            }
        }
    }
});

// <==========      第五步：排序      ==========>

let btn_up = document.querySelectorAll('.btn_up');
let btn_down = document.querySelectorAll('.btn_down');

task_list.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn_down')) {

        if (e.target.closest("ul").lastElementChild != e.target.closest("li")) {
            let item_id = e.target.closest("li").getAttribute("data-id");
            let direction = 'down';
            items_sort(item_id, direction);
            get_tasks();
        }
    }
});

task_list.addEventListener('click', (e) => {
    if (e.target.classList.contains('btn_up')) {
        let item_id = e.target.closest("li").getAttribute("data-id");
        if (e.target.closest("ul").firstElementChild != e.target.closest("li")) {
            let direction = 'up';
            items_sort(item_id, direction);
            get_tasks();
        }
    }
})


// <==========      第六步：重要性的星號      ==========>


// task_list.addEventListener('click', (e) => {
//     if (e.target.parentNode.parentNode.classList[0] === ('star')) {
//         console.log(e.target.parentNode.parentNode);
//         let item_id = e.target.parentNode.parentNode.parentNode.parentNode.parentNode.parentNode.getAttribute("data-id");
//         let current_star = e.target.parentNode.parentNode.getAttribute('data-star');
//         // 從 localStorage 取得資料
//         let tasks = JSON.parse(localStorage.getItem("tasks"));
//         tasks.forEach(function (task, i) {
//             if (item_id == task.item_id) { // id 相同
//                 tasks[i].star = current_star; // 更新星號數
//             }
//         });
//         localStorage.setItem("tasks", JSON.stringify(tasks));
//         get_tasks();
//     }
// });


task_list.addEventListener('click', (e) => {
    if (e.target.closest("span") != null) {
        if (e.target.closest("span").classList[0] === ('star')) {
            let span = e.target.closest("span");
            let item_id = span.closest("li").getAttribute("data-id");
            let current_star = span.getAttribute('data-star');
            let tasks = JSON.parse(localStorage.getItem("tasks"));
            tasks.forEach(function (task, i) {
                if (item_id == task.item_id) {
                    tasks[i].star = current_star;
                }
            });
            localStorage.setItem("tasks", JSON.stringify(tasks));
            // update_star();
            get_tasks();
        }
    }
});



function update_star() {
    // let item_id = e.target.closest("li").getAttribute("data-id");
    // let item_id = span.closest("li").getAttribute("data-id");
    // let current_star = span.getAttribute('data-star');

    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function (task, i) {
        if (item_id == task.item_id) {
            tasks[i].star = current_star;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}



















// <==========      資料更新至 localStorage      ==========>


// <==========   第一步：新增資料至 localStorage  ==========>

// 儲存到 localStorage
// let item_id = Date.now(); // timestamp 當做該項的 id


// let task = {
//     "item_id": item_id,
//     // "name": task_text, // 新增的待辦事項文字
//     "star": 0 // 預設 0
// };
// let tasks = JSON.parse(localStorage.getItem("tasks"));
// if (tasks) { // 若存在
//     tasks.unshift(task);
// } else { // 若不存在
//     tasks = [task];
// }
// localStorage.setItem("tasks", JSON.stringify(tasks));



let ls_save = () => {
    let task_text = (task_name.value).trim();
    let item_id = Date.now();
    let task = {
        "item_id": item_id,
        "name": task_text,
        "star": 0
    };
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        tasks.unshift(task);
    } else {
        tasks = [task];
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// <==========   第二步：從 localStorage 取得資料  ==========>

function get_tasks() {
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    if (tasks) {
        let list_html = "";
        tasks.forEach(function (item, i) {
            list_html += `
        <li data-id="${item.item_id}">
          <div class="item_flex">
            <div class="left_block">
              <div class="btn_flex">
                <button type="button" class="btn_up">往上</button>
                <button type="button" class="btn_down">往下</button>
              </div>
            </div>
            <div class="middle_block">
              <div class="star_block">
                <span class="star${(item.star >= 1 ? " -on" : "")}" data-star="1"><i class="fas fa-star"></i></span>
                <span class="star${(item.star >= 2 ? " -on" : "")}" data-star="2"><i class="fas fa-star"></i></span>
                <span class="star${(item.star >= 3 ? " -on" : "")}" data-star="3"><i class="fas fa-star"></i></span>
                <span class="star${(item.star >= 4 ? " -on" : "")}" data-star="4"><i class="fas fa-star"></i></span>
                <span class="star${(item.star >= 5 ? " -on" : "")}" data-star="5"><i class="fas fa-star"></i></span>
              </div>
              <p class="para">${item.name}</p>
              <input type="text" class="task_name_update -none" placeholder="更新待辦事項…" value="${item.name}">
            </div>
            <div class="right_block">
              <div class="btn_flex">
                <button type="button" class="btn_update">更新</button>
                <button type="button" class="btn_delete">移除</button>
              </div>
            </div>
          </div>
        </li>
      `;
        });

        let ul_task_list = document.getElementsByClassName("task_list")[0];
        ul_task_list.innerHTML = list_html;
    }
}

document.addEventListener("DOMContentLoaded", function () {
    get_tasks(); // DOMContentLoaded 事件發生時，執行這裡的程式
});


// <==========   第三步：移除 localStorage 裡的資料  ==========>

// 取得待辦事項的 id
// let item_id = e.target.closest("li").getAttribute("data-id");
// 從 localStorage 取得資料
// let tasks = JSON.parse(localStorage.getItem("tasks"));
// 準備用來放要存到 localStorage 裡的資料
// let updated_tasks = [];

// tasks.forEach(function (task, i) {
//     if (item_id != task.item_id) { // id 不相同的時候
//         updated_tasks.push(task); // 將物件資料放至新的陣列中
//     }
// });

// // 回存至 localStorage
// localStorage.setItem("tasks", JSON.stringify(updated_tasks));

// 清空 localStorage 資料： localStorage.clear();

let ls_remove = () => {
    let item_id = e.target.closest("li").getAttribute("data-id");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    let updated_tasks = [];
    tasks.forEach(function (task, i) {
        if (item_id != task.item_id) {
            updated_tasks.push(task);
        }
    });
    localStorage.setItem("tasks", JSON.stringify(updated_tasks));
    localStorage.clear();
}
// let ls_all_remove = localStorage.clear();



// <==========   第四步：更新 localStorage 中，name 的資料  ==========>


// 取得待辦事項的 id
// let item_id = e.target.closest("li").getAttribute("data-id");
// 從 localStorage 取得資料
// let tasks = JSON.parse(localStorage.getItem("tasks"));
// tasks.forEach(function (task, i) {
//     if (item_id == task.item_id) { // id 相同
//         // tasks[i].name = update_task_name; // 資料更新
//     }
// });
// 回存至 localStorage
// localStorage.setItem("tasks", JSON.stringify(tasks));

let update_name = () => {
    let item_id = e.target.closest("li").getAttribute("data-id");
    let tasks = JSON.parse(localStorage.getItem("tasks"));
    tasks.forEach(function (task, i) {
        if (item_id == task.item_id) {
            tasks[i].name = update_text;
        }
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}


// <==========   第五步：更新 localStorage 中的排序  ==========>


// 寫成一個函式，因為可能會重覆呼叫
function items_sort(item_id, direction) {

    let tasks = JSON.parse(localStorage.getItem("tasks"));

    // 準備用來儲存更新後的待辦事項陣列
    let updated_tasks = [];

    if (direction == "up") { // 往上
        tasks.forEach(function (task, i) {
            if (item_id == task.item_id) {
                updated_tasks.splice(i - 1, 0, task);
            } else {
                updated_tasks.push(task);
            }
        });
    }

    if (direction == "down") { // 往下
        // 用來暫存下一個 item_id
        let temp_next_item_id_index;
        tasks.forEach(function (task, i) {
            if (item_id == task.item_id) {

                // 暫存找到 item 的下一個 item 索引值
                temp_next_item_id_index = i + 1;

                // 先放找到 item 的下一個
                updated_tasks.push(tasks[i + 1]);

                // 再放找到的這個 item
                updated_tasks.push(task);

            } else {
                if (temp_next_item_id_index != i) {
                    updated_tasks.push(task);
                }
            }
        });
    }

    localStorage.setItem("tasks", JSON.stringify(updated_tasks));
}


// <==========   第六步：更新 localStorage 中，star 的資料  ==========>


// 取得待辦事項的 id
// let item_id = span_el.closest("li").getAttribute("data-id");

// 從 localStorage 取得資料
// let tasks = JSON.parse(localStorage.getItem("tasks"));
// tasks.forEach(function (task, i) {
//     if (item_id == task.item_id) { // id 相同
//         tasks[i].star = current_star; // 更新星號數
//     }
// });

// 回存至 localStorage
// localStorage.setItem("tasks", JSON.stringify(tasks));

// function update_star() {


//     // let item_id = e.target.closest("li").getAttribute("data-id");
//     // let item_id = span.closest("li").getAttribute("data-id");
//     // let current_star = span.getAttribute('data-star');

//     let tasks = JSON.parse(localStorage.getItem("tasks"));
//     tasks.forEach(function (task, i) {
//         if (item_id == task.item_id) {
//             tasks[i].star = current_star;
//         }
//     });
//     localStorage.setItem("tasks", JSON.stringify(tasks));
// }