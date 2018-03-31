<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addTeacherDialog = true"></el-button>
    </div>
    <el-table :data="teachersTable">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="name" label="姓名">
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
            @click="handleDelete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog title="添加教师" :visible.sync="addTeacherDialog">
      <el-form :model="form_add_teacher">
        <el-form-item label="姓名" label-width="60px">
          <el-input v-model="form_add_teacher.name" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="addTeacherDialog = false">取 消</el-button>
        <el-button type="primary" @click="submit_add_teacher">确 定</el-button>
      </div>
    </el-dialog>
  </div>


</template>

<script>
  import axios from 'axios';
  export default {
    name: "teacher",
    data(){
      return {
        teachersTable:[],
        addTeacherDialog:false,
        form_add_teacher:{
          name:'',
        }
      }
    },
    mounted() {
      // // 动态设置背景图的高度为浏览器可视区域高度
      //
      // // 首先在Virtual DOM渲染数据时，设置下背景图的高度．
      // this.clientHeight.height = `${document.documentElement.clientHeight}px`;
      // // 然后监听window的resize事件．在浏览器窗口变化时再设置下背景图高度．
      // const that = this;
      // window.onresize = function temp() {
      //   that.clientHeight = `${document.documentElement.clientHeight}px`;
      // };
      this.getTeachers();
    },
    methods:{
      submit_add_teacher(){
        var self = this;
        self.addTeacherDialog = false;
        axios.post('/teachers',{
          name: self.form_add_teacher.name
        })
          .then(function (response) {
            self.getTeachers();
            if(response.data.status){
              self.$message({
                message: '添加成功',
                type: 'success'
              });
            }
            console.log(response);
          })
          .catch(function (error) {
            console.log(error);
          });

      },
      getTeachers(){
        var self=this;
        console.log('lll')
        axios.get('/teachers')
          .then(function (response) {
            if(response.data.status){
              self.teachersTable = response.data.data;
            }
            console.log(response);

          })
          .catch(function (error) {
            console.log(error);
          });
      },
      toTeacher(){},
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
