<template>
    <div>
      <el-container style="height: 600px">
        <el-header style="text-align: right; font-size: 12px">
          <el-dropdown>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
            <el-dropdown-menu slot="dropdown">
              <el-dropdown-item>查看</el-dropdown-item>
              <el-dropdown-item>新增</el-dropdown-item>
              <el-dropdown-item>删除</el-dropdown-item>
            </el-dropdown-menu>
          </el-dropdown>
          <span>{{id}}</span>
        </el-header>
        <el-container>
          <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
            <el-menu :default-openeds="['1', '3']">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>人员管理</template>
                <el-menu-item-group>
                  <el-menu-item index="1-1" @click="toTeacher()">教师</el-menu-item>
                  <el-menu-item index="1-2">学生</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="2">
                <i class="el-icon-menu"></i>
                <span slot="title">班级管理</span>
              </el-menu-item>
              <el-menu-item index="3">
                <i class="el-icon-menu"></i>
                <span slot="title">课程管理</span>
              </el-menu-item>
              <el-menu-item index="4">
                <i class="el-icon-menu"></i>
                <span slot="title">成绩管理</span>
              </el-menu-item>
            </el-menu>
          </el-aside>
          <el-main>
            <router-view></router-view>
          </el-main>
        </el-container>
      </el-container>
    </div>
</template>

<script>
  import axios from 'axios';
  import {mapState} from 'vuex';
    export default {
      name: "admin",
      data(){
        const item = {
          date: '2016-05-02',
          name: '王小虎',
          address: '上海市普陀区金沙江路 1518 弄'
        };
        return {
          teachersTable:[],
          tableData: Array(10).fill(item),
          // clientHeight: '600px',
          addTeacherDialog:false,
          form_add_teacher:{
            name:'',
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
        toTeacher(){
          this.$router.push({ path: '/teacher' });
        },
      }

    }
</script>

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
</style>
