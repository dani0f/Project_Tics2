<template>

    <div>
        <nav class="navbar navbar-light bg-light">
            <a href="/" class="navbar-brand">MEVN Stack</a>
        </nav>


      <div class="container">
          <div class="row pt-5">
               <div class="col-md-5">
                 <div class="card">
                     <div class="card-body">
                         <form @submit.prevent="addTask">
                              <div class="form-group">
                                 <input type="text"
                                 v-model="task.name"
                                 placeholder="Insert a Name"
                                 class="form-control">
                             </div>
                             <div class="form-group">
                                <input type="text"
                                 v-model="task.username"
                                 placeholder="Insert a Username"
                                 class="form-control">
                             </div>
                             <div class="form-group">
                                <input type="text"
                                 v-model="task.password"
                                 placeholder="Insert a Password"
                                 class="form-control">
                             </div>
                             <div class="form-group">
                                <input type="text"
                                 v-model="task.accessLevel"
                                 placeholder="Insert a AccesLevel"
                                 class="form-control">
                             </div>
                            <button class="btn btn-primary
                            btn-block deep-purple">Crear usuario</button>
                         </form>
                      </div>
                 </div>
                </div>

                <div classs="col-md-7">
                    <table class='table table-bordered'>
                        <thead>
                            <tr>
                                <th class='pink'> name </th>
                                <th class='pink'> username </th>
                                <th class='pink'> password </th>
                                <th class='pink'> accessLevel </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" v-bind:key="task">
                                <td class='pink lighten-3'>{{task.name}}</td>
                                <td class='pink lighten-3'>{{task.username}}</td>
                                <td class='pink lighten-3'>{{task.password}}</td>
                                <td class='pink lighten-3'>{{task.accessLevel}}</td>
                                <td>
                                    <button @click="deleteTask(task._id)"
                                    class="btn btn-danger deep-purple">
                                        Delete
                                    </button>
                                </td>
                            </tr>
                        </tbody>
                    </table>
         </div>
     </div>
    </div>
    </div>

</template>

<script>

    class Task{
        constructor(name, username, password, accessLevel){
            this.name = name;
            this.username = username;
            this.password = password;
            this.accessLevel = accessLevel;
        }
    }

    export default {
        data() {
            return{
                task: new Task(),
                tasks: []
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            addTask(){
               fetch('http://localhost:3000/api/users',{
                   method: 'POST',
                   body: JSON.stringify(this.task),
                   headers: {
                       'Accept' : 'application/json',
                       'Content-type':'application/json'
                   }
               })
               .then(res => res.json())
               .then(data => {
                   this.getTasks(data);
               });
               

               this.task = new Task();
            },
            getTasks() {
                fetch('http://localhost:3000/api/users')
                    .then(res => res.json())
                    .then(data => {
                        this.tasks =  data;
                        console.log(this.tasks)
                    });
            },
            deleteTask(id){
                console.log(id)
                fetch('http://localhost:3000/api/users/' + id, {
                method: 'DELETE',
                headers: {
                    'Accept' : 'application/json',
                    'Content-type':'application/json'
                    }
               })
               .then(res => res.json())
               .then(data => {
                   this.getTasks(data);
               });
            },
        }

    }
</script>