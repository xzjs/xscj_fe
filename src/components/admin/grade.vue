<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="showDialog(0)"></el-button>
    </div>

    <el-table :data="grades">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="course.name" label="课程">
      </el-table-column>
      <el-table-column prop="student.name" label="学生">
      </el-table-column>
      <el-table-column prop="score" label="成绩">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="edit(scope.$index, scope.row)">编辑
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="title" :visible.sync="dialog">
      <el-form :model="grade">
        <el-form-item label="课程" label-width="60px">
          <el-select v-model="grade.course_id" placeholder="请选择">
            <el-option
              v-for="item in courses"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="学生" label-width="60px">
          <el-select v-model="grade.student_id" placeholder="请选择">
            <el-option
              v-for="item in students"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="成绩" label-width="60px">
          <el-input v-model="grade.score" auto-complete="off"></el-input>
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
    name: "grade",
    data() {
      return {
        grades: [],
        dialog: false,
        grade: {
          id: 0,
          course_id: "",
          student_id: '',
          score: ''
        },
        title: ""
      }
    },
    computed: mapState(['students', 'courses']),
    mounted() {
      this.getGrades();
    },
    methods: {
      ...mapActions([
        'getStudents',
        'getCourses'
      ]),
      add() {
        if (this.grade.id == 0) {
          axios.post('/grades', {
            course_id: this.grade.course_id,
            student_id: this.grade.student_id,
            score: this.grade.score
          })
            .then(response => {
              this.getGrades();
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
          axios.put('/grades/' + this.grade.id, {
            student_id: this.grade.student_id,
            course_id: this.grade.course_id,
            score: this.grade.score
          })
            .then(response => {
              console.log(response);
              if (response.data.status) {
                this.$message({
                  message: '修改成功',
                  type: 'success'
                });
                this.closeDialog();
                this.getGrades();
              } else {
                console.log(response.data.message);
              }
            })
            .catch(response => {
              console.log(response);
            })
        }
      },

      getGrades() {
        axios.get('/grades')
          .then(response => {
            if (response.data.status) {
              this.grades = response.data.data;
            } else {
              console.log(response.data.message);
            }
          })
          .catch(response => {
            console.log(response.data);
          })
      },

      edit(index, row) {
        this.grade = {
          id: row.id,
          student_id: parseInt(row.student_id),
          course_id: parseInt(row.course_id),
          score: row.score
        };
        this.showDialog(row.id);
      },
      closeDialog() {
        this.grade = {
          id: 0,
          student_id: "",
          course_id: "",
          score: ""
        };
        this.dialog = false;
      },
      showDialog(id) {
        this.title = id == 0 ? "添加成绩" : "修改成绩";
        this.getCourses();
        this.getStudents();
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
