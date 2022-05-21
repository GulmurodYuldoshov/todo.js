var elInput = document.querySelector('.js-input')
var elList = document.querySelector('.js-last')

var localData = localStorage.getItem('todos')
var todos = JSON.parse(localData) ? JSON.parse(localData) : [];
function creatTodo(todo){
  var elLi = document.createElement('li')
  var elCheckbox = document.createElement('input')
  var elTitle = document.createElement('p')
  var elDiv = document.createElement('div')
  var elBtnEdit= document.createElement('button')
  var elBtnDelete= document.createElement('button')

  elBtnEdit.textContent = 'Edit'
  elBtnEdit.className = 'btn  btn-success me-2'
  elBtnDelete.textContent = 'Delete'
  elBtnDelete.className = 'btn btn-danger'
  elDiv.className = 'ms-auto'
  elTitle.className = 'm-0 ms-2 '
  elLi.className = ' border-bottom py-2 px-3 d-flex align-items-center'
  
  elCheckbox.type='checkbox'
  elCheckbox.className = 'mb-0'
  
  
  console.log(elLi);
  elTitle.textContent = todo.title
  elLi.appendChild(elCheckbox)
  elLi.appendChild(elTitle)
  elLi.appendChild(elDiv)
  elDiv.appendChild(elBtnEdit)
  elDiv.appendChild(elBtnDelete)
elList.appendChild(elLi)
}

 function renderElements(array){
   elList.innerHTML=null
   for (var i = 0; i < array.length; i++) {
    creatTodo(array[i])
   }
 }
 
 
 elInput.addEventListener('keyup',function handAddTodo(evt){
   if(evt.keyCode===13){
     var newTodo={
       id:uuid.v4(),
       title:elInput.value,
       isComplated: false
      }
      todos.unshift(newTodo)
      renderElements(todos)
      localStorage.setItem('todos' , JSON.stringify(todos));
      elInput.value = null;
}
})
renderElements(todos);

