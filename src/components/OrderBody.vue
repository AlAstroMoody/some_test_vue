<template>
  <div class="order-body">
    <span class="order-body__title">{{ product.product.name }}</span>
    <div class="order-body__main">
      <div class="order-body__edit">
        <el-button icon="el-icon-delete" circle v-if="editCount===1" @click="editCount = 0"/>
        <el-button icon="el-icon-minus" circle v-else @click="editCount -= 1"/>
        <span class="order-body__element">{{ editCount }} шт. </span>
        <el-button icon="el-icon-plus" circle @click="editCount += 1"/>
      </div>
      <div>
        <span class="order-body__element"> {{ product.product.price }} €</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "OrderBody",
  props: {
    product: {
      type: Object,
      default: () => {
      }
    }
  },
  computed: {
    editCount: {
      get() {
        return this.product.count
      },
      set(value) {
        this.product.count = value
        if (this.product.count === 0) {
          this.$emit("removeProduct", this.product)
        }
      }
    }
  }
}
</script>

<style scoped>
.order-body {
  font-size: 20px;
}

.order-body__main {
  display: flex;
  width: 100%;
  border-bottom: 1px solid #787373;
  align-items: center;
  justify-content: space-between;
}

.order-body__edit {
  display: flex;
  width: 60%;
  justify-content: space-around;
  text-align: center;
}

.order-body__element {
  min-width: 20%;
  margin: 5px;
}

</style>
