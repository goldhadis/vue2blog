<template>
    <div class="login-container">
        <div class="login-box">
            <div class="avabar-box">
                <img src="../assets/logo.png">
            </div>
            <div class="login-form">
                <el-form :model="loginForm" ref="loginFormRef" :rules="rules" label-width="0px">
                    <!-- 用户名-->
                    <el-form-item prop="username">
                        <el-input placeholder="请输入用户名" prefix-icon="el-icon-user" v-model="loginForm.username"></el-input>
                    </el-form-item>
                    <!-- 密码-->
                    <el-form-item prop="password">
                        <el-input type="password" placeholder="请输入密码" prefix-icon="el-icon-lock" v-model="loginForm.password"></el-input>
                    </el-form-item>
                    <el-form-item class="btns">
                        <el-button type="primary" @click="submitForm('loginFormRef')">登录</el-button>
                        <el-button type="info" @click="resetForm('loginFormRef')">重置</el-button>
                    </el-form-item>
                </el-form>
            </div>
        </div>

    </div>
</template>

<script>
    export default {
        name: "Login",
        data(){
            return{
                loginForm: {
                    username: '',
                    password: ''
                },
                rules: {
                    username: [
                        { required: true, message: '请输入用户名', trigger: 'blur' },
                        { min: 3, max: 10, message: '长度在 3 到 10 个字符', trigger: 'blur' }
                    ],
                    password: [
                        { required: true, message: '请输入密码', trigger: 'blur' }
                    ]
                }
            }
        },
        methods: {
            submitForm(formName) {
                this.$refs[formName].validate(async valid => {
                    if (valid) {
                        const _this = this
                        await this.$http.post('/login', this.loginForm).then(res => {
                            console.log(res.data)
                            const jwt = res.headers['authorization']
                            const userInfo = res.data.data
                            // 把数据共享出去
                            _this.$store.commit("SET_TOKEN", jwt)
                            _this.$store.commit("SET_USERINFO", userInfo)
                            // 获取
                            console.log(_this.$store.getters.getUser)
                            _this.$router.push("/home")
                        })

                    } else {
                        console.log('error submit!!');
                        return false;
                    }
                });
            },
            resetForm(formName){
                this.$refs[formName].resetFields();
            }
        }

    }
</script>

<style Lang="less" scoped>
    .login-container{
        height: 100%;
        background-color: #2b4b6b;

    }
    .login-box{
        width: 450px;
        height: 350px;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
        background-color: #fff;
        border-radius: 3px;
    }
    .avabar-box{
        height: 130px;
        width: 130px;
        border: 1px solid #eee;
        border-radius: 50%;
        padding: 10px;
        box-shadow: 0 0 10px #ddd;
        position: absolute;
        left: 50%;
        transform: translate(-50%,-50%);
        background-color: #fff;
    }
    .avabar-box img{
        height: 100%;
        width: 100%;
        border-radius: 50%;
        background-color: #eeeeee;
    }
    .btns{
        display: flex;
        justify-content: flex-end;
    }
    .login-form{
        position: absolute;
        bottom: 0;
        padding: 0 20px;
        width: 100%;
        box-sizing: border-box;
    }
</style>