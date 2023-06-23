 const todoinput=document.querySelector(".todoinput");
 const todobutton=document.querySelector(".todobutton");
 const todolist=document.querySelector(".todolist");
 const filteroption=document.querySelector(".filtertodo");

 document.addEventListener('DOMContentLoaded',gettodos);
 todobutton.addEventListener("click",addtodo);
 todolist.addEventListener("click",deletecheck);
 filteroption.addEventListener("click",filterTodo);


 function addtodo(event){
    event.preventDefault();   
    const tododiv=document.createElement("div");
    tododiv.classList.add("todo");
    const newtodo=document.createElement('li');
    newtodo.innerText=todoinput.value;
    newtodo.classList.add('todoitem');
    tododiv.appendChild(newtodo);

    savelocaltodos(todoinput.value);

    const completedbutton=document.createElement('button');
    completedbutton.innerHTML='<i class="fas fa-check"></i>';
    completedbutton.classList.add("completebtn");
    tododiv.appendChild(completedbutton); 

    const trashedbutton=document.createElement('button');
    trashedbutton.innerHTML='<i class="fas fa-trash"></i>';
    trashedbutton.classList.add("trashbtn");
    tododiv.appendChild(trashedbutton); 
     
    todolist.appendChild(tododiv);
    todoinput.value="";
}
function deletecheck(e){
   const item=e.target;
   console.log(item);
   if(item.classList[0]=="trashbtn"){
      const todo=item.parentElement;
      todo.classList.add('fall');
      removelocaltodos(todo); 
      todo.addEventListener('transitionend',function(){
        todo.remove();
      });
     

   }
   if(item.classList[0]=="completebtn"){
      const todo=item.parentElement;
      todo.classList.toggle("completed");
   }
}

   function filterTodo(e) {
      const todos = todolist.childNodes;
      todos.forEach(function (todo) { 
          const mStyle = todo.style;  
          if(mStyle != undefined && mStyle != null){
              switch (e.target.value) {
                  case "all":
                      mStyle.display = "flex";
                      break;
                  case "completed":
                      if (todo.classList.contains('completed')) {
                          mStyle.display = 'flex';
                      } else {
                          mStyle.display = "none";
                      }
                      break;
                  case "uncompleted":
                      if (todo.classList.contains('completed')){
                          mStyle.display = 'none';
                      }
                      else{
                          mStyle.display = "flex";
                      }
                      break;
              }
          }
      })
  }
  function savelocaltodos(todo){
   let todos;
   if(localStorage.getItem('todos')===null){
      todos=[];
   }
   else{
      todos=JSON.parse(localStorage.getItem('todos'));
   }
   todos.push(todo);
   localStorage.setItem('todos',JSON.stringify(todos));
  }
  function gettodos(){
     let todos;
     if(localStorage.getItem('todos')===null){
       todos=[];
     }
     else{
       todos=JSON.parse(localStorage.getItem('todos'));
     }
     todos.forEach(function(todo){
      const tododiv=document.createElement("div");
      tododiv.classList.add("todo");
      const newtodo=document.createElement('li');
      newtodo.innerText=todo;
      newtodo.classList.add('todoitem');
      tododiv.appendChild(newtodo);
  
      
  
      const completedbutton=document.createElement('button');
      completedbutton.innerHTML='<i class="fas fa-check"></i>';
      completedbutton.classList.add("completebtn");
      tododiv.appendChild(completedbutton); 
  
      const trashedbutton=document.createElement('button');
      trashedbutton.innerHTML='<i class="fas fa-trash"></i>';
      trashedbutton.classList.add("trashbtn");
      tododiv.appendChild(trashedbutton); 
       
      todolist.appendChild(tododiv);
     });

  }
  function removelocaltodos(todo){
      let todos;
     if(localStorage.getItem('todos')===null){
       todos=[];
     }
     else{
       todos=JSON.parse(localStorage.getItem('todos'));
     }
     const todoindex=todo.children[0].innerText;
     todos.splice(todos.indexOf(todoindex),1);
     localStorage.setItem("todos",JSON.stringify(todos));


  }
