<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="add"></el-button>
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
            @click="Edit(scope.$index, scope.row)">编辑
          </el-button>
          <el-button
            size="mini"
            type="danger"
            @click="Delete(scope.$index, scope.row)">删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <el-dialog :title="dialogName" :visible.sync="addTeacherDialog" @close="dialog_close">
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
        dialogName:'添加教师',
        addTeacherDialog:false,
        form_add_teacher:{
          name:'',
          id:''
        },
        edit:false,
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
      getTeachers(){
        var self=this;

        axios.get('/teachers')
          .then(function (response) {
            if(response.data.status){
              self.teachersTable = response.data.data;
            }
          })
          .catch(function (error) {
            console.log(error);
          });
      },
      submit_add_teacher(){
        var self = this;
        if(self.edit){
          axios.put('/teachers/'+self.form_add_teacher.id,{
            name: self.form_add_teacher.name
          })
            .then(function (response) {
              self.getTeachers();
              if(response.data.status){
                self.$message({
                  message: '修改成功',
                  type: 'success'
                });
              }
            })
            .catch(function (error) {
              console.log(error);
            });
        }else{
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
            })
            .catch(function (error) {
              console.log(error);
            });
        }
        self.addTeacherDialog = false;
      },
      add(){
        this.addTeacherDialog = true;
        this.dialogName = '添加教师';
      },
      Edit(index,row){
        var self=this;
        self.dialogName = '修改信息';
        self.addTeacherDialog = true;
        self.form_add_teacher.name = row.name;
        self.form_add_teacher.id = row.id;
        self.edit = true;
      },
      dialog_close(){
        this.edit = false;
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
