<template>
  <div>
    <el-table :data="grades">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="course.name" label="课程">
      </el-table-column>
      <el-table-column prop="score" label="成绩">
      </el-table-column>
    </el-table>
  </div>
</template>

<script>
  import axios from 'axios';
  import {mapState, mapActions} from 'vuex';

  export default {
    name: "grade",
    data() {
      return {
        dialog: false,
        grade: {
          id: 0,
          course_id: "",
          student_id: '',
          score: ''
        },
        title: "",
        course_id: ''
      }
    },
    computed: mapState(['students', 'courses', 'user', 'grades']),
    mounted() {
      this.getGrades('?student_id=' + this.user.id);
    },
    methods: {
      ...mapActions([
        'getStudents',
        'getCourses',
        'getGrades'
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
        this.getStudents();
        this.dialog = true;
      },
      change(value) {
        this.getGrades('?course_id=' + value);
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
