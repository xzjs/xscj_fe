<template>
  <el-container>
    <el-header style="text-align: right; font-size: 12px">
      <span style="position: absolute;left: 30px;font-size: 22px;">学生成绩管理系统</span>
      <el-dropdown @command="handleCommand">
        <i class="el-icon-setting" style="margin-right: 15px"></i>
        <el-dropdown-menu slot="dropdown">
          <el-dropdown-item command="update">修改密码</el-dropdown-item>
          <el-dropdown-item command="logout">注销</el-dropdown-item>
        </el-dropdown-menu>
      </el-dropdown>
      <span>{{name}}</span>
    </el-header>
    <router-view></router-view>

    <el-dialog title="修改密码" :visible.sync="dialog">
      <el-form :model="form">
        <el-form-item label="原密码">
          <el-input type="password" v-model="form.old_pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="新密码">
          <el-input type="password" v-model="form.new_pwd" auto-complete="off"></el-input>
        </el-form-item>
        <el-form-item label="重复密码">
          <el-input type="password" v-model="form.new_pwd_repeat" auto-complete="off"></el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialog=false">取 消</el-button>
        <el-button type="primary" @click="submit">确 定</el-button>
      </div>
    </el-dialog>
  </el-container>
</template>

<script>
  import axios from 'axios';
  import {mapState, mapActions, mapMutations} from 'vuex';

  export default {
    name: 'nav',
    data() {
      return {
        name: '',
        dialog: false,
        form: {
          old_pwd: '',
          new_pwd: '',
          new_pwd_repeat: ''
        }
      }
    },
    computed: mapState(['user']),
    methods: {
      ...mapMutations(['setUser']),
      getUserName() {
        switch (this.user.type) {
          case 0:
            axios.get('/students/' + this.user.id)
              .then(response => {
                if (response.data.status) {
                  this.name = response.data.data.name;
                } else {
                  console.log(response.data.message);
                }
              })
              .catch(response => {
                console.log(response.data);
              });
            break;
          case 1:
            axios.get('/teachers/' + this.user.id)
              .then(response => {
                if (response.data.status) {
                  this.name = response.data.data.name;
                } else {
                  console.log(response.data.message);
                }
              })
              .catch(response => {
                console.log(response.data);
              });
            break;
          case 2:
            this.name = '管理员';
            break;
        }
      },
      handleCommand(command) {
        switch (command) {
          case 'update':
            this.showDialog();
            break;
          case 'logout':
            this.setUser({
              id:'',
              type:''
            });
            this.$router.push({path:'/'});
            break;
        }
      },
      showDialog() {
        this.form = {
          old_pwd: '',
          new_pwd: '',
          new_pwd_repeat: ''
        };
        this.dialog = true;
      },
      submit() {
        if (this.form.new_pwd == this.form.new_pwd_repeat) {
          axios.put('/login/' + this.user.id, {
            type: this.user.type,
            old_pwd: this.form.old_pwd,
            new_pwd: this.form.new_pwd
          })
            .then(response => {
              if (response.data.status) {
                this.$message({
                  message: '修改成功成功',
                  type: 'success'
                });
                this.dialog = false;
              } else {
                alert(response.data.message);
              }
            })
            .catch(response => {
              console.log(response.data);
            })
        } else {
          alert('两次输入的密码不一致');
        }
      },
      checkLogin(){
        if(this.user.id==''){
          this.$router.push({path:'/'});
        }
      }
    },
    mounted() {
      this.checkLogin();
      this.getUserName();
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .el-header {
    background-color: #B3C0D1;
    color: #333;
    text-align: center;
    line-height: 60px;
  }
</style>
