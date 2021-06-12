<template>
    <div>
        <el-button type="info" @click="sysout">退出</el-button>
    </div>
</template>

<script>
    import {mapState} from 'vuex'
    export default {
        name: "Home",
        methods: {
            sysout(){
                this.$store.commit("REMOVE_INFO")
                this.$router.push('/login')
            }
        },
        computed: {
            ...mapState(['token'])
        }
    }
</script>

<style scoped>

</style>