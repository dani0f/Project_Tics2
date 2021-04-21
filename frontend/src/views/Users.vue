<template>

    <div>
      <div class="container">
          <div class="row pt-5">
               <div class="col-md-5">
                 <div class="card">
                    <v-card-title><h3>Add user</h3></v-card-title>
                     <div class="card-body">
                         <form @submit.prevent="sendTask">
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
                             <template v-if="edit === false">
                                 <button class="btn btn-primary
                                btn-block deep-purple mt-4">save</button>      
                            </template>
                            <template v-else>
                                 <button class="btn btn-primary
                                btn-block teal darken-4">Update</button>      
                            </template>
                         </form>
                      </div>
                 </div>
                </div>

                <div class="col-md-7">
                    <table class='table table-bordered'>
                        <thead>
                            <tr>
                                <th class='red'> name </th>
                                <th class='red'> username </th>
                                <th class='red'> password </th>
                                <th class='red'> accessLevel </th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr v-for="task of tasks" v-bind:key="task">
                                <td class='red lighten-3'>{{task.name}}</td>
                                <td class='red lighten-3'>{{task.username}}</td>
                                <td class='red lighten-3'>{{task.password}}</td>
                                <td class='red lighten-3'>{{task.accessLevel}}</td>
                                <td>
                                    <div class="btn-group" role="group" aria-label="Basic mixed styles example">
                                    <button @click="deleteTask(task._id)"
                                    class="btn btn-danger red darken-4">
                                        Delete
                                    </button>
                                    <button @click="editTask(task._id)"
                                        class="btn btn-danger light-green darken-3">
                                        Edit
                                    </button>
                                    </div>
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
                tasks: [],
                edit: false,
                taskToEdit: ''
            }
        },
        created() {
            this.getTasks();
        },
        methods: {
            sendTask(){
                if(this.edit === false) {
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
                        })

               } else {
                   fetch('http://localhost:3000/api/users/' + this.taskToEdit, {
                       method: 'PUT',
                       body: JSON.stringify(this.task),
                       headers: {
                        'Accept' : 'application/json',
                        'Content-type':'application/json'
                       }
                   })
                        .then(res => res.json())
                        .then(data => {
                            this.getTasks(data);
                            this.edit = false;
                        });
               }
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

            editTask(id) {
                console.log(id)
                fetch('http://localhost:3000/api/users/' + id)
                    .then(res => res.json())
                    .then(data => {
                        this.task = new Task(data.name, data.username, data.password, data.accessLevel);
                        this.taskToEdit = data._id;
                        this.edit = true;
                    });

            },
        }

    }
</script>