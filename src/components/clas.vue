<template>
  <div>
    <div class="add_btn_box">
      <el-button type="primary" size="small" icon="el-icon-plus" @click="addClasDialog = true"></el-button>
    </div>

    <el-table :data="clases">
      <el-table-column
        type="index"
        width="60">
      </el-table-column>
      <el-table-column prop="name" label="名称">
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

    <el-dialog title="添加班级" :visible.sync="addClasDialog">
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
  import {mapState} from 'vuex';

  export default {
    name: "admin",
    data() {
      return {
        clases: [],
        addClasDialog: false,
        form_add_teacher: {
          name: '',
        }
      }
    },
    computed: mapState(['id']),
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
      this.getClases();
    },
    methods: {
      submit_add_teacher() {
        var self = this;
        self.addTeacherDialog = false;
        axios.post('/teachers', {
          name: self.form_add_teacher.name
        })
          .then(function (response) {
            self.getTeachers();
            if (response.data.status) {
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
      getClases() {
        axios.get('/clas')
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
