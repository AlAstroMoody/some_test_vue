<template>
  <el-menu mode="horizontal" class="header">
    <span class="header__title">Витрина интернет-магазина</span>
    <el-button class="header__item" @click="showCart">
      <i class="el-icon-shopping-cart-2"></i>
    </el-button>
  </el-menu>
</template>

<script>
export default {
  name: "NavigationMenu",
  methods: {
    showCart() {
      this.$emit('showCart')
    }
  }
}
</script>

<style scoped>
.header {
  display: flex;
  justify-content: center;
  background: linear-gradient(45deg, #ececec, #8b8b8b);
  box-shadow: 4px 2px 10px 0 rgba(0, 0, 0, 0.1);
  align-items: center;
  position: sticky;
  top: 0;
  left: 0;
  z-index: 999;
}

.header__title {
  color: black;
  font-size: 25px;
}

.header__item {
  position: relative;
  left: 20%;
  background: #a7a2a2;
}

.el-icon-shopping-cart-2 {
  font-size: 20px;
  color: black;
}

@media screen and (max-width: 700px) {
  .header__item {
    left: auto;
  }
}
</style>
