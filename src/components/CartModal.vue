<template>
  <el-card class="cart-modal">
    <span class="cart-modal__title">Ваш заказ</span>
    <section class="cart-modal__body">
      <transition-group name="list" tag="p">
        <div v-for="product in order" :key="product.product.id" class="cart-modal__order">
          <order-body :product="product" class="cart-modal__order-body" @removeProduct="removeProduct"/>
        </div>
      </transition-group>
    </section>
    <div class="cart-modal__footer">
      <span>Сумма заказа: {{ totalPrice.toFixed(2) }} €</span>
    </div>
    <el-button type="success" @click="placeOrder" :disabled="order.length===0">
      Оформить заказ
    </el-button>
  </el-card>
</template>

<script>
import OrderBody from "@/components/OrderBody";

export default {
  name: "CartModal",
  components: {OrderBody},
  props: {
    order: {
      type: Array,
      default: () => []
    }
  },
  computed: {
    totalPrice: {
      get() {
        return this.order.reduce(function (result, item) {
          return result + item.count * item.product.price;
        }, 0);
      }
    }
  },
  methods: {
    removeProduct(product) {
      let index = this.order.indexOf(product, 0);
      if (index > -1) {
        this.order.splice(index, 1);
      }
    },
    placeOrder() {
      this.$notify.success({
        title: 'Заказ оформлен',
        message: ''
      });
    }
  }
}
</script>

<style scoped>
.cart-modal {
  display: flex;
  flex-direction: column;
}

.cart-modal__title {
  font-size: 30px;
}

.cart-modal__body {
  max-height: 260px;
  overflow: auto;
}

.cart-modal__order {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.cart-modal__order-body {
  width: 100%;
  margin: 5px;
}

.cart-modal__footer {
  margin: 5% 0 5% 0;
  text-align: right;
  font-size: 20px;
}

.list-enter-active, .list-leave-active {
  transition: all 0.5s;
}

.list-enter, .list-leave-to {
  opacity: 0;

}
</style>
