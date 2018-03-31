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
            <el-menu :default-openeds="['1', '3']" :router="true">
              <el-submenu index="1">
                <template slot="title"><i class="el-icon-message"></i>人员管理</template>
                <el-menu-item-group>
                  <el-menu-item index="teacher">教师</el-menu-item>
                  <el-menu-item index="1-2">学生</el-menu-item>
                </el-menu-item-group>
              </el-submenu>
              <el-menu-item index="clas">
                <i class="el-icon-menu"></i>
                <span slot="title">班级管理</span>
              </el-menu-item>
              <el-menu-item index="course">
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

  export default {
    name: "admin",
    data(){
      return {
        id:'',
      }
    },
  }

</script>

<style scoped>

</style>
