<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addDialog = true"></el-button>
    </div>

    <el-table :data="students">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="name" label="名称">
      </el-table-column>
      <el-table-column prop="clas.name" label="班级">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="edit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加学生" :visible.sync="addClasDialog">
      <el-form :model="student">
        <el-form-item label="姓名" label-width="60px">
          <el-input v-model="student.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="60px">
          <el-select v-model="student.clas.id" placeholder="请选择">
            <el-option
              v-for="item in options"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="cancel">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapState} from 'vuex';

  export default {
    name: "student",
    data() {
      return {
        students: [],
        addDialog: false,
        student: {
          id: 0,
          name: "",
          clas:{
            id:0,
            name:""
          }
        },
        options:[]
      }
    },
    computed: mapState(['id']),
    mounted() {
      this.getClases();
    },
    methods: {
      add() {
        if(this.student.id==0){
          axios.post('/students', {
            name: this.clas.name,
            clas_id:0
          })
            .then(response => {
              this.getClases();
              if (response.data.status) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.cancel();
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }else{
          axios.put('/clas/' + this.clas.id, {name: this.clas.name})
            .then(response => {
              if (response.data.status) {
                this.$message({
                  message: '修改成功成功',
                  type: 'success'
                });
                this.cancel();
                this.getClases();
              } else {
                this.$message({
                  message: response.data.message,
                  type: 'error'
                })
              }
            })
            .catch(response => {
              console.log(response);
            })
        }


      },
      getStudent() {
        axios.get('/student')
          .then(response => {
            if (response.data.status) {
              this.clases = response.data.data;
            } else {
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      edit(index, row) {
        this.clas = {
          id: row.id,
          name: row.name
        };
        this.addClasDialog = true;
      },
      resetForm(){
        this.clas = {
          id: 0,
          name: ""
        }
      },
      cancel(){
        this.resetForm();
        this.addClasDialog=false;
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-footer {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }

  /*.el-aside {*/
  /*background-color: #D3DCE6;*/
  /*color: #333;*/
  /*text-align: center;*/
  /*line-height: 200px;*/
  /*}*/

  .el-main {
    background-color: #E9EEF3;
    color: #333;
    /*text-align: center;*/
    /*line-height: 160px;*/
  }

  body > .el-container {
    margin-bottom: 40px;
  }

  .el-container:nth-child(5) .el-aside,
  .el-container:nth-child(6) .el-aside {
    line-height: 260px;
  }

  .el-container:nth-child(7) .el-aside {
    line-height: 320px;
  }

  .el-header {
    background-color: #B3C0D1;
    color: #333;
    line-height: 60px;
  }

  .el-aside {
    color: #333;
  }

  .add_btn_box {
    line-height: 40px;
    margin-bottom: 10px;
    text-align: right;
  }
</style>
