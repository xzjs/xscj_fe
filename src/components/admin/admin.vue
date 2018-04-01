<template>
  <el-container>
    <el-aside width="200px" style="background-color: rgb(238, 241, 246);height: 100%">
      <el-menu :default-openeds="['1', '3']" :router="true">
        <el-submenu index="1">
          <template slot="title"><i class="el-icon-menu"></i>人员管理</template>
          <el-menu-item-group>
            <el-menu-item index="teacher">教师</el-menu-item>
            <el-menu-item index="student">学生</el-menu-item>
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
        <el-menu-item index="grade">
          <i class="el-icon-menu"></i>
          <span slot="title">成绩管理</span>
        </el-menu-item>
      </el-menu>
    </el-aside>
    <el-main>
      <router-view></router-view>
    </el-main>
  </el-container>
</template>

<script>

  export default {
    name: "admin",
    data() {
      fullHeight: document.documentElement.clientHeight
      return {
        id: '',
      }
    },
    watch: {
      fullHeight (val) {
        if(!this.timer) {
          this.fullHeight = val
          this.timer = true
          let that = this
          setTimeout(function (){
            that.timer = false
          },400)
        }
      }
    },
    mounted () {
      const that = this
      window.onresize = () => {
        return (() => {
          window.fullHeight = document.documentElement.clientHeight
          that.fullHeight = window.fullHeight
        })()
      }
    }
  }

</script>

<style scoped>

</style>
