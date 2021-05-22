<template>
  <aside class="site-sidebar" :class="'site-sidebar--' + sidebarLayoutSkin">
    <div class="site-sidebar__inner">
      <el-menu
        :default-active="menuActiveName || 'home'"
        :collapse="sidebarFold"
        :collapseTransition="false"
        class="site-sidebar__menu">
        <el-menu-item index="home" @click="$router.push({ name: 'home' })">
          <i class="el-icon-s-home"></i>
          <span slot="title">首页</span>
        </el-menu-item>
        <el-menu-item index="userManagement" @click="$router.push({ name: 'userManagement' })">
          <i class="el-icon-s-custom"></i>
          <span slot="title">账号管理</span>
        </el-menu-item>
        <el-menu-item index="cWatch" @click="$router.push({ name: 'cWatch' })">
          <i class="el-icon-connection"></i>
          <span slot="title">章节管理</span>
        </el-menu-item>
        <el-menu-item index="question" @click="$router.push({ name: 'question' })">
          <i class="el-icon-s-order"></i>
          <span slot="title">题目管理</span>
        </el-menu-item>
<!--        <el-submenu index="quesManagement">-->
<!--          <template slot="title">-->
<!--            <i class="el-icon-s-order"></i>-->
<!--            <span>题目管理</span>-->
<!--          </template>-->
<!--          <el-menu-item index="displayQues" @click="$router.push({ name: 'displayQues' })">-->
<!--            <i class="el-icon-view"></i>-->
<!--            <span slot="title">查看</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="addQues" @click="$router.push({ name: 'addQues' })">-->
<!--            <i class="el-icon-folder-add"></i>-->
<!--            <span slot="title">新增</span>-->
<!--          </el-menu-item>-->
<!--          <el-menu-item index="approveQues" @click="$router.push({ name: 'approveQues' })">-->
<!--            <i class="el-icon-s-check"></i>-->
<!--            <span slot="title">审批</span>-->
<!--          </el-menu-item>-->
<!--        </el-submenu>-->

        <el-submenu index="knowledge">
          <template slot="title">
            <i class="el-icon-s-management"></i>
            <span>知识点管理</span>
          </template>
          <el-menu-item index="displayKnowledge" @click="$router.push({ name: 'displayKnowledge' })">
            <i class="el-icon-view"></i>
            <span slot="title">查看</span>
          </el-menu-item>
          <el-menu-item index="addKnowledge" @click="$router.push({ name: 'addKnowledge' })">
            <i class="el-icon-folder-add"></i>
            <span slot="title">新增</span>
          </el-menu-item>
          <!--<el-menu-item index="approveKnowledge" @click="$router.push({ name: 'approveKnowledge' })">
            <i class="el-icon-s-check"></i>
            <span slot="title">审批</span>
          </el-menu-item>-->
        </el-submenu>
      </el-menu>
    </div>
  </aside>
</template>

<script>
  import MainSidebar from './js/main-sidebar'

  export default MainSidebar
</script>
