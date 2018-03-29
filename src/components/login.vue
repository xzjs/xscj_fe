<template>
  <div>
    <img src="../assets/01.jpg" alt="" class="bg_img">
    <el-form :model="loginForm" status-icon :rules="loginFormRules" ref="loginForm" label-width="80px" class="login_box">
      <el-form-item label="用户名" prop="name">
        <el-input v-model="loginForm.id"></el-input>
      </el-form-item>
      <el-form-item label="确认密码" prop="pass">
        <el-input type="password" v-model="loginForm.pwd" auto-complete="off"></el-input>
      </el-form-item>
      <el-form-item prop="role">
        <el-radio-group v-model="loginForm.type">
          <el-radio :label="0">学生</el-radio>
          <el-radio :label="1">教师</el-radio>
          <el-radio :label="2">管理员</el-radio>
        </el-radio-group>
      </el-form-item>

      <el-form-item>
        <el-button class="login_btn" type="primary" @click="login">登录</el-button>
      </el-form-item>
    </el-form>
  </div>

</template>

<script>
  import { mapMutations } from 'vuex'
  import axios from 'axios'
export default {
  name: 'HelloWorld',
  data () {
    return {
      loginForm:{
        id:'',
        pwd:'',
        type:0,
      },
      loginFormRules: {
        id:[
          { required: true, message: '请输入用户名', trigger: 'blur' },
          { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' }
        ],
        pwd:[
          { required: true, message: '请输入密码', trigger: 'blur' },
          { min: 6, max: 12, message: '长度在 6 到 12 个字符', trigger: 'blur' }
        ]
      }
    }
  },
  methods: {
    ...mapMutations(['setId']),
    login() {
      var self= this;
      var params = new URLSearchParams();
      params.append('id', this.loginForm.id);
      params.append('pwd', this.loginForm.pwd);
      params.append('type', this.loginForm.type);
      axios.post('/login', params)
        .then(response => {
          var res=response.data
          console.log(response.data);
          if (res.status) {
            if(self.loginForm.type==2){
              self.$router.push({ path: '/student' });
            }
          } else {
            alert("登录失败");
          }
        })
        .catch(function (error) {
          console.log(error);
        })
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .login_box{
    width: 400px;
    position: absolute;
    left: 50%;
    top: 30%;
    padding: 50px 30px 30px;
    background: rgba(255,255,255,0.6);
    border-radius: 10px;
    margin-left: -200px;
  }
.bg_img{
  position: absolute;
  z-index: -1;
  width: 100%;
  height: 100%;
}
.login_btn{
  width: 240px;
}
</style>
