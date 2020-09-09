<template>
  <div class="home">
    <navigation-menu class="home__header" @showCart="showCart"/>
    <section class="home__body">
      <transition name="boom">
        <cart-modal class="home__cart" v-if="cart" :order="order"/>
      </transition>
      <div class="home__products">
        <div v-for="product in productList" :key="product.id" class="home__products-card">
          <product-card :product="product" :count="calculateCount(product)" @toOrder="toOrder"/>
        </div>
      </div>
      <cart-modal class="home__cart-modal" v-if="cart" :order="order"/>
    </section>
  </div>
</template>

<script>
import ProductCard from "@/components/ProductCard";
import NavigationMenu from "@/components/NavigationMenu";
import CartModal from "@/components/CartModal";
import INSTANCE from "@/instanceWithBaseUrl";

export default {
  name: 'Home',
  data() {
    return {
      productList: [],
      cart: false,
      order: []
    }
  },
  components: {
    ProductCard,
    NavigationMenu,
    CartModal
  },
  methods: {
    toOrder(item) {
      let found = false
      for (let product of this.order) {
        if (product.product === item.product) {
          found = true
          if (item.count === 0) {
            let index = this.order.indexOf(product, 0);
            if (index > -1) {
              this.order.splice(index, 1);
            }
          } else product.count = item.count
        }
      }
      if (!found) {
        this.$set(this.order, this.order.length, item)
      }
    },
    showCart() {
      this.cart = !this.cart
    },
    calculateCount(product) {

      for (let item of this.order) {
        if (item.product === product) {
          return item.count
        }
      }
      return 0
    }
  },
  async created() {
    await INSTANCE.get('/')
        .then(response => {
          this.productList = response.data;
        })
        .catch(error => {
          this.$notify.info({
            title: error,
            message: 'Ошибка загрузки товаров',
          })
          this.errored = true;
        })
  }
}
</script>
<style scoped>
.home {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.home__header {
  width: 100%;
  margin-bottom: 1%;
}

.home__body {
  width: 100%;
  display: flex;
  justify-content: center;
}

.home__products {
  display: flex;
  justify-content: center;
  align-items: center;
  align-content: center;
  width: 50%;
  flex-wrap: wrap;
  min-width: 800px;
}

.home__cart {
  position: sticky;
  width: 20%;
  height: 100%;
  border-radius: 10px;
  min-width: 350px;
  top: 5%;
  left: 0;
}

.home__products-card {
  display: flex;
  justify-content: center;
  min-width: 300px;
  max-width: 350px;
  width: 30%;
  flex-wrap: wrap;
}

.home__cart-modal {
  display: none;
  margin: auto;
}

@media screen and (max-width: 960px) {
  .home__cart {
    display: none;
  }

  .home__cart-modal {
    display: flex;
    position: fixed;
    margin: auto;
    top: 10%;
    width: 350px;
    z-index: 999;

  }
}

@media screen and (max-width: 815px) {
  .home__products {
    min-width: auto;
    width: 100%;
  }
}

.boom-enter-active {
  animation: slideIn 1s;
}

.boom-leave-active {
  animation: slideOut 1s;
}

@keyframes slideIn {
  from {
    transform: translate(-800px);
  }
  to {
    transform: translate(0px);
  }
}

@keyframes slideOut {
  from {
    transform: translate(0px);
  }
  to {
    transform: translate(-800px);
  }
}
</style>
