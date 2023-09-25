<template>
  <div class="header-top-cnt">
    <div class="header-top-left">
      <div class="header-contact-number">
        <PhoneFilled class="phone-icon" />
        +86 166 0260 7848
      </div>
      <div class="header-info-wrapper">
        <ul class="info">
          <li>| Hotline Hours: Mon to Fri 10am to 6pm |</li>
          <li>
            <a href="mailto:haykDaghl@gmail.com" title="Email">
              SeekUncomfort@gmail.com
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div class="header-top-right">
      <div class="info-cnt">
        <router-link
          to="/"
          class="link-low-price"
          style="color: #f4c300; font-weight: bold; margin-right: 10px"
          >Lowest Price Guaranteed</router-link
        >
        <CalendarFilled />
        <router-link to="/" class="link-100-days">100 Days Returns</router-link>
        <CarOutlined />
        <router-link to="/">Free Delivery Above $150</router-link>
      </div>
    </div>
  </div>
</template>

<script setup>
import {
  PhoneFilled,
  CalendarFilled,
  CarOutlined,
} from "@ant-design/icons-vue";
</script>

<style>
.header-top-cnt {
  display: flex;
  align-items: start;
  justify-content: space-between;
  width: 100%;
  flex: 40%;
}
.header-top-left {
  display: flex;
  justify-content: start;
  align-items: center;
  gap: 5px;
  height: 100%;
  justify-content: start;
}
.header-top-right {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  justify-content: end;
}
.info {
  margin: 0;
  padding: 0;
  display: flex;
  list-style: none;
}
.info li a {
  text-decoration: none;
  color: black;
  list-style: none;
  margin-left: 2px;
  padding: 5px 8px;
}
.info li a:hover {
  color: white;
  background-color: rgba(0, 0, 0, 0.752);
  transition: 0.3s;
}
.info-cnt {
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 2px;
}
.info-cnt a {
  color: black;
  text-decoration: none;
  list-style: none;
}

@media screen and (max-width: 1456px) {
  .header-top-cnt {
    flex-direction: column;
  }
  .header-top-left {
    width: 100%;
    align-items: center;
  }
  .header-top-right {
    width: 100%;
    align-items: end;
  }
}
@media screen and (max-width: 1230px) {
  .header-top-cnt {
    flex: 30%;
  }
}
@media screen and (max-width: 990px) {
  .phone-icon {
    display: none;
  }
}
</style>
