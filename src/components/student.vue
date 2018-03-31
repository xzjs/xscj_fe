<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog(0)"></el-button>
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

    <el-dialog :title="title" :visible.sync="dialog">
      <el-form :model="student">
        <el-form-item label="姓名" label-width="60px">
          <el-input v-model="student.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="班级" label-width="60px">
          <el-select v-model="student.clas_id" placeholder="请选择">
            <el-option
              v-for="item in clases"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="add">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapState} from 'vuex';
  import {mapActions} from 'vuex';

  export default {
    name: "student",
    data() {
      return {
        students: [],
        dialog: false,
        student: {
          id: 0,
          name: "",
          clas_id: ''
        },
        title: ""
      }
    },
    computed: mapState(['clases']),
    mounted() {
      this.getStudents();
    },
    methods: {
      ...mapActions([
        'getClases',
      ]),
      add() {
        if (this.student.id == 0) {
          axios.post('/students', {
            name: this.student.name,
            clas_id: this.student.clas_id
          })
            .then(response => {
              this.getStudents();
              if (response.data.status) {
                this.$message({
                  message: '添加成功',
                  type: 'success'
                });
                this.closeDialog();
              } else {
                console.log(response.data.message);
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        } else {
          axios.put('/students/' + this.student.id, {
            name: this.student.name,
            clas_id: this.student.clas_id
          })
            .then(response => {
              console.log(response);
              if (response.data.status) {
                this.$message({
                  message: '修改成功成功',
                  type: 'success'
                });
                this.closeDialog();
                this.getStudents();
              } else {
                console.log(response.data.message);
              }
            })
            .catch(response => {
              console.log(response);
            })
        }


      },
      getStudents() {
        axios.get('/students')
          .then(response => {
            if (response.data.status) {
              this.students = response.data.data;
            } else {
              alert(response.data.message);
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      edit(index, row) {
        this.student = {
          id: row.id,
          name: row.name,
          clas_id: parseInt(row.clas_id)
        };
        this.showDialog(row.clas_id);
      },
      closeDialog() {
        this.student = {
          id: 0,
          name: "",
          clas_id: ""
        };
        this.dialog = false;
      },
      showDialog(id) {
        this.title = id == 0 ? "添加学生" : "修改学生";
        this.getClases();
        this.dialog = true;
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
