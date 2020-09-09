<template>
  <el-card class="product-card" :body-style="{ padding: '0px' }">
    <div class="product-card__image-box">
      <img :src="product.img_url" alt="image" class="product-card__image"/>
    </div>
    <span class="product-card__title">{{ product.name }}</span>
    <div>
      {{ product.price }} €
    </div>
    <transition name="fade" mode="out-in">
      <div class="product-card__footer" v-if="count > 0" :key="'del'">
        <el-input-number v-model="countProduct" controls-position="right" :min="0" size="small"></el-input-number>
        <el-button type="danger" class="product-card__button" @click="countProduct = 0">
          Удалить
        </el-button>
      </div>
      <div v-if="count < 1" class="product-card__footer" :key="'add'">
        <el-button type="success" @click="countProduct += 1" class="product-card__button">
          Добавить в корзину
        </el-button>
      </div>
    </transition>
  </el-card>
</template>

<script>
export default {
  name: "ProductCard",
  data() {
    return {
      countCopy: this.count
    }
  },
  props: {
    product: {
      type: Object,
      default: () => {
      }
    },
    count: {
      type: Number,
      default: 0
    }
  },
  computed: {
    countProduct: {
      get() {
        return this.count
      },
      set(value) {
        this.countCopy = value
        this.$emit('toOrder', {product: this.product, count: this.countCopy})
      }
    }
  }
}
</script>

<style scoped>
.product-card {
  width: 100%;
  display: flex;
  flex-direction: column;
  flex-wrap: wrap;
  margin: 2%;
}

.product-card__image {
  width: 240px;
  height: auto;
}

.product-card__title {
  font-size: 20px;
}

.product-card__footer {
  display: flex;
  flex-direction: column;
  margin: 3%;
  height: 80px;
  justify-content: space-evenly;
  align-items: center;
  align-content: center;
}

.fade-enter {
  opacity: 0;
}

.fade-enter-active {
  transition: opacity 0.2s;
}

.fade-leave-active {
  transition: opacity 0.2s;
}

.fade-leave-to {
  opacity: 0;
}

</style>
