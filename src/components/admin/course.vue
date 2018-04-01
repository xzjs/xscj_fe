<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addCourseDialog = true"></el-button>
    </div>
    <el-table :data="courseTable">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="name" label="课程名称">
      </el-table-column>
      <el-table-column prop="teacher.name" label="教师">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button
            size="mini"
            @click="handleEdit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="del(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加课程" :visible.sync="addCourseDialog">
      <el-form :model="form_add_course">
        <el-form-item label="课程名称" label-width="80px">
          <el-input v-model="form_add_course.name" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="教师姓名" label-width="80px">
          <el-select v-model="form_add_course.teacher_id" placeholder="请选择">
            <el-option
              v-for="item in teacherInfos"
              :key="item.id"
              :label="item.name"
              :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addCourseDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_course">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
  import axios from 'axios';
  export default {
    name: "course",
    data(){
      return {
        courseTable:[],
        addCourseDialog:false,
        form_add_course:{
          name:'',
          teacher_id:'',
        },
        teacherInfos:[],
      }
    },
    mounted() {
      this.getCourses();
      this.getTeachers();
    },
    methods:{
      getTeachers(){
        var self=this;
        axios.get('/teachers')
          .then(function (response) {
            if(response.data.status){
              console.log(response.data.data)
              self.teacherInfos = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submit_add_course(){
        var self = this;

        axios.post('/courses',{
          name: self.form_add_course.name,
          teacher_id: self.form_add_course.teacher_id
        })
          .then(function (response) {
            self.getCourses();
            if(response.data.status){
              self.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            self.addCourseDialog = false;
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      getCourses(){
        var self=this;
        axios.get('/courses')
          .then(function (response) {
            if(response.data.status){
              console.log(response.data.data)
              self.courseTable = response.data.data;
            }
            console.log(response);

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      del(index, row) {
        axios.delete('/courses/' + row.id)
          .then(response => {
            if (response.data.status) {
              this.$message({
                message: '删除成功',
                type: 'success'
              });
              this.getCourses();
            } else {
              console.log(response.data.message);
            }
          })
          .catch(response => {
            console.log(response.data);
          })
      }
    }

  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .add_btn_box{
    line-height: 40px;
    margin-bottom: 10px;
    text-align: right;
  }
</style>
